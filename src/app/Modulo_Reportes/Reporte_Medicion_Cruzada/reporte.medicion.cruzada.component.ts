import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DialogExampleComponent } from '../../shared/dialog/dialog-example/dialog-example.component';
import { MdDialog } from '@angular/material';
import { AppService } from '../../app.service';
import { GenerarReportesService, MedicionCruzada } from '../generar.repotes.service';

@Component({
    selector: 'reporte-medicion-cruzada',
    templateUrl: './reporte.medicion.cruzada.component.html',
    styleUrls: ['./reporte.medicion.cruzada.component.css']

})

export class ReporteMedicionCruzadaComponent implements OnInit {

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




    constructor(private router: Router,
        private route: ActivatedRoute,
        private appService: AppService,
        private generarReportesService:GenerarReportesService,
        private dialog: MdDialog) {
        appService.getState().topnavTitle = "Reporte Medición Cruzada.";
        console.log(this.idFinca);
        console.log(this.idSector);

    }

    ngOnInit(){    }
}
