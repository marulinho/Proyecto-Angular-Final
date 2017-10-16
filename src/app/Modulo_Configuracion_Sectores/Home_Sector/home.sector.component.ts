import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DialogExampleComponent } from '../../shared/dialog/dialog-example/dialog-example.component';
import { MdDialog } from '@angular/material';
import { AppService } from '../../../app/app.service';
import { GestionarSectorFincaService, Sector } from'../CU_Gestionar_Sector/gestionar.sector.service';
import { AsignarMecanismoRiegoSectorService, MecanismoRiego } from '../CU_Asignar_Mecanismo_Riego_Sector/asignar.mecanismo.riego.sector.service';
import { GestionarCultivoSectorService, Cultivo } from '../../Modulo_Cultivo/CU_Gestionar_Cultivo_Sector/gestionar.cultivo.sector.service';

@Component({
    selector:'homeSectorFinca',
    templateUrl: './home.sector.component.html',
    styleUrls:['./home.sector.component.css']
    
})

export class HomeSectorComponent implements OnInit{
    
    //ATRIBUTOS HOME SECTOR
    idFinca:number;
    idSector:number;
    sector:Sector;
    errorMessageHomeSector="";
    sectorSeleccionado:Boolean;
    tooltipEditarSector='Editar Sector';
    tooltipEliminarSector='Eliminar Sector';
    position='above';
    selectedOption:string;

    //ATRIBUTOS MECANISMO RIEGO SECTOR
    errorMessageMecanismoSector="";
    mecanismoSeleccionado:Boolean;
    tooltipAgregarMecanismoSector='Asignar Mecanismo';
    tooltipDeshabilitarMecanismoSector='Deshabilitar Mecanismo';
    mecanismoRiego:MecanismoRiego;
    mecanismoHabilitado:boolean;
    idMecanismoRiegoFincaSector:number;

    //ATRIBUTOS CULTIVO SECTOR
    errorMessageCultivoSector="";
    cultivosSector:Cultivo;
    tooltipAsignarCultivoSector='Asignar Cultivo';
    tooltipDeshabilitarCultivoSector='Deshabilitar Cultivo';
    tooltipModificarCultivoSector='Modificar Cultivo';
    cultivoSectorSeleccionado:Boolean;
    cultivoExistente:Boolean;
    
    constructor(private router:Router,
                private route:ActivatedRoute,
                private gestionarSectorFincaService:GestionarSectorFincaService,
                private asignarMecanismoRiegoSectorService:AsignarMecanismoRiegoSectorService,
                private gestionarCultivoSectorService: GestionarCultivoSectorService,
                private appService:AppService,
                private dialog: MdDialog){

        appService.getState().topnavTitle="Home Sector";
        this.route.params.subscribe(params => {
            this.idSector = +params['idSector'];
            this.idFinca=+params['idFinca'];
            if (this.idSector) {
                this.gestionarSectorFincaService.buscarSectorId(this.idSector)
                .then(
                    response=>{
                        this.sector=response.datos_operacion;
                        this.sectorSeleccionado=true;
                    }
                )
                .catch(
                    error=>{
                        this.errorMessageHomeSector=error.error_description;
                    }
                );
            }
        });

    }

    ngOnInit(){
        this.asignarMecanismoRiegoSectorService.mostrarMecanismos(this.idSector)
            .then(
                response=>{
                    if(response.detalle_operacion=="No hay datos"){
                        this.errorMessageMecanismoSector="No hay mecanismos de riego asociados al sector.";
                        this.mecanismoHabilitado=false;
                    }
                    else{
                        this.mecanismoRiego=response.datos_operacion;
                        if(this.mecanismoRiego['mecanismoRiegoFinca']!=null){
                            this.mecanismoHabilitado=true;
                        }
                        else{
                            this.mecanismoHabilitado=false;
                        }
                        
                        this.mecanismoSeleccionado=true;
                    }
                }
            )
            .catch(
                error=>{
                    this.errorMessageMecanismoSector=error.error_description;
                }
            );

        this.gestionarCultivoSectorService.mostrarCultivoSector(this.idSector)
            .then(
                response=>{
                    if(response.detalle_operacion=="No hay datos"){
                        this.errorMessageCultivoSector="No hay cultivos asociados al sector.";
                        this.cultivoExistente=false;
                    }
                    else{
                        this.cultivosSector=response.datos_operacion;
                        this.cultivoSectorSeleccionado=true;
                        this.cultivoExistente=true;
                    }
                }
            )
            .catch(
                error=>{
                    this.errorMessageCultivoSector=error.error_description;
                }
            );
    }

   getSectorSeleccionado(){
       return this.sectorSeleccionado;
   }

   getMecanismoSeleccionado(){
       return this.mecanismoSeleccionado;
   }

   getMecanismoHabilitado(){
       return this.mecanismoHabilitado;
   }

   getCultivoSectorSeleccionado(){
       return this.cultivoSectorSeleccionado;
   }

   getCultivoExistente(){
       return this.cultivoExistente;
   }

   apretarEliminarIcono(){
    let title="Eliminar Sector";
    let description="¿Desea eliminar el sector de la finca?";
    let option1="Aceptar";
    let option2="Cancelar";
    this.openDialogEliminarSectorFinca(title,description,option1,option2);
   }

   openDialogEliminarSectorFinca(title:string,description:string,option1:string,option2:string){
    let dialogRef = this.dialog.open(DialogExampleComponent);
    dialogRef.componentInstance.title=title;
    dialogRef.componentInstance.description=description;
    dialogRef.componentInstance.option1=option1;
    dialogRef.componentInstance.option2=option2;
    dialogRef.afterClosed().subscribe(
        result => {
                    this.selectedOption = result;
                    if(this.selectedOption==="Aceptar"){
                        this.gestionarSectorFincaService.eliminarSectorFinca(this.idSector)
                            .then(
                                response=>{
                                    this.router.navigate(['/homeFinca/']);
                                }
                            )
                            .catch(
                                error=>{
                                    this.errorMessageHomeSector=error.error_description;
                                }
                            )
                    }
        });
}

   apretarSalir(){
        this.router.navigate(['/homeSector/'+this.idSector]);
   }   

   apretarDeshabilitarMecanismoIcono(idMecanismo:number){
        this.idMecanismoRiegoFincaSector=idMecanismo;
        this.asignarMecanismoRiegoSectorService.deshabilitarMecanismoSector(this.idMecanismoRiegoFincaSector)
            .then(
                response=>{
                    this.refresh();
                }
            )
            .catch(
                error=>{
                    this.errorMessageMecanismoSector=error.error_description;
                }
            );
   }

   apretarDeshabilitarCultivo(idCultivo:number){
    this.gestionarCultivoSectorService.deshabilitarCultivoSector(idCultivo)
        .then(
            response=>{
                this.refresh();
            }
        )
        .catch(
            error=>{
                this.errorMessageCultivoSector=error.error_description;
            }
        );
   }



   refresh(): void {
        window.location.reload();
    }   
}
