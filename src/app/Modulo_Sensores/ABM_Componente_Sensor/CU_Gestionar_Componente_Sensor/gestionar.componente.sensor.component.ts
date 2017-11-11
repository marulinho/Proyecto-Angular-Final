import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../../../app.service';
import { DialogExampleComponent } from '../../shared/dialog/dialog-example/dialog-example.component';
import { MdDialog } from '@angular/material';
import { GestionarComponenteSensorService } from '../gestionar.componente.sensor.service';
import { ErroresSistema } from '../../../Datos_Sistema/errores.sistema';

@Component({
    selector:'gestionar-componente-sensor-finca',
    templateUrl: './gestionar.componente.sensor.component.html',
    styleUrls:['./gestionar.componente.sensor.component.css']
    
})

export class GestionarComponenteSensorComponent implements OnInit{

    erroresSistema = new ErroresSistema();
    permisoGestionarComponenteSensor = JSON.parse(localStorage.getItem('puedeGestionarComponenteSensor'));

    idFinca:number;
    idComponenteSensor:number;
    perfilComponenteSeleccionado:Boolean;
    errorMessageModificarComponente:string="";
    modeloComponente:string;
    descripcionComponente:string;
    cantMaximaSensores:number;


    constructor(private router:Router,
                private route:ActivatedRoute,
                private gestionarComponenteSensorService:GestionarComponenteSensorService,
                private appService:AppService,
                private dialog: MdDialog){

        appService.getState().topnavTitle="Modificar Componente Sensor";
        this.route.params.subscribe(params => {
            this.idFinca = +params['idFinca'];
            this.idComponenteSensor = +params['idComponenteSensor'];
            
        });

    }

    ngOnInit(){}

    getPermisoGestionarComponenteSensor(){
        return this.permisoGestionarComponenteSensor;
    }

    getPerfilComponenteSeleccionado(){
        return this.perfilComponenteSeleccionado;
    }

    apretarModificarComponente(){
        if( this.modeloComponente=="" || this.modeloComponente==null ||
            this.descripcionComponente=="" || this.descripcionComponente==null || 
            this.cantMaximaSensores==null){
            this.errorMessageModificarComponente="Debe completar todos los campos obligatorios (*).";
        }
        else{
            this.gestionarComponenteSensorService.modificarComponente(this.idFinca,this.idComponenteSensor,this.modeloComponente,this.descripcionComponente,this.cantMaximaSensores)
                .then(
                    response=>{
                        this.router.navigate(['/homeComponenteSensorFinca/'+this.idFinca+"/"+this.idComponenteSensor]);
                    }
                )
                .catch(
                    error=>{
                        if (error.error_description == this.erroresSistema.getInicioSesion()) {
                            this.router.navigate(['/login/']);
                        }
                        else{
                            this.errorMessageModificarComponente=error.error_description;
                        }
                    }
                );
        }
        
    }

    apretarSalir(){
        this.router.navigate(['/homeComponenteSensorFinca/'+this.idFinca+"/"+this.idComponenteSensor]);
    }


}
