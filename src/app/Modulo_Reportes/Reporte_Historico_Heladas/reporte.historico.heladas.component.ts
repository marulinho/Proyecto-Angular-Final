import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DialogExampleComponent } from '../../shared/dialog/dialog-example/dialog-example.component';
import { MdDialog } from '@angular/material';
import { AppService } from '../../app.service';
import { GenerarReportesService, Helada } from '../generar.repotes.service';
import { GestionarEventoPersonalizadoService, ConfiguracionEvento } from '../Gestionar_Evento_Persinalizado/gestionar.evento.personalizado.service';
import { ErroresSistema } from '../../Datos_Sistema/errores.sistema';

@Component({
    selector: 'reporte-historico-heladas',
    templateUrl: './reporte.historico.heladas.component.html',
    styleUrls: ['./reporte.historico.heladas.component.css']

})

export class ReporteHistoricoHeladaComponent implements OnInit {

    erroresSistema = new ErroresSistema();
    permisoGenerarReporteHeladas = JSON.parse(localStorage.getItem('puedeGenerarInformeHeladasHistorico'));

    errorMessageReporte = "";
    idFinca:number=JSON.parse(localStorage.getItem('idFinca')); 
    idSector:number=JSON.parse(localStorage.getItem('idSector'));
    nombreReporte:string=JSON.parse(localStorage.getItem('nombreReporte'));
    descripcionReporte:string=JSON.parse(localStorage.getItem('descripcionReporte'));   
    
   
    fecha = new Date();
    hora=new Date();

    heladas:Helada;
    cantidadHeladas:number;
    heladasExistentes:Boolean;
    mediciones=[];
    fechaInicioReporte;
    fechaFinReporte;

    constructor(private router: Router,
        private route: ActivatedRoute,
        private appService: AppService,
        private generarReportesService:GenerarReportesService,
        private gestionarEventoPersonalizadoService:GestionarEventoPersonalizadoService,
        private dialog: MdDialog) {
        appService.getState().topnavTitle = "Reporte Histórico Heladas.";

    }

    ngOnInit(){}

    getHeladasExistentes(){
        return this.heladasExistentes;
    }

    getPermisoGenerarReporteHeladas(){
        return this.permisoGenerarReporteHeladas;
    }
    
    apretarGenerarReporte(){
        let resultado=this.compararFechas();
        if(resultado){
            this.generarReportesService.obtenerInformeHeladasHistorico(this.idFinca,this.idSector,this.fechaInicioReporte,this.fechaFinReporte)
            .then(
                response=>{
                    if(response.detalle_operacion=="No hay datos"){
                        this.errorMessageReporte="No se han registrados heladas durante ese periodo de días.";
                    }
                    else{
                        this.heladas=response.datos_operacion['dto_evento_lista'];
                        this.cantidadHeladas=this.heladas['cantidad'];
                        this.buscarConfiguracion(3);
                        this.heladasExistentes=true;
                    }
                }
            )
            .catch(
                error=>{
                    if (error.error_description == this.erroresSistema.getInicioSesion()) {
                        this.router.navigate(['/login/']);
                    }
                    else{
                        this.errorMessageReporte=error.error_description;
                    }
                }
            );
        }
    }

    compararFechas(){
        let resultado:boolean;
        if( this.fechaInicioReporte==null || this.fechaInicioReporte=="" ||
            this.fechaFinReporte==null || this.fechaFinReporte==null){
            this.errorMessageReporte="Debe completar todos los campos obligatorios (*).";
            resultado=false;
        }
        else{ 
            let fechaInicializacion=[];
            let fechaInicial;
            fechaInicializacion=this.fechaInicioReporte.split("-");
            fechaInicial=parseInt(fechaInicializacion[0]+""+fechaInicializacion[1]+""+fechaInicializacion[2]);

            let fechaFinalizacion=[];
            let fechaFinal;
            fechaFinalizacion=this.fechaFinReporte.split("-");
            fechaFinal=parseInt(fechaFinalizacion[0]+""+fechaFinalizacion[1]+""+fechaFinalizacion[2]);

            if(fechaInicial>fechaFinal){
                this.errorMessageReporte="La fecha inicial no puede ser mayor que la fecha final.";
                resultado=false;
            }
            else{
                this.errorMessageReporte="";
                resultado=true;
            }
        }
        return resultado;
    }

    buscarConfiguracion(idConfiguracionEvento:number){
        this.gestionarEventoPersonalizadoService.mostrarConfiguracionEventoPersonalizado(this.idFinca,idConfiguracionEvento)
            .then(
                response=>{
                    if(response.detalle_operacion=="No hay datos"){
                        this.errorMessageReporte="No se han podido obtener las heladas, intente de nuevo.";
                    }
                    else{
                        this.mediciones = response.datos_operacion;
                    }
                }
            )
            .catch(
                error=>{
                    if(this.erroresSistema.getInicioSesion()){
                        this.router.navigate(['/login/']);
                    }
                    else{
                        this.errorMessageReporte=error.error_description;
                    }
                }
            );
    }

    apretarSalir(){
        this.router.navigate(['/homeReportes/']);
    }
}
