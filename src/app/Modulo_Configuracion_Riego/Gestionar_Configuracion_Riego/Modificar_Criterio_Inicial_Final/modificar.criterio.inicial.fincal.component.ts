import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from '../../../app.service';
import { GestionarConfiguracionRiegoService } from '../gestionar.configuracion.riego.service';
import { GestionarEventoPersonalizadoService, TipoMedicion } from '../../../Modulo_Reportes/Gestionar_Evento_Persinalizado/gestionar.evento.personalizado.service';

@Component({
    selector:'modificar-criterio-inicial-final',
    templateUrl: './modificar.criterio.inicial.final.component.html',
    styleUrls:['./modificar.criterio.inicial.fincal.component.css']
    
})

export class ModificarCriterioInicialFinalComponent implements OnInit{
    
    idSector:number=JSON.parse(localStorage.getItem('idSector'));
    //GENERALES
    errorMessageModificarCriterio="";
    idFinca:number=JSON.parse(localStorage.getItem('idFinca'));
    idMecanismoRiegoFincaSector:number=JSON.parse(localStorage.getItem('idMecanismoRiegoFincaSector'));
    idConfiguracionRiego:number=JSON.parse(localStorage.getItem('idConfiguracionRiego'));
    tipoCriterio:string=JSON.parse(localStorage.getItem('tipoCriterioRiego'))
    idCriterioRiego:number=JSON.parse(localStorage.getItem('idCriterioRiego'));
    nombre:string;
    descripcion:string;
    selectIndex:number=0;

    //CRITERIO MEDICION
    medicionSeleccionada:number;
    valorMedicion:number;
    tiposMediciones:TipoMedicion;
    operadoresMedicion=['<=','>='];
    operadorSeleccionado:string;
    operadorEnviar:string;
    
    //CRITERIO HORA
    horaInicioCriterioRiego:string;
    diaInicioCriterioRiego:string;
    numeroDiaInicioCriterioRiego:number;    
    diasCriterio=['Lunes.','Martes.','Miércoles.','Jueves','Viernes','Sábado','Domingo']; 

    //CRITERIO VOLUMEN
    volumenAgua:number;
    

    constructor(private router: Router,
                private route:ActivatedRoute,
                private gestionarConfiguracionRiegoService:GestionarConfiguracionRiegoService,
                private gestionarEventoPersonalizadoService:GestionarEventoPersonalizadoService,
                private appService: AppService) {
            this.appService.getState().topnavTitle="Modificar Criterio Riego.";
    }

    ngOnInit(){
        if(this.tipoCriterio=="criterio_riego_medicion"){
            this.gestionarEventoPersonalizadoService.mostrarTipoMedicionInternaFinca(this.idFinca)
            .then(
                response=>{
                    this.tiposMediciones=response.datos_operacion;
                }
            )
            .catch(
                error=>{
                    this.errorMessageModificarCriterio=error.error_description;
                }
            );
        }
  
    }
    
    apretarNextModificar(){
        if(this.selectIndex==0){
            if( this.nombre=="" || this.nombre==null ||
                this.descripcion=="" || this.descripcion==null){
                    this.errorMessageModificarCriterio="Debe completar todos los campos obligatorios (*).";
            }
            else{
                if(this.tipoCriterio=='criterio_riego_medicion'){
                    if(this.medicionSeleccionada==null || this.valorMedicion==null){
                        this.errorMessageModificarCriterio="Debe completar todos los campos obligatorios (*).";
                    }
                    else{
                        if(this.valorMedicion<0){
                            this.errorMessageModificarCriterio="No puede asignar valores negativos.";
                        }
                        else{
                            if(this.operadorSeleccionado==">="){
                                this.operadorEnviar="1";
                            }
                            else{
                                this.operadorEnviar="0";
                            }
                            this.errorMessageModificarCriterio="";
                            this.selectIndex +=1;
                        }
                    }
                }
                else{
                    if(this.tipoCriterio="criterio_riego_hora"){
                        if( this.horaInicioCriterioRiego == null || this.horaInicioCriterioRiego =="" ||
                            this.diaInicioCriterioRiego == null || this.diaInicioCriterioRiego ==""){
                                this.errorMessageModificarCriterio="Debe completar todos los campos obligatorios (*).";                            
                            }
                        else{
                            if(this.diaInicioCriterioRiego=="Lunes."){
                                this.numeroDiaInicioCriterioRiego=1;
                            }
                            if(this.diaInicioCriterioRiego=="Martes."){
                                this.numeroDiaInicioCriterioRiego=2;
                            }
                            if(this.diaInicioCriterioRiego=="Miércoles."){
                                this.numeroDiaInicioCriterioRiego=3;
                            }
                            if(this.diaInicioCriterioRiego=="Jueves."){
                                this.numeroDiaInicioCriterioRiego=4;
                            }
                            if(this.diaInicioCriterioRiego=="Viernes."){
                                this.numeroDiaInicioCriterioRiego=5;
                            }
                            if(this.diaInicioCriterioRiego=="Sábado."){
                                this.numeroDiaInicioCriterioRiego=6;
                            }
                            if(this.diaInicioCriterioRiego=="Doming."){
                                this.numeroDiaInicioCriterioRiego=7;
                            }
                            this.errorMessageModificarCriterio=="";
                            this.selectIndex+=1;
                        }
                    }
                    else{
                        if(this.volumenAgua==null){
                            this.errorMessageModificarCriterio=="Debe completar todos los campos obligatorios (*).";
                        }
                        else{
                            if(this.volumenAgua<=0){
                                this.errorMessageModificarCriterio="El volumen de agua no puede ser menor o igual a cero.";
                            }
                            else{
                                this.errorMessageModificarCriterio="";
                                this.selectIndex+=1;
                            }
                        }
                    }
                }
            }
        }
    }

    apretarModificarCriterioRiego(){
        this.gestionarConfiguracionRiegoService.modificarCriterioConfiguracionRiego(this.idFinca,this.idMecanismoRiegoFincaSector,this.idConfiguracionRiego,
            this.tipoCriterio,this.idCriterioRiego,this.nombre,this.descripcion,this.medicionSeleccionada,this.valorMedicion,this.volumenAgua,
            this.horaInicioCriterioRiego,this.diaInicioCriterioRiego,this.operadorEnviar)
            .then(
                reponse=>{
                    this.router.navigate(['/homeConfiguracionRiego/'+this.idFinca+"/"+this.idMecanismoRiegoFincaSector+"/"+this.idConfiguracionRiego+"/"+this.idSector]);
                }
            )
            .catch(
                error=>{
                    this.errorMessageModificarCriterio=error.error_description;
                }
            );
    }

    apretarSalir(){
        this.router.navigate(['/homeConfiguracionRiego/'+this.idFinca+"/"+this.idMecanismoRiegoFincaSector+"/"+this.idConfiguracionRiego+"/"+this.idSector]);
    }
}

  