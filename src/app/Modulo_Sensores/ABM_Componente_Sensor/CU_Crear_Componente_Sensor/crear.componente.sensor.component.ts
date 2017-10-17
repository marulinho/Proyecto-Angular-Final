import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../../../app.service';
import { DialogExampleComponent } from '../../shared/dialog/dialog-example/dialog-example.component';
import { MdDialog } from '@angular/material';
import { GestionarComponenteSensorService } from '../gestionar.componente.sensor.service';

@Component({
    selector:'crear-componente-sensor-finca',
    templateUrl: './crear.componente.sensor.component.html',
    styleUrls:['./crear.componente.sensor.component.css']
    
})

export class CrearComponenteSensorComponent implements OnInit{

    idFinca:number;
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
        this.route.params.subscribe(params => {
            this.idFinca = +params['idFinca'];
            
        });

    }

    ngOnInit(){}

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
                        this.router.navigate(['/homeFincaDetalle/'+this.idFinca]);
                    }
                )
                .catch(
                    error=>{
                        this.errorMessageCrearComponente=error.error_description;
                    }
                );
        }
        
    }

    apretarSalir(){
        this.router.navigate(['/homeFincaDetalle/'+this.idFinca]);
    }


}
