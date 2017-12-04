import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DialogExampleComponent } from '../../shared/dialog/dialog-example/dialog-example.component';
import { MdDialog } from '@angular/material';
import { AppService } from '../../app.service';
import { GenerarReportesService, RiegoSector } from '../generar.repotes.service';
import { ErroresSistema } from '../../Datos_Sistema/errores.sistema';
import * as jsPDF from 'jspdf';


@Component({
    selector: 'reporte-riego-ejecucion',
    templateUrl: './reporte.riego.ejecucion.component.html',
    styleUrls: ['./reporte.riego.ejecucion.component.css']

})

export class ReporteRiegoEjecucionComponent implements OnInit {

    erroresSistema = new ErroresSistema();
    permisoRiegoEjecucion = JSON.parse(localStorage.getItem('puedeGenerarInformeRiegoEnEjecucion'));

    errorMessageReporte = "";
    idFinca:number=parseInt(JSON.parse(localStorage.getItem('idFinca'))); 
    idSector:number=parseInt(JSON.parse(localStorage.getItem('idSector')));
    nombreReporte:string=JSON.parse(localStorage.getItem('nombreReporte'));
    descripcionReporte:string=JSON.parse(localStorage.getItem('descripcionReporte'));   
    riegoActual:RiegoSector;
    riegoSeleccionado:Boolean;
   
    fecha=new Date();
    hora=new Date();

    progreso:string;
    fechaInicioProgramada:string;
    fechaInicioReal:string;
    fechaFinProgramada:string;

    aguaUtilizada;
    criterioRiego;


    constructor(private router: Router,
        private route: ActivatedRoute,
        private appService: AppService,
        private generarReportesService:GenerarReportesService,
        private dialog: MdDialog) {
        appService.getState().topnavTitle = "Reporte Riego Ejecución";

    }

    ngOnInit(){
        this.generarReportesService.obtenerInformeRiegoEjecucionSector(this.idSector,this.idFinca)
        .then(
            response=>{
                if(response.detalle_operacion=="No hay datos" || response.datos_operacion['ejecucion_riego']==""){
                    this.errorMessageReporte="No hay riegos en ejecución.";
                }
                else{
                    this.riegoActual=response.datos_operacion;

                    this.aguaUtilizada=this.riegoActual['ejecucion_riego']['cantidadAguaUtilizadaLitros'];
                    this.criterioRiego = this.riegoActual['ejecucion_riego']['detalle'];

                    //estado
                    this.progreso=this.riegoActual['ejecucion_riego']['estado_ejecucion_riego'];
                    if(this.progreso=="en_ejecucion"){
                        this.progreso="En ejecución.";
                    }

                    //hora inicio programada
                    this.fechaInicioProgramada=this.riegoActual['ejecucion_riego']['fechaHoraInicioProgramada'];
                    if(this.fechaInicioProgramada==null){
                        this.fechaInicioProgramada="No ha sido determinada";
                    }
                    else{
                        this.fechaInicioProgramada=this.fechaInicioProgramada.substring(0,10) +" "+this.fechaInicioProgramada.substring(11,19) ;
                    }

                    //hora final programada
                    this.fechaFinProgramada=this.riegoActual['ejecucion_riego']['fechaHoraFinalProgramada'];
                    if(this.fechaFinProgramada==null){
                        this.fechaFinProgramada="No ha sido determinada";
                    }
                    else{
                        this.fechaFinProgramada=this.fechaFinProgramada.substring(0,10)+" "+this.fechaFinProgramada.substring(11,19);
                    }

                    //hora inicio real
                    this.fechaInicioReal=this.riegoActual['ejecucion_riego']['fechaHoraInicio'];
                    if(this.fechaInicioReal==null){
                        this.fechaInicioReal="No ha sido determinada";
                    }
                    else{
                        this.fechaInicioReal=this.fechaInicioReal.substring(0,10)+" "+this.fechaInicioReal.substring(11,19);
                    }

                    this.riegoSeleccionado=true;
                    
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

    getRiegoSeleccionado(){
        return this.riegoSeleccionado;
    }
    
    getPermisoRiegoEjecucion(){
        return this.permisoRiegoEjecucion;
    }
    apretarSalir(){
        this.router.navigate(['/homeReportes/']);
    }

    apretarGuardar(){
        var doc = new jsPDF();
        var lMargin=5; //left margin in mm
        var rMargin=5; //right margin in mm
        var pdfInMM=200;
        var paragraph= this.descripcionReporte;
        var lines = doc.splitTextToSize(paragraph, (pdfInMM-lMargin-rMargin));     

        doc.setFontSize(25);
        doc.text(50, 20, 'Reporte Riego en Ejecución.');

        doc.setFontSize(20);
        doc.text(5, 30, 'Información General Reporte.');
        doc.text(5,60, 'Detalle Reporte.');

        doc.setFontSize(13);
        doc.setFontType("bold");
        doc.text(5, 40, 'Nombre: ')
        doc.text(5,45,'Descripción: ');

        doc.text(5, 70, 'Fecha inicio programada: ');
        doc.text(5, 75, 'Fecha inicio real: ');
        doc.text(5, 80, 'Fecha fin programada: ');
        doc.text(5, 85, 'Agua utilizada: ');
        doc.text(5, 90, 'Criterio de riego: ');
        doc.text(5, 95, 'Progreso: ');

        doc.setFontType("normal");
        doc.text(25,40,this.nombreReporte);
        doc.text(35,45,lines);        
                 
        doc.text(65, 70, this.fechaInicioProgramada+'.');
        doc.text(45, 75, this.fechaInicioReal+'.');
        doc.text(58, 80, this.fechaFinProgramada+'.');
        doc.text(40, 85, this.aguaUtilizada+' litros.');
        doc.text(45, 90, this.criterioRiego+'.');
        doc.text(30, 95, this.progreso);
        
            
        // Save the PDF
        doc.save('ReporteRiegoEjecucion.pdf');
    }
}
