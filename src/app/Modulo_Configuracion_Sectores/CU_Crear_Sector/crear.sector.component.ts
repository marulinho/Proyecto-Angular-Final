import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../../app.service';
import { CrearSectorFincaService,Sector } from './crear.sector.service';
import { ErroresSistema } from '../../Datos_Sistema/errores.sistema';

@Component({
    selector:'crearSectorFinca',
    templateUrl: './crear.sector.component.html',
    styleUrls:['./crear.sector.component.css']
    
})

export class CrearSectorFincaComponent implements OnInit{
    
    idFinca:number=JSON.parse(localStorage.getItem('idFinca'));
    tamanioDisponible = JSON.parse(localStorage.getItem('tamanioDisponible'));
    selectIndex:number=0;
    errorMessageCrearSectorFinca="";
    nombre:string;
    numero:number;
    descripcion:string;
    superficie:number;

    erroresSistema = new ErroresSistema();
    permisoCrearSector = JSON.parse(localStorage.getItem('puedeCrearSector'));
    
    constructor(private router:Router,
                private route:ActivatedRoute,
                private crearSectorFincaService:CrearSectorFincaService,
                private appService:AppService){

        appService.getState().topnavTitle="Crear Sector";
    }

    ngOnInit(){}
    
    getPermisoCrearSector(){
        return this.permisoCrearSector;
    }
    apretarNextCrear(){
        if(this.selectIndex==0){
            if( this.nombre=="" || this.nombre==null ||
                this.numero==null || this.superficie==null ||
                this.descripcion=="" || this.descripcion==null){
                    this.errorMessageCrearSectorFinca="Debe completar todos los campos obligatorios (*).";
            }
            else{
                if(this.superficie<=0){
                    this.errorMessageCrearSectorFinca="La superficie del sector debe ser mayor que cero.";
                }
                else{
                    this.selectIndex+=1;
                    this.errorMessageCrearSectorFinca="";
                }
            }
        }
    }

    apretarCrearSector(){
        this.crearSectorFincaService.crearSector(this.idFinca,this.nombre,this.numero,this.descripcion,this.superficie)
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
                        this.errorMessageCrearSectorFinca=error.error_description;
                    }
                }
            );
    }

    apretarSalir(){
        this.router.navigate(['/homeFincaDetalle/']);
    }
}
