import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DialogExampleComponent } from '../../shared/dialog/dialog-example/dialog-example.component';
import { MdDialog } from '@angular/material';
import { AppService } from '../../app.service';
import { GenerarReportesService, InformeEvento } from '../generar.repotes.service';
import { GestionarEventoPersonalizadoService , ConfiguracionEvento } from'../../Modulo_Reportes/Gestionar_Evento_Persinalizado/gestionar.evento.personalizado.service';
import { ErroresSistema } from '../../Datos_Sistema/errores.sistema';
import * as jsPDF from 'jspdf';


@Component({
    selector: 'reporte-evento-personalizado',
    templateUrl: './reporte.evento.personalizado.component.html',
    styleUrls: ['./reporte.evento.personalizado.component.css']

})

export class ReporteEventoPersonalizadoComponent implements OnInit {

    erroresSistema = new ErroresSistema();
    permisoGenerarReporteEventoPersonalizado = JSON.parse(localStorage.getItem('puedeGenerarInformeEventoPersonalizado'));

    errorMessageReporte = "";
    idFinca:number=JSON.parse(localStorage.getItem('idFinca')); 
    idSector:number=JSON.parse(localStorage.getItem('idSector'));
    nombreReporte:string=JSON.parse(localStorage.getItem('nombreReporte'));
    descripcionReporte:string=JSON.parse(localStorage.getItem('descripcionReporte'));   

    tooltipAtras ='Volver HomeReportes';
    position = 'above';
    fecha=new Date();
    hora=new Date();

    eventosPersonalizados : ConfiguracionEvento;
    configuracionesEvento:ConfiguracionEvento;
    eventosExistentes:Boolean;
    eventoSeleccionado;
    fechaInicioReporte;
    fechaFinReporte;
    informeEvento:InformeEvento;
    cantidad:number;

    valorMinimoInterna;
    valorMaximoInterna;
    unidadMedicionInterna;
    tipoMedicionInterna;

    valorMinimoExterna;
    valorMaximoExterna;
    unidadMedicionExterna;
    tipoMedicionExterna;

    constructor(private router: Router,
        private route: ActivatedRoute,
        private appService: AppService,
        private generarReportesService:GenerarReportesService,
        private gestionarEventoPersonalizadoService:GestionarEventoPersonalizadoService,
        private dialog: MdDialog) {
        appService.getState().topnavTitle = "Reporte Evento Personalizado";


    }

    ngOnInit(){
        this.gestionarEventoPersonalizadoService.buscarEventoFinca(this.idFinca)
            .then(
                response=>{
                    if(response.detalle_operacion=="No hay datos"){
                        this.errorMessageReporte="No hay eventos configurados para la finca seleccionada.";
                    }
                    else{
                        this.eventosPersonalizados=response.datos_operacion;
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
            )
        
    }

    getPermisoGenerarReporteEventoPersonalizado(){
        return this.permisoGenerarReporteEventoPersonalizado;
    }
    getEventosExistente(){
        return this.eventosExistentes;
    }

    obtenerConfiguracionEvento(){
    	console.log(this.eventoSeleccionado)
        this.gestionarEventoPersonalizadoService.mostrarConfiguracionEventoPersonalizado(this.idFinca,this.eventoSeleccionado)
            .then(
                response=>{
                    if(response.detalle_operacion=="No hay datos"){
                        this.errorMessageReporte="No se ha podido obtener la configuración del evento, intente de nuevo.";
                    }
                    else{
                        this.configuracionesEvento=response.datos_operacion;

                        console.log(this.tipoMedicionInterna=this.configuracionesEvento['lista_mediciones_internas'][0]['tipo_medicion']);
                        this.unidadMedicionInterna =this.configuracionesEvento['lista_mediciones_internas'][0]['unidad_medicion'];
                        this.valorMaximoInterna =this.configuracionesEvento['lista_mediciones_internas'][0]['valor_maximo'];
                        this.valorMinimoInterna =this.configuracionesEvento['lista_mediciones_internas'][0]['valor_minimo'];
            
                        this.valorMinimoExterna =this.configuracionesEvento['lista_mediciones_internas'][0]['valor_minimo'];
                        this.valorMaximoExterna =this.configuracionesEvento['lista_mediciones_internas'][0]['valor_maximo'];
                        this.unidadMedicionExterna =this.configuracionesEvento['lista_mediciones_internas'][0]['unidad_medicion'];
                        this.tipoMedicionExterna =this.configuracionesEvento['lista_mediciones_internas'][0]['tipo_medicion'];
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

    apretarGenerarReporte(){
        this.obtenerConfiguracionEvento();
        let resultado=this.compararFechas();
        if(resultado){
            this.generarReportesService.obtenerInformeEventosPersonalizados(this.eventoSeleccionado,this.idSector,this.idFinca,this.fechaInicioReporte,this.fechaFinReporte)
                .then(
                    response=>{
                        if(response.detalle_operacion=="No hay datos"){
                            this.errorMessageReporte="No se han registrados eventos en el lapso de tiempo establecido.";
                        }
                        else{
                            this.informeEvento=response.datos_operacion;
                            this.cantidad=(response.datos_operacion).length;
                            this.eventosExistentes=true;
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
        doc.text(50, 20, 'Reporte Evento Personalizado.');

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
                 
        doc.text(43, 70, this.fechaInicioReporte+'.');
        doc.text(40, 75, this.fechaFinReporte+'.');
        doc.text(65, 80, this.cantidad+' ocurrencias.');
        
        doc.addPage();
        doc.addHTML(document.getElementById('table-container'),10,10 , {}, function() {
          doc.save('ReporteEventoPersonalizado.pdf');
        });

        
    }
}
