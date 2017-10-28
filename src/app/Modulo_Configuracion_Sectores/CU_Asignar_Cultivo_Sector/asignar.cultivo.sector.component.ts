import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DialogExampleComponent } from '../../shared/dialog/dialog-example/dialog-example.component';
import { MdDialog } from '@angular/material';
import { AppService } from '../../../app/app.service';
import { AsignarCultivoSectorService, Cultivo } from './asignar.cultivo.sector.service';


@Component({
    selector:'asignar-cultivo-sector',
    templateUrl: './asignar.cultivo.sector.component.html',
    styleUrls:['./asignar.cultivo.sector.component.css']
    
})

export class AsignarCultivoSectorComponent implements OnInit{
    

    //ATRIBUTOS PERFIL CULTIVO
    position='above';
    idSector:number;
    idFinca:number;
    cultivoSectorSeleccionado:Boolean;
    errorMessageCultivo="";
    cultivos:Cultivo;
    tooltipAgregarCultivo='Agregar Cultivo';
    perfilCultivo:Boolean=true;

    //ATRIBUTOS AGREGAR CULTIVO
    perfilAgregarCultivo:Boolean=false;
    nombreSubtipoCultivo:string;
    nombreCultivo:string;
    errorMessageAgregarCultivo="";
    descripcion:string;
    fechaPlantacion:string;
    selectIndex:number=0;

    
    
    constructor(private router:Router,
                private route:ActivatedRoute,
                private asignarCultivoSectorService:AsignarCultivoSectorService,
                private appService:AppService,
                private dialog: MdDialog){

        appService.getState().topnavTitle="Cultivo";
        this.route.params.subscribe(params => {
            this.idSector = +params['idSector'];
            this.idFinca = +params['idFinca'];
            
        });

    }

    ngOnInit(){
        this.asignarCultivoSectorService.mostrarCultivo()
            .then(
                response=>{

                        this.cultivos=response.datos_operacion;
                        this.cultivoSectorSeleccionado=true;
                }
            )
            .catch(
                error=>{
                    this.errorMessageCultivo=error.error_description;
                }
            );
    }

    getCultivoSectorSeleccionado(){
        return this.cultivoSectorSeleccionado;
    }
    
    getperfilCultivo(){
        return this.perfilCultivo;
    }

    getPerfilAgregarCultivo(){
        return this.perfilAgregarCultivo;
    }
    apretarAgregarIcono(nombreSubtipo:string){
        this.nombreSubtipoCultivo=nombreSubtipo;
        this.perfilCultivo=false;
        this.perfilAgregarCultivo=true;
    }

    apretarNextAsignar(){
        if(this.selectIndex==0){
            if( this.nombreCultivo=="" || this.nombreCultivo==null ||
                this.descripcion=="" || this.descripcion==null ||
                this.fechaPlantacion=="" || this.fechaPlantacion==null){
                    this.errorMessageAgregarCultivo="Debe completar todos los campos obligatorios (*).";
                }
            else{
                this.errorMessageAgregarCultivo="";
                this.selectIndex +=1;
            }
        }
    }

    apretarAgregaCultivo(){
        this.asignarCultivoSectorService.asignarCultivoSector(this.idSector,this.nombreSubtipoCultivo,this.nombreCultivo,this.descripcion,this.fechaPlantacion,this.idFinca)
            .then(
                response=>{
                    this.router.navigate(['/homeSector/'+this.idSector+"/"+this.idFinca]);
                }
            )
            .catch(
                error=>{
                    this.errorMessageAgregarCultivo=error.error_description;
                }
            );
    }

    apretarSalir(){
        this.router.navigate(['/homeSector/'+this.idSector+"/"+this.idFinca]);
    }
}
