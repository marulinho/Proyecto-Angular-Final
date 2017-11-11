import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DialogExampleComponent } from '../../../shared/dialog/dialog-example/dialog-example.component';
import { MdDialog } from '@angular/material';
import { AppService } from '../../../app.service';
import { GestionarConfiguracionRiegoService } from '../gestionar.configuracion.riego.service';
import { HomeFincaDetalleService } from '../../../Modulo_Configuracion_Finca/Home_Finca_Detalle/home.finca.detalle.service';
import { AsignarMecanismoRiegoSectorService } from '../../../Modulo_Configuracion_Sectores/CU_Asignar_Mecanismo_Riego_Sector/asignar.mecanismo.riego.sector.service';
import { ErroresSistema } from '../../../Datos_Sistema/errores.sistema';

@Component({
    selector:'crear-configuracion-riego',
    templateUrl: './crear.configuracion.riego.component.html',
    styleUrls:['./crear.configuracion.riego.component.css']
    
})

export class CrearConfiguracionRiegoComponent implements OnInit{
    
    erroresSistema = new ErroresSistema();
    permisoCrearConfiguracionRiego = JSON.parse(localStorage.getItem('puedeCrearConfiguracionRiego'));

    idFinca:number=JSON.parse(localStorage.getItem('idFinca'));
    idSector:number=JSON.parse(localStorage.getItem('idSector'));
    idMecanismoRiegoFincaSector:number=JSON.parse(localStorage.getItem('idMecanismoRiegoFincaSector'));
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
                    if (error.error_description == this.erroresSistema.getInicioSesion()) {
                        this.router.navigate(['/login/']);
                    }
                    else{
                        this.errorMessageCrearConfiguracionRiego=error.error_description;
                    }
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
                    if (error.error_description == this.erroresSistema.getInicioSesion()) {
                        this.router.navigate(['/login/']);
                    }
                    else{
                        this.errorMessageCrearConfiguracionRiego=error.error_description;
                    }
                }
            );
    }

    getPermisoCrearConfiguracionRiego(){
        return this.permisoCrearConfiguracionRiego;
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
                        this.router.navigate(['/homeSector/']);
                    }
                )
                .catch(
                    error=>{
                        if (error.error_description == this.erroresSistema.getInicioSesion()) {
                            this.router.navigate(['/login/']);
                        }
                        else{
                            this.errorMessageCrearConfiguracionRiego=error.error_description;
                        }
                    }
                );
        }
        else{
            this.gestionarConfiguracionRiegoService.crearConfiguracionRiegoAutomaticoFincaSector(this.idFinca,this.idMecanismoRiegoFincaSector,
                this.nombreConfiguracion,this.descripcionConfiguracionRiego,this.duracionMaximaConfiguracionRiego)
                .then(
                    response=>{
                        this.router.navigate(['/homeSector/']);
                    }
                )
                .catch(
                    error=>{
                        if (error.error_description == this.erroresSistema.getInicioSesion()) {
                            this.router.navigate(['/login/']);
                        }
                        else{
                            this.errorMessageCrearConfiguracionRiego=error.error_description;
                        }
                    }
                );
        }
    }

    apretarSalir(){
        this.router.navigate(['/homeSector/']);        
    }
}
