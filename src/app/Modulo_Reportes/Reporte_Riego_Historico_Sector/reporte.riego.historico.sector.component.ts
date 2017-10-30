import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DialogExampleComponent } from '../../shared/dialog/dialog-example/dialog-example.component';
import { MdDialog } from '@angular/material';
import { AppService } from '../../app.service';
import { GenerarReportesService, RiegoSector } from '../generar.repotes.service';
import { ErroresSistema } from '../../Datos_Sistema/errores.sistema';

@Component({
    selector: 'reporte-riego-historico',
    templateUrl: './reporte.riego.historico.sector.component.html',
    styleUrls: ['./reporte.riego.historico.sector.component.css']

})

export class ReporteRiegoHistoricoSectorComponent implements OnInit {

    erroresSistema = new ErroresSistema();
    permisoRiegoHistorico = JSON.parse(localStorage.getItem('puedeGenerarInformeRiegoPorSectoresHistorico'));

    errorMessageReporte = "";
    idFinca:number=parseInt(JSON.parse(localStorage.getItem('idFinca'))); 
    idSector:number=parseInt(JSON.parse(localStorage.getItem('idSector')));
    nombreReporte:string=JSON.parse(localStorage.getItem('nombreReporte'));
    descripcionReporte:string=JSON.parse(localStorage.getItem('descripcionReporte'));   
    riegosResponse:RiegoSector;
    riegosHistoricos=[];
    riegosSeleccionado:Boolean;
   
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
    

    constructor(private router: Router,
        private route: ActivatedRoute,
        private appService: AppService,
        private generarReportesService:GenerarReportesService,
        private dialog: MdDialog) {
        appService.getState().topnavTitle = "Reporte Histórico Riego.";

    }

    ngOnInit(){}

    apretarGenerarReporte(){
        let resultado = this.compararFechas();
        if(resultado){
            this.generarReportesService.obtenerInformeRiegosHistoricoSector(this.idSector,this.idFinca,this.fechaInicioReporte,this.fechaFinReporte)
                .then(
                    response=>{
                        if(response.detalle_operacion=="No hay datos"){
                            this.errorMessageReporte="No hay riegos en ejecución.";
                        }
                        else{
                            this.errorMessageReporte="";
                            this.riegosResponse=response.datos_operacion;
                            this.obtenerRiegosHistoricos();
                            
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

    getPermisoRiegoHistorico(){
        return this.permisoRiegoHistorico;
    }

    getRiegosSeleccionado(){
        return this.riegosSeleccionado;
    }
    
    apretarSalir(){
        this.router.navigate(['/homeReportes/']);
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

    obtenerRiegosHistoricos(){

        let longitud=Object.keys(this.riegosResponse).length;

        for(var i=0;i<longitud;i++){
            let fechaInicio;
            let horaInicio;
            let fechaFin;
            let horaFin;
            let aguaUtilizada;
            let criterioRiego;
            let duracion;
            let mecanismoRiego;
            let ejecucion;
            let riegoActual= this.riegosResponse[i];

            //fecha y hora inicio
            fechaInicio=riegoActual['ejecucion']['fechaHoraInicio'].substring(0,10);
            horaInicio=riegoActual['ejecucion']['fechaHoraInicio'].substring(12,19);

            if(riegoActual['ejecucion']['fechaHoraFinalizacion']==null){
                //pongo horaFin "" porque despues concateno en la tabla
                fechaFin="No se ha establecido porque el riego no ha terminado";
                horaFin="";
            }
            else{
                fechaFin=riegoActual['ejecucion']['fechaHoraFinalizacion'].substring(0,10);
                horaFin=riegoActual['ejecucion']['fechaHoraFinalizacion'].substring(12,19);
            }

            //agua  
            aguaUtilizada=riegoActual['ejecucion']['cantidadAguaUtilizadaLitros'];

            //criterio
            if(riegoActual['ejecucion']['configuracion_riego']==null){
                criterioRiego="Riego Manual";
            }
            else{
                if(riegoActual['ejecucion']['configuracion_riego']=="criterio_riego_medicion"){
                    criterioRiego="Riego por Medición";
                }
                else{
                    if(riegoActual['ejecucion']['configuracion_riego']=="criterio_riego_volumen_agua"){
                        criterioRiego="Volumen Agua";
                    }
                    else{
                        criterioRiego="Por Hora";
                    }
                }
            }

            //duracion
            duracion=riegoActual['ejecucion']['duracionActualMinutos'];

            //mecanismo
            mecanismoRiego=riegoActual['mecanismo_riego_finca_sector']['nombreTipoMecanismo'];

            //ejecucion
            ejecucion=riegoActual['ejecucion']['estado_ejecucion_riego'];

            let riego = new Riego(fechaInicio,horaInicio,fechaFin,horaFin,aguaUtilizada,criterioRiego,duracion,mecanismoRiego,ejecucion);

            this.riegosHistoricos.push(riego);
        }
        if(this.riegosHistoricos.length==0){
            this.errorMessageReporte="No hay riegos asociados al sector de la finca.";
        }
        else{
            this.riegosSeleccionado=true;
        }
    }
}

export class Riego{
    fechaInicio;
    horaInicio;
    fechaFin;
    horaFin;
    aguaUtilizada;
    criterioRiego;
    duracion;
    mecanismoRiego;
    ejecucion;

    constructor(fechaInicio,horaInicio,fechaFin,horaFin,aguaUtilizada,criterioRiego,duracion,mecanismoRiego,ejecucion){
        this.fechaInicio=fechaInicio;
        this.horaInicio=horaInicio;
        this.fechaFin=fechaFin;
        this.horaFin=horaFin;
        this.aguaUtilizada=aguaUtilizada;
        this.criterioRiego=criterioRiego;
        this.duracion=duracion;
        this.mecanismoRiego=mecanismoRiego;
        this.ejecucion=ejecucion;
    }
}   
