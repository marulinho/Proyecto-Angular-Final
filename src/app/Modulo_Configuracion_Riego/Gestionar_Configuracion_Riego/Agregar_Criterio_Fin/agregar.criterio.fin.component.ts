import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from '../../../app.service';
import { GestionarConfiguracionRiegoService } from '../gestionar.configuracion.riego.service';
import { GestionarEventoPersonalizadoService, TipoMedicion } from '../../../Modulo_Reportes/Gestionar_Evento_Persinalizado/gestionar.evento.personalizado.service';
import { ErroresSistema } from '../../../Datos_Sistema/errores.sistema';

@Component({
    selector:'agregar-criterio-fin',
    templateUrl: './agregar.criterio.fin.component.html',
    styleUrls:['./agregar.criterio.fin.component.css']
    
})

export class AgregarCriterioFinComponent implements OnInit{
    
    erroresSistema = new ErroresSistema();
    permisoModificarConfiguracionRiego = JSON.parse(localStorage.getItem('puedeModificarConfiguracionRiego'));

    //GENERALES
    idFinca:number=JSON.parse(localStorage.getItem('idFinca'));
    idMecanismoRiegoFincaSector:number=JSON.parse(localStorage.getItem('idMecanismoRiegoFincaSector'));
    idConfiguracionRiego:number=JSON.parse(localStorage.getItem('idConfiguracionRiego'));
    idSector:number=JSON.parse(localStorage.getItem('idSector'));
    tooltipAgregarCriterioFinal='Agregar Criterio';
    position='above';
    errorMessageAgregarCriterioFinal="";
    selectIndex:number=0;

    criterioInicial:string=JSON.parse(localStorage.getItem('criterioInicial'));

    //CREAR CRITERIO FINAL
    nombreCriterio:string;
    tipoSeleccionado:string;
    descripcionCriterio:string;
    criteriosTipo=[];
    
    //CRITERIO MEDICION
    tipoMediciones:TipoMedicion;
    tipoMedicion:number;
    valorMedicionCriterioRiego:number;
    operadoresMedicion=['<=','>='];
    operadorSeleccionado:string;
    operadorEnviar:string;

    //CRITERIO HORA
    horaInicioCriterioRiego:string;
    horaInicioCriterioRiegoString:string;
    diaInicioCriterioRiego:string;
    numeroDiaInicioCriterioRiego:number;    
    diasCriterio=['Lunes.','Martes.','Miércoles.','Jueves.','Viernes.','Sábado.','Domingo.']; 

    //CRITERIO VOLUMEN AGUA
    volumenAgua:number;
    

    constructor(private router: Router,
                private route:ActivatedRoute,
                private gestionarConfiguracionRiegoService:GestionarConfiguracionRiegoService,
                private gestionarEventoPersonalizadoService:GestionarEventoPersonalizadoService,
                private appService: AppService) {
            this.appService.getState().topnavTitle="Agregar Criterio Fin";
            if(this.criterioInicial=="criterio_riego_medicion"){
                this.criteriosTipo=["Medición.","Hora."];
            }
            else{
                this.criteriosTipo=["Medición.","Hora.","Volumen Agua."];
            }

    }

    ngOnInit(){
        this.gestionarEventoPersonalizadoService.mostrarTipoMedicionInternaFinca(this.idFinca)
            .then(
                response=>{
                    this.tipoMediciones=response.datos_operacion;
                }
            )
            .catch(
                error=>{
                    if (error.error_description == this.erroresSistema.getInicioSesion()) {
                        this.router.navigate(['/login/']);
                    }
                    else{
                        this.errorMessageAgregarCriterioFinal=error.error_description;
                    }
                }
            );
    }
    
    getPermisoModificarConfiguracionRiego(){
        return this.permisoModificarConfiguracionRiego;
    }

    apretarNextCrear(){
        if(this.selectIndex==0){
            if( this.nombreCriterio=="" || this.nombreCriterio==null ||
                this.descripcionCriterio=="" || this.descripcionCriterio==null ||
                this.tipoSeleccionado=="" || this.tipoSeleccionado==null){
                    this.errorMessageAgregarCriterioFinal="Debe completar todos los campos obligatorios (*).";
            }
            else{
                if(this.tipoSeleccionado=='Medición.'){
                    if( this.operadorSeleccionado=="" || this.operadorSeleccionado==null ||
                        this.tipoMedicion==null || this.valorMedicionCriterioRiego==null){
                        this.errorMessageAgregarCriterioFinal="Debe completar todos los campos obligatorios (*).";
                    }
                    else{
                        if(this.tipoMedicion<0 || this.valorMedicionCriterioRiego<0){
                            this.errorMessageAgregarCriterioFinal="No puede asignar valores negativos.";
                        }
                        else{
                            if(this.operadorSeleccionado==">="){
                                this.operadorEnviar="1";
                            }
                            else{
                                this.operadorEnviar="0";
                            }
                            this.errorMessageAgregarCriterioFinal="";
                            this.selectIndex +=1;
                        }
                    }
                }
                else{
                    if(this.tipoSeleccionado=="Hora."){
                        if( this.horaInicioCriterioRiego == null || this.horaInicioCriterioRiego =="" ||
                            this.diaInicioCriterioRiego == null || this.diaInicioCriterioRiego ==""){
                                this.errorMessageAgregarCriterioFinal="Debe completar todos los campos obligatorios (*).";                            
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
                            if(this.diaInicioCriterioRiego=="Domingo."){
                                this.numeroDiaInicioCriterioRiego=7;
                            }
                            let variableAuxiliar = this.horaInicioCriterioRiego;
                            variableAuxiliar = variableAuxiliar.toString();
                            this.horaInicioCriterioRiegoString = variableAuxiliar.substring(16,21);
                            this.errorMessageAgregarCriterioFinal=="";
                            this.selectIndex+=1;                        
                        }
                    }
                    else{
                        if(this.volumenAgua==null){
                            this.errorMessageAgregarCriterioFinal="Debe completar todos los campos obligatorios (*).";
                        }
                        else{
                            if(this.volumenAgua<=0){
                                this.errorMessageAgregarCriterioFinal="El volumen de agua no puede ser menor o igual que cero.";
                            }
                            else{
                                this.errorMessageAgregarCriterioFinal="";
                                this.selectIndex+=1;
                            }
                        }
                    }
                    
                }
            }
        }
    }

    apretarCrearCriterioFinalRiego(){
        if(this.tipoSeleccionado=="Medición."){
            this.tipoSeleccionado="criterio_riego_medicion";
        }
        else{
            if(this.tipoSeleccionado=="Hora."){
                this.tipoSeleccionado="criterio_riego_hora";
            }
            else{
                this.tipoSeleccionado="criterio_riego_volumen_agua";
            }
        }
        this.gestionarConfiguracionRiegoService.agregarCriterioFinalRiegoFinca(this.idFinca,this.idMecanismoRiegoFincaSector,this.idConfiguracionRiego,
                this.tipoSeleccionado,this.nombreCriterio,this.descripcionCriterio,this.tipoMedicion,this.valorMedicionCriterioRiego,this.volumenAgua,
                this.horaInicioCriterioRiegoString,this.numeroDiaInicioCriterioRiego,this.operadorEnviar)
                    .then(
                        reponse=>{
                            this.router.navigate(['/homeConfiguracionRiego/']);
                        }
                    )
                    .catch(
                        error=>{
                            if (error.error_description == this.erroresSistema.getInicioSesion()) {
                                this.router.navigate(['/login/']);
                            }
                            else{
                                this.errorMessageAgregarCriterioFinal=error.error_description;
                            }
                        }
                    );
            }

    apretarSalir(){
        this.router.navigate(['/homeConfiguracionRiego/']);
    }
}

  