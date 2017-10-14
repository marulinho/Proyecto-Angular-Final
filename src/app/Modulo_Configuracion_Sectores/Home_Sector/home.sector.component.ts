import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DialogExampleComponent } from '../../shared/dialog/dialog-example/dialog-example.component';
import { MdDialog } from '@angular/material';
import { AppService } from '../../../app/app.service';
import { GestionarSectorFincaService, Sector } from'../CU_Gestionar_Sector/gestionar.sector.service';

@Component({
    selector:'hom-proveedor-informacion',
    templateUrl: './home.sector.component.html',
    styleUrls:['./home.sector.component.css']
    
})

export class HomeSectorComponent implements OnInit{
    
    //ATRIBUTOS HOME SECTOR
    idSector:number;
    sector:Sector;
    errorMessageHomeSector="";
    sectorSeleccionado:Boolean;
    tooltipEditarSector='Editar Sector';
    tooltipEliminarSector='Eliminar Sector';
    position='above';
    selectedOption:string;
    
  
    
    constructor(private router:Router,
                private route:ActivatedRoute,
                private gestionarSectorFincaService:GestionarSectorFincaService,
                private appService:AppService,
                private dialog: MdDialog){

        appService.getState().topnavTitle="Home Sector";
        this.route.params.subscribe(params => {
            this.idSector = +params['idSector'];
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

    ngOnInit(){}

   getSectorSeleccionado(){
       return this.sectorSeleccionado;
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
}
