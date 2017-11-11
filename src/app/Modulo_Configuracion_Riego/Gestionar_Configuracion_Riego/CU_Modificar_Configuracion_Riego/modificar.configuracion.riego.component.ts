import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DialogExampleComponent } from '../../../shared/dialog/dialog-example/dialog-example.component';
import { MdDialog } from '@angular/material';
import { AppService } from '../../../app.service';
import { GestionarConfiguracionRiegoService } from '../gestionar.configuracion.riego.service';
import { ErroresSistema } from '../../../Datos_Sistema/errores.sistema';

@Component({
    selector:'crear-configuracion-riego',
    templateUrl: './modificar.configuracion.riego.component.html',
    styleUrls:['./modificar.configuracion.riego.component.css']
    
})

export class ModificarConfiguracionRiegoComponent implements OnInit{
    
    erroresSistema = new ErroresSistema();
    permisoModificarConfiguracionRiego = JSON.parse(localStorage.getItem('puedeModificarConfiguracionRiego'));

    idFinca:number=JSON.parse(localStorage.getItem('idFinca'));
    idMecanismoRiegoFincaSector:number=JSON.parse(localStorage.getItem('idMecanismoRiegoFincaSector'));
    idConfiguracionRiego:number=JSON.parse(localStorage.getItem('idConfiguracionRiego'));
    idSector:number=JSON.parse(localStorage.getItem('idSector'));
    errorMessageModificarConfiguracionRiego="";
    selectIndex:number=0;
    nombreConfiguracion:string;        
    descripcionConfiguracionRiego:string;
    duracionMaximaConfiguracionRiego:number;

    
    constructor(private router:Router,
                private route:ActivatedRoute,
                private gestionarConfiguracionRiegoService:GestionarConfiguracionRiegoService,
                private appService:AppService,
                private dialog: MdDialog){

        appService.getState().topnavTitle="Modificar Configuración Riego";


    }

    ngOnInit(){}
    getPermisoModificarConfiguracionRiego(){
        return this.permisoModificarConfiguracionRiego;
    }
    apretarNextModificar(){
        if(this.selectIndex==0){
            if( this.nombreConfiguracion=="" || this.nombreConfiguracion==null ||
                this.descripcionConfiguracionRiego=="" || this.descripcionConfiguracionRiego==null ||
                this.duracionMaximaConfiguracionRiego==null){
                    this.errorMessageModificarConfiguracionRiego="Debe completar todos los campos obligatorios.";
            }
            else{
                this.errorMessageModificarConfiguracionRiego="";
                this.selectIndex+=1;
            }
        }
    }
    

    apretarModificarConfiguracion(){
            this.gestionarConfiguracionRiegoService.modificarConfiguracionRiego(this.idFinca,this.idMecanismoRiegoFincaSector,
                this.idConfiguracionRiego,this.nombreConfiguracion,this.descripcionConfiguracionRiego,this.duracionMaximaConfiguracionRiego)
                .then(
                    response=>{
                        this.router.navigate(['/homeConfiguracionRiego/']);
                    }
                )
                .catch(
                    error=>{
                        if (error.error_description == this.erroresSistema.getInicioSesion()) {
                            this.router.navigate(['/login/']);
                        }
                        else{
                            this.errorMessageModificarConfiguracionRiego=error.error_description;
                        }
                    }
                );

    }

    apretarSalir(){
        this.router.navigate(['/homeConfiguracionRiego/']);
    }
}
