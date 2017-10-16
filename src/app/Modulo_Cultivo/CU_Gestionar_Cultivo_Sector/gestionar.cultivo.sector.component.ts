import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DialogExampleComponent } from '../../shared/dialog/dialog-example/dialog-example.component';
import { MdDialog } from '@angular/material';
import { AppService } from '../../app.service';
import { GestionarCultivoSectorService } from './gestionar.cultivo.sector.service';


@Component({
    selector:'gestionar-cultivo-sector',
    templateUrl: './gestionar.cultivo.sector.component.html',
    styleUrls:['./gestionar.cultivo.sector.component.css']
    
})

export class GestionarCultivoSectorComponent implements OnInit{
    

    idSector:number;
    idFinca:number;
    idCultivo:number;
    errorMessageModificarCultivo="";
    nombreCultivo:string;
    descripcion:string;
    fechaPlantacion:string;
    selectIndex:number=0;
    
    constructor(private router:Router,
                private route:ActivatedRoute,
                private appService:AppService,
                private gestionarCultivoSectorService:GestionarCultivoSectorService,
                private dialog: MdDialog){

        appService.getState().topnavTitle="Modificar Cultivo";
        this.route.params.subscribe(params => {
            this.idSector = +params['idSector'];
            this.idFinca = +params['idFinca'];
            this.idCultivo = +params['idCultivo'];

        });

    }

    ngOnInit(){}  

    apretarNextModificar(){
        if(this.selectIndex==0){
            if( this.nombreCultivo=="" || this.nombreCultivo==null ||
                this.descripcion=="" || this.descripcion==null ||
                this.fechaPlantacion=="" || this.fechaPlantacion==null){
                    this.errorMessageModificarCultivo="Debe completar todos los campos obligatorios (*).";
            }
            else{
                this.errorMessageModificarCultivo="";
                this.selectIndex +=1;
            }
        }
    }

    apretarModificarCultivo(){
        this.gestionarCultivoSectorService.modificarCultivoSector(this.idCultivo,this.descripcion,this.nombreCultivo,this.fechaPlantacion)
            .then(
                response=>{
                    this.router.navigate(['/homeSector/'+this.idSector+"/"+this.idFinca]);
                }
            )
            .catch(
                error=>{
                    this.errorMessageModificarCultivo=error.error_description;
                }
            );
    }

    apretarSalir(){
        this.router.navigate(['/homeSector/'+this.idSector+"/"+this.idFinca]);
    }
}
