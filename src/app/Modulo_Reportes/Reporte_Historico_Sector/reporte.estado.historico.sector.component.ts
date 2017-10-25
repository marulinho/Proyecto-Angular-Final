import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DialogExampleComponent } from '../../shared/dialog/dialog-example/dialog-example.component';
import { MdDialog } from '@angular/material';
import { AppService } from '../../app.service';
import { GenerarReportesService, RiegoSector } from '../generar.repotes.service';

@Component({
    selector: 'reporte-estado-historico-sector',
    templateUrl: './reporte.estado.historico.sector.component.html',
    styleUrls: ['./reporte.estado.historico.sector.component.css']

})

export class ReporteEstadoHistoricoSectorComponent implements OnInit {

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
        appService.getState().topnavTitle = "Reporte Histórico Estado Sector.";


    }

    ngOnInit(){}
}
