import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DialogExampleComponent } from '../../shared/dialog/dialog-example/dialog-example.component';
import { MdDialog } from '@angular/material';
import { AppService } from '../../app.service';
import { GenerarReportesService, EstadoActualSector } from '../generar.repotes.service';
import { ErroresSistema } from '../../Datos_Sistema/errores.sistema';

@Component({
    selector: 'reporte-estado-actual-sector',
    templateUrl: './reporte.estado.actual.sector.component.html',
    styleUrls: ['./reporte.estado.actual.sector.component.css']

})

export class ReporteEstadoActualEstadoSector implements OnInit {

    erroresSistema = new ErroresSistema();
    permisoGenerarReporteEstadoActual = JSON.parse(localStorage.getItem('puedeGenerarInformeEstadoActualSectores'));

    errorMessageReporte = "";
    idFinca:number=parseInt(JSON.parse(localStorage.getItem('idFinca'))); 
    idSector:number=parseInt(JSON.parse(localStorage.getItem('idSector')));
    nombreReporte:string=JSON.parse(localStorage.getItem('nombreReporte'));
    descripcionReporte:string=JSON.parse(localStorage.getItem('descripcionReporte'));   
   
    estadoActual:EstadoActualSector;
    estadoActualSeleccionado:Boolean;
   
    dia = new Date().getDay();
    mes = new Date().getMonth() + 1;
    anio = new Date().getFullYear();
    fechaActual: string = this.dia + "-" + this.mes + "-" + this.anio;
    hora=new Date().getHours();
    minutos=new Date().getMinutes();
    segundos = new Date().getSeconds();
    horaActual = this.hora+":"+this.minutos+":"+this.segundos;

    constructor(private router: Router,
        private route: ActivatedRoute,
        private appService: AppService,
        private generarReportesService:GenerarReportesService,
        private dialog: MdDialog) {
        appService.getState().topnavTitle = "Reporte Estado Actual Sector.";

    }

    ngOnInit(){
        console.log("estado :" +this.permisoGenerarReporteEstadoActual);
        this.generarReportesService.obtenerEstadoActualSector(this.idSector,this.idFinca)
        .then(
            response=>{
                if(response.datos_operacion['ultima_medicion']==""){
                    this.errorMessageReporte="No hay mediciones asociadas al sector seleccionado.";
                }
                else{
                    this.estadoActual=response.datos_operacion;
                    this.estadoActualSeleccionado=true;
                    
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

    getPermisoGenerarReporteEstadoActual(){
        return this.permisoGenerarReporteEstadoActual;
    }

    getEstadoActualSeleccionado(){
        return this.estadoActualSeleccionado;
    }
    
    apretarSalir(){
        this.router.navigate(['/homeReportes/']);
    }
}
