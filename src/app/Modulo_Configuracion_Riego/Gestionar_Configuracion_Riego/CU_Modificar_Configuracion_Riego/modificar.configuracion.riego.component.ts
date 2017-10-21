import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DialogExampleComponent } from '../../../shared/dialog/dialog-example/dialog-example.component';
import { MdDialog } from '@angular/material';
import { AppService } from '../../../app.service';
import { GestionarConfiguracionRiegoService } from '../gestionar.configuracion.riego.service';

@Component({
    selector:'crear-configuracion-riego',
    templateUrl: './modificar.configuracion.riego.component.html',
    styleUrls:['./modificar.configuracion.riego.component.css']
    
})

export class ModificarConfiguracionRiegoComponent implements OnInit{
    
    idFinca:number;
    idMecanismoRiegoFincaSector:number;
    idConfiguracionRiego:number;
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
        this.route.params.subscribe(params => {
            this.idMecanismoRiegoFincaSector = +params['idMecanismoRiegoFincaSector'];
            this.idFinca=+params['idFinca'];
            this.idConfiguracionRiego=+params['idConfiguracionRiego'];

        });

    }

    ngOnInit(){}

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
                        this.router.navigate(['/homeConfiguracionRiego/'+this.idFinca+"/"+this.idMecanismoRiegoFincaSector+"/"+this.idConfiguracionRiego]);
                    }
                )
                .catch(
                    error=>{
                        this.errorMessageModificarConfiguracionRiego=error.error_description;
                    }
                );

    }

    apretarSalir(){
        this.router.navigate(['/homeConfiguracionRiego/'+this.idFinca+"/"+this.idMecanismoRiegoFincaSector+"/"+this.idConfiguracionRiego]);
    }
}
