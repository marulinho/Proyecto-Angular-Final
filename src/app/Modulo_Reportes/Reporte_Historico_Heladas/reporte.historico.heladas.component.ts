import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DialogExampleComponent } from '../../shared/dialog/dialog-example/dialog-example.component';
import { MdDialog } from '@angular/material';
import { AppService } from '../../app.service';
import { GenerarReportesService, Helada } from '../generar.repotes.service';
import { GestionarEventoPersonalizadoService, ConfiguracionEvento } from '../Gestionar_Evento_Persinalizado/gestionar.evento.personalizado.service';
import { ErroresSistema } from '../../Datos_Sistema/errores.sistema';
import * as jsPDF from 'jspdf';



@Component({
    selector: 'reporte-historico-heladas',
    templateUrl: './reporte.historico.heladas.component.html',
    styleUrls: ['./reporte.historico.heladas.component.css']

})

export class ReporteHistoricoHeladaComponent implements OnInit {

    erroresSistema = new ErroresSistema();
    permisoGenerarReporteHeladas = JSON.parse(localStorage.getItem('puedeGenerarInformeHeladasHistorico'));
    tooltipAtras ='Volver HomeReportes';
    position = 'above';
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
        appService.getState().topnavTitle = "Reporte Histórico Heladas";

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
                    if (error.error_description == this.erroresSistema.getInicioSesion()) {
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
    apretarAtras(){
        this.router.navigate(['/homeReportes/']);
    }

    apretarGuardar(){
        var doc = new jsPDF('letter');
        console.log(document.getElementById('table-container'));
        
        var lMargin=5; //left margin in mm
        var rMargin=5; //right margin in mm
        var pdfInMM=230;
        var paragraph= this.descripcionReporte;
        var lines = doc.splitTextToSize(paragraph, (pdfInMM-lMargin-rMargin));     

        doc.setFontSize(25);
        doc.text(50, 20, 'Reporte Histórico Heladas.');

        doc.setFontSize(20);
        doc.text(5, 30, 'Información General Reporte.');
        doc.text(5,60, 'Detalle Reporte.');

        doc.setFontSize(13);
        doc.setFontType("bold");
        doc.text(5, 40, 'Nombre: ')
        doc.text(5,45,'Descripción: ');

        doc.text(5, 70, 'Fecha inicio: ');
        doc.text(5, 75, 'fecha fin: ');
        doc.text(5, 80, 'Cantidad de ocurrencias: ');

        doc.setFontType("normal");
        doc.text(25,40,this.nombreReporte);
        doc.text(35,45,lines);        
                 
        doc.text(35, 70, this.fechaInicioReporte+'.');
        doc.text(35, 75, this.fechaFinReporte+'.');
        doc.text(65, 80, this.cantidadHeladas+' heladas.');
        
        doc.addPage();
        doc.addHTML(document.getElementById('table-container'),0,0 , {}, function() {
          doc.save('ReporteHistoricoHelada.pdf');
        });

        
    }
}
