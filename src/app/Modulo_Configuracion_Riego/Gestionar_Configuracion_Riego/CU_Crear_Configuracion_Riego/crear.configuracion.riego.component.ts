import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DialogExampleComponent } from '../../../shared/dialog/dialog-example/dialog-example.component';
import { MdDialog } from '@angular/material';
import { AppService } from '../../../app.service';
import { GestionarConfiguracionRiegoService } from '../gestionar.configuracion.riego.service';
import { HomeFincaDetalleService } from '../../../Modulo_Configuracion_Finca/Home_Finca_Detalle/home.finca.detalle.service';
import { AsignarMecanismoRiegoSectorService } from '../../../Modulo_Configuracion_Sectores/CU_Asignar_Mecanismo_Riego_Sector/asignar.mecanismo.riego.sector.service';

@Component({
    selector:'crear-configuracion-riego',
    templateUrl: './crear.configuracion.riego.component.html',
    styleUrls:['./crear.configuracion.riego.component.css']
    
})

export class CrearConfiguracionRiegoComponent implements OnInit{
    
    idFinca:number;
    idSector:number;
    idMecanismoRiegoFincaSector:number;
    nombreFinca:string;
    nombreMecanismoRiego:string;
    errorMessageCrearConfiguracionRiego="";
    selectIndex:number=0;
    nombreConfiguracion:string;
    descripcionConfiguracionRiego:string;
    duracionMaximaConfiguracionRiego:number;
    tipoSeleccionado:string;
    tiposConfiguraciones=['Automático.','Programado.'];
    
    constructor(private router:Router,
                private route:ActivatedRoute,
                private gestionarConfiguracionRiegoService:GestionarConfiguracionRiegoService,
                private homeFincaDetalleService:HomeFincaDetalleService,
                private asignarMecanismoRiegoSectorService:AsignarMecanismoRiegoSectorService,
                private appService:AppService,
                private dialog: MdDialog){

        appService.getState().topnavTitle="Crear Configuración Riego";
        this.route.params.subscribe(params => {
            this.idMecanismoRiegoFincaSector = +params['idMecanismoRiegoFincaSector'];
            this.idFinca=+params['idFinca'];
            this.idSector=+params['idSector'];

        });

    }

    ngOnInit(){
        this.homeFincaDetalleService.buscarFinca(this.idFinca)
            .then(
                response=>{
                    this.nombreFinca=response.datos_operacion['nombre'];
                }
            )
            .catch(
                error=>{
                    this.errorMessageCrearConfiguracionRiego=error.error_description;
                }
            );

        this.asignarMecanismoRiegoSectorService.mostrarMecanismos(this.idSector)
            .then(
                response=>{
                    if(response.detalle_operacion=="No hay datos"){
                        this.errorMessageCrearConfiguracionRiego="Ha ocurrido un error, no se ha podido obtener el sector de la finca, intente nuevamente.";
                    }
                    else{
                        this.nombreMecanismoRiego=response.datos_operacion['nombreTipoMecanismo'];
                    }
                }
            )
            .catch(
                error=>{
                    this.errorMessageCrearConfiguracionRiego=error.error_description;
                }
            );
    }

    apretarNextCrear(){
        if(this.selectIndex==0){
            if( this.nombreConfiguracion=="" || this.nombreConfiguracion==null ||
                this.descripcionConfiguracionRiego=="" || this.descripcionConfiguracionRiego==null ||
                this.duracionMaximaConfiguracionRiego==null ||
                this.tipoSeleccionado=="" || this.tipoSeleccionado==null ){
                    this.errorMessageCrearConfiguracionRiego="Debe completar todos los campos obligatorios.";
            }
            else{
                this.errorMessageCrearConfiguracionRiego="";
                this.selectIndex+=1;
            }
        }
    }
    

    apretarCrearConfiguracion(){
        if(this.tipoSeleccionado=="Programado."){
            this.gestionarConfiguracionRiegoService.crearConfiguracionRiegoManualFincaSector(this.idFinca,this.idMecanismoRiegoFincaSector,
                this.nombreConfiguracion,this.descripcionConfiguracionRiego,this.duracionMaximaConfiguracionRiego)
                .then(
                    response=>{
                        this.router.navigate(['/homeSector/'+this.idSector+"/"+this.idFinca]);
                    }
                )
                .catch(
                    error=>{
                        this.errorMessageCrearConfiguracionRiego=error.error_description;
                    }
                );
        }
        else{
            this.gestionarConfiguracionRiegoService.crearConfiguracionRiegoAutomaticoFincaSector(this.idFinca,this.idMecanismoRiegoFincaSector,
                this.nombreConfiguracion,this.descripcionConfiguracionRiego,this.duracionMaximaConfiguracionRiego)
                .then(
                    response=>{
                        this.router.navigate(['/homeSector/'+this.idSector+"/"+this.idFinca]);
                    }
                )
                .catch(
                    error=>{
                        this.errorMessageCrearConfiguracionRiego=error.error_description;
                    }
                );
        }
    }

    apretarSalir(){
        this.router.navigate(['/homeSector/'+this.idSector+"/"+this.idFinca]);        
    }
}
