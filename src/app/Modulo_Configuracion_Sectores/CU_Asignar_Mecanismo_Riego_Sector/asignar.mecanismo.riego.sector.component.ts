import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../../app.service';
import { AsignarMecanismoRiegoSectorService } from '../CU_Asignar_Mecanismo_Riego_Sector/asignar.mecanismo.riego.sector.service';
import { AsignarMecanismoRiegoFincaService, MecanismoRiego } from '../../Modulo_Configuracion_Finca/CU_Asignar_Mecanismo_Riego_Finca/asignar.mecanismo.riego.finca.service';

@Component({
    selector:'asignar-mecanismo-sector',
    templateUrl: './asignar.mecanismo.riego.sector.component.html',
    styleUrls:['./asignar.mecanismo.riego.sector.component.css']
    
})

export class AsignarMecanismoRiegoSectorComponent implements OnInit{
    
    //ATRIBUTOS PERFIL MECANISMO RIEGO
    perfilMecanismoRiego:Boolean=true;
    idFinca:number;
    idSector:number;
    errorMessagePerfilMecanismoSectorFinca="";
    mecanismosRiego:MecanismoRiego;
    mecanismosRiegoSeleccionado:Boolean;

    //ATRIBUTOS AGREGAR MECANISMO A SECTOR
    errorMessageAsignarMecanismo="";
    perfilAsignarMecanismo:Boolean=false;
    position='above';
    tooltipAgregarMecanismo='Agregar Mecanismo';
    idMecanismoRiegoFinca:number;
    selectIndex:number=0;
    caudal:number;
    presion:number;
    
    constructor(private router:Router,
                private route:ActivatedRoute,
                private asignarMecanismoRiegoSectorService: AsignarMecanismoRiegoSectorService,
                private asignarMecanismoRiegoFincaService:AsignarMecanismoRiegoFincaService,
                private appService:AppService){

        appService.getState().topnavTitle="Asignar Mecanismo Riego";
        this.route.params.subscribe(params => {
            this.idSector = +params['idSector'];
            this.idFinca= +params['idFinca'];
        });

    }

    ngOnInit(){
        this.asignarMecanismoRiegoFincaService.mostrarMecanismoRiegoFinca(this.idFinca)
            .then(
                response=>{
                    if(response.detalle_operacion=="No hay datos"){
                        this.errorMessagePerfilMecanismoSectorFinca="No hay mecanismos de riego disponibles.";
                    }
                    else{
                        this.mecanismosRiego=response.datos_operacion;
                        this.mecanismosRiegoSeleccionado=true;
                    }
                }
            )
            .catch(
                error=>{
                    this.errorMessagePerfilMecanismoSectorFinca=error.error_description;
                }
            )
    }

    getPerfilMecanismoRiego(){
        return this.perfilMecanismoRiego;
    }

    getMecanismosRiegoSeleccionado(){
        return this.mecanismosRiegoSeleccionado;
    }

    getPerfilAsignarMecanismo(){
        return this.perfilAsignarMecanismo;
    }
    apretarAgregarMecanismo(id:number){
        this.perfilMecanismoRiego=false;
        this.perfilAsignarMecanismo=true;
        this.idMecanismoRiegoFinca=id;
    }

    apretarNextAsignar(){
        if(this.selectIndex==0){
            if(this.presion==null || this.caudal==null){
                this.errorMessageAsignarMecanismo="Debe completar todos los campos obligatorios (*).";
            }
            else{
                this.errorMessageAsignarMecanismo="";
                this.selectIndex +=1;
            }
        }
    }

    apretarAgregaMecanismo(){
        this.asignarMecanismoRiegoSectorService.asignarMecanismoSector(this.idSector,this.idMecanismoRiegoFinca,this.caudal,this.presion,this.idFinca)
            .then(
                response=>{
                    this.router.navigate(['/homeSector/'+this.idSector+"/"+this.idFinca]);
                }
            )
            .catch(
                error=>{
                    this.errorMessageAsignarMecanismo=error.error_description;
                }
            );
    }

    apretarSalir(){
        this.router.navigate(['/homeSector/'+this.idSector+"/"+this.idFinca]);
    }
}
