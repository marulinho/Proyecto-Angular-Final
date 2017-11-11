import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../../../app.service';
import { DialogExampleComponent } from '../../shared/dialog/dialog-example/dialog-example.component';
import { MdDialog } from '@angular/material';
import { GestionarComponenteSensorService } from '../gestionar.componente.sensor.service';
import { ErroresSistema } from '../../../Datos_Sistema/errores.sistema';

@Component({
    selector:'crear-componente-sensor-finca',
    templateUrl: './crear.componente.sensor.component.html',
    styleUrls:['./crear.componente.sensor.component.css']
    
})

export class CrearComponenteSensorComponent implements OnInit{

    erroresSistema = new ErroresSistema();
    permisoCrearComponenteSensor = JSON.parse(localStorage.getItem('puedeCrearComponenteSensor'));

    idFinca:number=JSON.parse(localStorage.getItem('idFinca'));
    perfilComponenteSeleccionado:Boolean;
    errorMessageCrearComponente:string="";
    modeloComponente:string;
    descripcionComponente:string;
    cantMaximaSensores:number;


    constructor(private router:Router,
                private route:ActivatedRoute,
                private gestionarComponenteSensorService:GestionarComponenteSensorService,
                private appService:AppService,
                private dialog: MdDialog){

        appService.getState().topnavTitle="Crear Componente Sensor";


    }

    ngOnInit(){}

    getPermisoCrearComponenteSensor(){
        return this.permisoCrearComponenteSensor;
    }

    getPerfilComponenteSeleccionado(){
        return this.perfilComponenteSeleccionado;
    }

    apretarCrearComponente(){
        if( this.modeloComponente=="" || this.modeloComponente==null ||
            this.descripcionComponente=="" || this.descripcionComponente==null || 
            this.cantMaximaSensores==null){
            this.errorMessageCrearComponente="Debe completar todos los campos obligatorios (*).";
        }
        else{
            this.gestionarComponenteSensorService.crearComponente(this.idFinca,this.modeloComponente,this.descripcionComponente,this.cantMaximaSensores)
                .then(
                    response=>{
                        this.router.navigate(['/homeFincaDetalle/']);
                    }
                )
                .catch(
                    error=>{
                        if (error.error_description == this.erroresSistema.getInicioSesion()) {
                            this.router.navigate(['/login/']);
                        }
                        else{
                            this.errorMessageCrearComponente=error.error_description;
                        }
                    }
                );
        }
        
    }

    apretarSalir(){
        this.router.navigate(['/homeFincaDetalle/']);
    }


}
