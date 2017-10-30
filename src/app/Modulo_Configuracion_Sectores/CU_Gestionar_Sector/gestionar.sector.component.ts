import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../../app.service';
import { GestionarSectorFincaService, Sector } from './gestionar.sector.service';
import { ErroresSistema } from '../../Datos_Sistema/errores.sistema';


@Component({
    selector:'gestionarSectorFinca',
    templateUrl: './gestionar.sector.component.html',
    styleUrls:['./gestionar.sector.component.css']
    
})

export class GestionarSectorFincaComponent implements OnInit{
    
    idSector:number;
    errorMessageGestionarSectorFinca="";
    sectorSeleccionado:Boolean=true;
    nombre:string;
    descripcion:string;
    superficie:number;

    erroresSistema=new ErroresSistema();

    idFinca:number=JSON.parse(localStorage.getItem('idFinca'));
    permisoGestionarSector = JSON.parse(localStorage.getItem('puedeGestionarSector'));
    
    constructor(private router:Router,
                private route:ActivatedRoute,
                private gestionarSectorFincaService:GestionarSectorFincaService,
                private appService:AppService){

        appService.getState().topnavTitle="Sectores Finca";
        this.route.params.subscribe(params => {
            this.idSector = +params['idSector'];

        });

    }

    ngOnInit(){}

    getPermisoGestionarSector(){
        return this.permisoGestionarSector;
    }

   getSectorSeleccionado(){
       return this.sectorSeleccionado=true;
   }

   apretarModificarSector(){
        if( this.descripcion=="" || this.descripcion ==null ||
            this.nombre=="" || this.nombre==null ||
            this.superficie==null){
                this.errorMessageGestionarSectorFinca="Debe completar todos los campos obligatorios (*).";
        }
        else{
            this.gestionarSectorFincaService.modificarSector(this.idSector,this.nombre,this.descripcion,this.superficie,this.idFinca)
                .then(
                    response=>{
                        this.router.navigate(['/homeSector/'+this.idSector+"/"+this.idFinca]);
                    }
                )
                .catch(
                    error=>{
                        if (error.error_description == this.erroresSistema.getInicioSesion()) {
                            this.router.navigate(['/login/']);
                        }
                        else{
                            this.errorMessageGestionarSectorFinca=error.error_description;
                        }
                    }
                );
        }
        
   }

   apretarSalir(){
        this.router.navigate(['/homeSector/'+this.idSector+"/"+this.idFinca]);
   }
}
