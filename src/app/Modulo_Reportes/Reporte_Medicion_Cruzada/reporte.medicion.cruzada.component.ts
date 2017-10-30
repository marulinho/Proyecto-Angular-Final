import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DialogExampleComponent } from '../../shared/dialog/dialog-example/dialog-example.component';
import { MdDialog } from '@angular/material';
import { AppService } from '../../app.service';
import { GenerarReportesService, MedicionCruzada } from '../generar.repotes.service';
import { ErroresSistema } from '../../Datos_Sistema/errores.sistema';

@Component({
    selector: 'reporte-medicion-cruzada',
    templateUrl: './reporte.medicion.cruzada.component.html',
    styleUrls: ['./reporte.medicion.cruzada.component.css']

})

export class ReporteMedicionCruzadaComponent implements OnInit {

    erroresSistema = new ErroresSistema();
    permisoGenerarMedicionCruzada = JSON.parse(localStorage.getItem('puedeGenerarInformeCruzadoRiegoMedicion'));

    errorMessageReporte = "";
    idFinca:number=parseInt(JSON.parse(localStorage.getItem('idFinca'))); 
    idSector:number=parseInt(JSON.parse(localStorage.getItem('idSector')));
    nombreReporte:string=JSON.parse(localStorage.getItem('nombreReporte'));
    descripcionReporte:string=JSON.parse(localStorage.getItem('descripcionReporte'));   

   
    dia = new Date().getDay();
    mes = new Date().getMonth() + 1;
    anio = new Date().getFullYear();
    fechaActual: string = this.dia + "-" + this.mes + "-" + this.anio;
    hora=new Date().getHours();
    minutos=new Date().getMinutes();
    segundos = new Date().getSeconds();
    horaActual = this.hora+":"+this.minutos+":"+this.segundos;

    fechaInicioReporte:string;
    fechaFinReporte:string;
    medicionCruzada=[];



    constructor(private router: Router,
        private route: ActivatedRoute,
        private appService: AppService,
        private generarReportesService:GenerarReportesService,
        private dialog: MdDialog) {
        appService.getState().topnavTitle = "Reporte Medición Cruzada.";

    }

    ngOnInit(){
        this.generarReportesService.obtenerInformeMedicionCruzada(this.idFinca,this.idSector,this.fechaInicioReporte,this.fechaFinReporte)
            .then(
                response=>{
                    if(response.detalle_operacion=="No hay datos"){
                        this.errorMessageReporte="No hay registros en el plazo de tiempo establecido.";
                    }
                    else{
                        this.medicionCruzada=response.datos_operacion;
                        this.obtenerTablas();
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

    getPermisoGenerarMedicionCruzada(){
        return this.permisoGenerarMedicionCruzada;
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

    obtenerTablas(){
        let mediciones = this.medicionCruzada['ejecucion'];
        let longitud = Object.keys(this.medicionCruzada).length;
        let diasRiego=[];

        for(var i=0;i<longitud;i++){
            let fechaInicio = mediciones['fechaHoraInicio'].substring(0,10);
            let horaInicio = mediciones['fechaHoraInicio'].substring(12,19);
            let fechaFinal = mediciones['fechaHoraFinalizacion'].substring(0,10);
            let horaFinal = mediciones['fechaHoraFinalizacion'].substring(12,19);
        }
    }

}

export class diasRiego{
    
}