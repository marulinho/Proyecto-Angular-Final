import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DialogExampleComponent } from '../../shared/dialog/dialog-example/dialog-example.component';
import { MdDialog } from '@angular/material';
import { AppService } from '../../app.service';
import { GestionarCultivoSectorService } from './gestionar.cultivo.sector.service';
import { ErroresSistema } from '../../Datos_Sistema/errores.sistema';

@Component({
    selector:'gestionar-cultivo-sector',
    templateUrl: './gestionar.cultivo.sector.component.html',
    styleUrls:['./gestionar.cultivo.sector.component.css']
    
})

export class GestionarCultivoSectorComponent implements OnInit{
    
    erroresSistema = new ErroresSistema();
    permisoGestionarCultivo = JSON.parse(localStorage.getItem('puedeGestionarCultivoSector'));

    idSector:number=JSON.parse(localStorage.getItem('idSector'));
    idFinca:number=JSON.parse(localStorage.getItem('idFinca'));
    idCultivo:number=JSON.parse(localStorage.getItem('idCultivo'));
    errorMessageModificarCultivo="";
    nombreCultivo:string;
    descripcion:string;
    fechaPlantacion:string;
    cantidadPlantas:number;
    selectIndex:number=0;
    
    
    constructor(private router:Router,
                private route:ActivatedRoute,
                private appService:AppService,
                private gestionarCultivoSectorService:GestionarCultivoSectorService,
                private dialog: MdDialog){

        appService.getState().topnavTitle="Modificar Cultivo";

    }

    ngOnInit(){
        this.gestionarCultivoSectorService.mostrarCultivoSector(this.idSector,this.idFinca)
            .then(
                response=>{
                    if(response.detalle_operacion=="No hay datos"){
                        this.errorMessageModificarCultivo="No se ha podido obtener el cultivo, intente de nuevo.";
                    }
                    else{
                        this.nombreCultivo=response.datos_operacion['nombre'];
                        this.descripcion=response.datos_operacion['descripcion'];
                        this.cantidadPlantas=response.datos_operacion['cantidadPlantas'];
                    }
                }
            )
            .catch(
                error=>{
                    if (error.error_description == this.erroresSistema.getInicioSesion()) {
                        this.router.navigate(['/login/']);
                    }
                    else{
                        this.errorMessageModificarCultivo=error.error_description;
                    }
                }
            );
    }  

    getPermisoGestionarCultivo(){
        return this.permisoGestionarCultivo;
    }

    apretarNextModificar(){
        if(this.selectIndex==0){
            if( this.nombreCultivo=="" || this.nombreCultivo==null ||
                this.descripcion=="" || this.descripcion==null ||
                this.fechaPlantacion=="" || this.fechaPlantacion==null || this.cantidadPlantas==null){
                    this.errorMessageModificarCultivo="Debe completar todos los campos obligatorios (*).";
            }
            else{
                if(this.cantidadPlantas<=0){
                    this.errorMessageModificarCultivo="La cantidad de plantas no puede ser menor o igual que cero.";
                }
                else{
                    this.errorMessageModificarCultivo="";
                    this.selectIndex +=1;
                }
            }
        }
    }

    apretarModificarCultivo(){
        this.gestionarCultivoSectorService.modificarCultivoSector(this.idCultivo,this.descripcion,this.nombreCultivo,this.fechaPlantacion,this.cantidadPlantas,this.idFinca)
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
                        this.errorMessageModificarCultivo=error.error_description;
                    }
                }
            );
    }

    apretarSalir(){
        this.router.navigate(['/homeSector/']);
    }
}
