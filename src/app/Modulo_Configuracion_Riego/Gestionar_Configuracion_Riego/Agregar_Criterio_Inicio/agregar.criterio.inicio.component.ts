import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from '../../../app.service';
import { GestionarConfiguracionRiegoService } from '../gestionar.configuracion.riego.service';
import { GestionarEventoPersonalizadoService, TipoMedicion } from '../../../Modulo_Reportes/Gestionar_Evento_Persinalizado/gestionar.evento.personalizado.service';
import { ErroresSistema } from '../../../Datos_Sistema/errores.sistema';

@Component({
    selector:'agregar-criterio-inicio',
    templateUrl: './agregar.criterio.inicio.component.html',
    styleUrls:['./agregar.criterio.inicio.component.css']
    
})

export class AgregarCriterioInicioComponent implements OnInit{
    
    erroresSistema = new ErroresSistema();
    permisoGestionarConfiguracionRiego=JSON.parse(localStorage.getItem('puedeModificarConfiguracionRiego'));

    //GENERALES
    idFinca:number;
    idMecanismoRiegoFincaSector:number;
    idConfiguracionRiego:number;
    idSector:number;
    tooltipAgregarCriterioInicial='Agregar Criterio';
    position='above';
    errorMessageAgregarCriterioInicial="";
    selectIndex:number=0;

    //CREAR CRITERIO INICIO
    nombreCriterio:string;
    tipoSeleccionado:string;
    descripcionCriterio:string;
    criteriosTipo=['Medición.','Hora.'];
    
    //CRITERIO MEDICON
    tipoMediciones:TipoMedicion;
    tipoMedicion:number;
    valorMedicionCriterioRiego:number;
    operadoresMedicion=['<=','>='];
    operadorSeleccionado:string;
    operadorEnviar:string;

    //CRITERIO HORA
    horaInicioCriterioRiego:string;
    diaInicioCriterioRiego:string;
    numeroDiaInicioCriterioRiego:number;    
    diasCriterio=['Lunes.','Martes.','Miércoles.','Jueves.','Viernes.','Sábado.','Domingo.']; 
    

    constructor(private router: Router,
                private route:ActivatedRoute,
                private gestionarConfiguracionRiegoService:GestionarConfiguracionRiegoService,
                private gestionarEventoPersonalizadoService:GestionarEventoPersonalizadoService,
                private appService: AppService) {
            this.appService.getState().topnavTitle="Agregar Criterio Inicio.";
            this.route.params.subscribe(params => {
                
                this.idFinca = +params['idFinca'];
                this.idMecanismoRiegoFincaSector =+params['idMecanismoRiegoFincaSector'];
                this.idConfiguracionRiego=+params['idConfiguracionRiego'];
                this.idSector = +params['idSector'];                

            });
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
                        this.errorMessageAgregarCriterioInicial=error.error_description;
                    }
                }
            );
    }
    
    getPermisoGestionarConfiguracionRiego(){
        return this.permisoGestionarConfiguracionRiego;
    }
    apretarNextCrear(){
        if(this.selectIndex==0){
            if( this.nombreCriterio=="" || this.nombreCriterio==null ||
                this.descripcionCriterio=="" || this.descripcionCriterio==null ||
                this.tipoSeleccionado=="" || this.tipoSeleccionado==null){
                    this.errorMessageAgregarCriterioInicial="Debe completar todos los campos obligatorios (*).";
            }
            else{
                if(this.tipoSeleccionado=='Medición.'){
                    if( this.operadorSeleccionado=="" || this.operadorSeleccionado==null ||
                        this.tipoMedicion==null || this.valorMedicionCriterioRiego==null){
                        this.errorMessageAgregarCriterioInicial="Debe completar todos los campos obligatorios (*).";
                    }
                    else{
                        if(this.tipoMedicion<0 || this.valorMedicionCriterioRiego<0){
                            this.errorMessageAgregarCriterioInicial="No puede asignar valores negativos.";
                        }
                        else{
                            if(this.operadorSeleccionado==">="){
                                this.operadorEnviar="1";
                            }
                            else{
                                this.operadorEnviar="0";
                            }
                            this.errorMessageAgregarCriterioInicial="";
                            this.selectIndex +=1;
                        }
                    }
                }
                else{
                    if( this.horaInicioCriterioRiego == null || this.horaInicioCriterioRiego =="" ||
                        this.diaInicioCriterioRiego == null || this.diaInicioCriterioRiego ==""){
                            this.errorMessageAgregarCriterioInicial="Debe completar todos los campos obligatorios (*).";                            
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
                        this.errorMessageAgregarCriterioInicial=="";
                        this.selectIndex+=1;
                    }
                }
            }
        }
    }

    apretarCrearCriterioInicialRiego(){
        if(this.tipoSeleccionado=="Medición."){
            this.tipoSeleccionado="criterio_riego_medicion";
        }
        else{
            this.tipoSeleccionado="criterio_riego_hora";
        }
        this.gestionarConfiguracionRiegoService.agregarCriterioInicialRiegoFinca(this.idFinca,this.idMecanismoRiegoFincaSector,
            this.idConfiguracionRiego,this.tipoSeleccionado,this.nombreCriterio,this.descripcionCriterio,this.tipoMedicion,
            this.valorMedicionCriterioRiego,this.horaInicioCriterioRiego,this.numeroDiaInicioCriterioRiego,this.operadorEnviar)
            .then(
                reponse=>{
                    this.router.navigate(['/homeConfiguracionRiego/'+this.idFinca+"/"+this.idMecanismoRiegoFincaSector+"/"+this.idConfiguracionRiego+"/"+this.idSector]);
                }
            )
            .catch(
                error=>{
                    if (error.error_description == this.erroresSistema.getInicioSesion()) {
                        this.router.navigate(['/login/']);
                    }
                    else{
                        this.errorMessageAgregarCriterioInicial=error.error_description;
                    }
                }
            );
    }

    apretarSalir(){
        this.router.navigate(['/homeConfiguracionRiego/'+this.idFinca+"/"+this.idMecanismoRiegoFincaSector+"/"+this.idConfiguracionRiego+"/"+this.idSector]);
    }
}

  