import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../../app.service';
import { CrearSectorFincaService,Sector } from './crear.sector.service';


@Component({
    selector:'crearSectorFinca',
    templateUrl: './crear.sector.component.html',
    styleUrls:['./crear.sector.component.css']
    
})

export class CrearSectorFincaComponent implements OnInit{
    
    idFinca:number;
    selectIndex:number=0;
    errorMessageCrearSectorFinca="";
    nombre:string;
    numero:number;
    descripcion:string;
    superficie:number;
    
    constructor(private router:Router,
                private route:ActivatedRoute,
                private crearSectorFincaService:CrearSectorFincaService,
                private appService:AppService){

        appService.getState().topnavTitle="Crear Sector";
        this.route.params.subscribe(params => {
            this.idFinca = +params['idFinca'];
            console.log("idFinca: "+this.idFinca);
        });
    }

    ngOnInit(){}
   
    apretarNextCrear(){
        if(this.selectIndex==0){
            if( this.nombre=="" || this.nombre==null ||
                this.numero==null || this.superficie==null ||
                this.descripcion=="" || this.descripcion==null){
                    this.errorMessageCrearSectorFinca="Debe completar todos los campos obligatorios (*).";
            }
            else{
                this.selectIndex+=1;
                this.errorMessageCrearSectorFinca="";
            }
        }
    }

    apretarCrearSector(){
        this.crearSectorFincaService.crearSector(this.idFinca,this.nombre,this.numero,this.descripcion,this.superficie)
            .then(
                response=>{
                    this.router.navigate(['/homeFincaDetalle/'+this.idFinca]);
                }
            )
            .catch(
                error=>{
                    this.errorMessageCrearSectorFinca=error.error_description;
                }
            );
    }

    apretarSalir(){
        this.router.navigate(['/homeFincaDetalle/'+this.idFinca]);
    }
}
