import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DialogExampleComponent } from '../../shared/dialog/dialog-example/dialog-example.component';
import { MdDialog } from '@angular/material';
import { AppService } from '../../app.service';
import { GenerarReportesService, RiegoSector } from '../generar.repotes.service';

@Component({
    selector: 'reporte-riego-ejecucion',
    templateUrl: './reporte.riego.ejecucion.component.html',
    styleUrls: ['./reporte.riego.ejecucion.component.css']

})

export class ReporteRiegoEjecucionComponent implements OnInit {

    errorMessageReporte = "";
    idFinca:number=parseInt(JSON.parse(localStorage.getItem('idFinca'))); 
    idSector:number=parseInt(JSON.parse(localStorage.getItem('idSector')));
    nombreReporte:string=JSON.parse(localStorage.getItem('nombreReporte'));
    descripcionReporte:string=JSON.parse(localStorage.getItem('descripcionReporte'));   
    riegoActual:RiegoSector;
    riegoSeleccionado:Boolean;
   
    dia = new Date().getDay();
    mes = new Date().getMonth() + 1;
    anio = new Date().getFullYear();
    fechaActual: string = this.dia + "-" + this.mes + "-" + this.anio;
    horaActual = new Date();




    constructor(private router: Router,
        private route: ActivatedRoute,
        private appService: AppService,
        private generarReportesService:GenerarReportesService,
        private dialog: MdDialog) {
        appService.getState().topnavTitle = "Reporte Riego Ejecución.";
        console.log("idFinca: "+this.idFinca);
        console.log("idSector: "+this.idSector);

    }

    ngOnInit(){
        this.generarReportesService.obtenerInformeRiegoEjecucionSector(this.idSector,this.idFinca)
        .then(
            response=>{
                if(response.datos_operacion=="No hay datos" || response.datos_operacion['ejecucion_riego']==""){
                    this.errorMessageReporte="No hay riegos en ejecución.";
                }
                else{
                    this.riegoActual=response.datos_operacion;
                    this.riegoSeleccionado=true;
                }
            }
        )
        .catch(
            error=>{
                this.errorMessageReporte=error.error_description;
            }
        );
    }

    getRiegoSeleccionado(){
        return this.riegoSeleccionado;
    }
    
    apretarSalir(){
        this.router.navigate(['/homeReportes/']);
    }
}
