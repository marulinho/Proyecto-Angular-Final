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
    
    idSector:number=JSON.parse(localStorage.getItem('idSector'));
    idFinca:number=JSON.parse(localStorage.getItem('idFinca'));
    permisoGestionarSector = JSON.parse(localStorage.getItem('puedeGestionarSector'));

    errorMessageGestionarSectorFinca="";
    sectorSeleccionado:Boolean=true;
    nombre:string;
    descripcion:string;
    superficie:number;

    erroresSistema=new ErroresSistema();

    constructor(private router:Router,
                private route:ActivatedRoute,
                private gestionarSectorFincaService:GestionarSectorFincaService,
                private appService:AppService){

        appService.getState().topnavTitle="Sector Finca";

    }

    ngOnInit(){
        this.gestionarSectorFincaService.buscarSectorId(this.idSector,this.idFinca)
            .then(
                response=>{
                    if(response.detalle_operacion=="No hay datos"){
                        this.errorMessageGestionarSectorFinca="No se ha podido obtener el sector, intente de nuevo.";
                    }
                    else{
                        this.nombre=response.datos_operacion['nombreSector'];
                        this.descripcion=response.datos_operacion['descripcionSector'];
                        this.superficie=response.datos_operacion['superficieSector'];
                        this.sectorSeleccionado=true;
                    }
                }
            )
    }

    getPermisoGestionarSector(){
        return this.permisoGestionarSector;
    }

   getSectorSeleccionado(){
       return this.sectorSeleccionado;
   }

   apretarModificarSector(){
        if( this.descripcion=="" || this.descripcion ==null ||
            this.nombre=="" || this.nombre==null ||
            this.superficie==null){
                this.errorMessageGestionarSectorFinca="Debe completar todos los campos obligatorios (*).";
        }
        else{
            if(this.superficie<0){
                this.errorMessageGestionarSectorFinca="La superficie no puede ser menor o igual que cero.";
            }
            else{
                this.gestionarSectorFincaService.modificarSector(this.idSector,this.nombre,this.descripcion,this.superficie,this.idFinca)
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
                                this.errorMessageGestionarSectorFinca=error.error_description;
                            }
                        }
                    );
            }
        }
   }

   apretarSalir(){
        this.router.navigate(['/homeSector/']);
   }
}
