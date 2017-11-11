import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DialogExampleComponent } from '../../shared/dialog/dialog-example/dialog-example.component';
import { MdDialog } from '@angular/material';
import { AppService } from '../../app.service';
import { GenerarReportesService, RiegoSector } from '../generar.repotes.service';
import { ErroresSistema } from '../../Datos_Sistema/errores.sistema';


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
}
