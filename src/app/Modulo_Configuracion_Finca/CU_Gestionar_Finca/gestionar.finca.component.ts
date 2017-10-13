import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from '../../app.service';
import { GestionarFincaService, Finca } from './gestionar.finca.service';

@Component({
    selector:'app-gestionar.finca',
    templateUrl: './gestionar.finca.component.html',
    styleUrls:['./gestionar.finca.component.css']
    
})

export class GestionarFincaComponent implements OnInit{
    
    idFinca:number;
    errorMessage="";
    nombre:string;
    direccion:string;
    ubicacion:string;
    tamanio:number;

    constructor(private router:Router,
                private route:ActivatedRoute,
                private gestionarFincaService:GestionarFincaService,
                private appService:AppService){
        this.appService.getState().topnavTitle="Gestionar Finca";
        this.route.params.subscribe(params => {
            this.idFinca = +params['idFinca'];
            console.log("idFinca: "+this.idFinca);
        });
    }

    ngOnInit(){
        
    }
    apretarModificarFinca(){
        if( this.nombre=="" || this.nombre==null ||
            this.ubicacion=="" || this.ubicacion==null ||
            this.direccion=="" || this.direccion==null ||
            this.tamanio==null){
                this.errorMessage="Debe completar todos los campos obligatorios (*).";
            }
        else{
            this.gestionarFincaService.modificarFinca(this.idFinca,this.nombre,this.direccion,this.ubicacion,this.tamanio)
                    .then(
                        response=>{
                            this.router.navigate(['/homeFincaDetalle/'+this.idFinca]);
                        }
                    )
                    .catch(
                        error=>{
                            this.errorMessage=error.error_description;
                        }
                    );
        }
    }

    apretarSalir(){
        this.router.navigate(['/homeFincaDetalle/'+this.idFinca]);
    }
    
    
}
