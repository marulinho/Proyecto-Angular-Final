import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DialogExampleComponent } from '../../shared/dialog/dialog-example/dialog-example.component';
import { MdDialog } from '@angular/material';
import { AppService } from '../../app.service';

@Component({
    selector:'home-reporte',
    templateUrl: './home.reporte.component.html',
    styleUrls:['./home.reporte.component.css']
    
})

export class HomeReporteComponent implements OnInit{
    
    nombresReportes=[
        {nombre:'Informe Estado Actual Sector.',id:1},
        {nombre:'Informe Riego en Ejecución.',id:2},
        {nombre:'Informe Estado Histórico Sector.',id:3},
        {nombre:'Informe Riego Histórico Sector.',id:4},
        {nombre:'Informe Heladas Histórico.',id:5},
        {nombre:'Informe Eventos Personalizados.',id:6},
        {nombre:'Informe Cruzado Riego-Medición.',id:7}
       
    ];
    descripcionesReportes=[
        "Mediante este reporte se puede observar el estado actual del sector, incluyendo entre otras cosas la configuración de riego actual.",
        "Mediante este reporte se puede observar los datos relativos al riego en ejecución de un determinado sector.",
        "Mediante este reporte se puede observar el estado histórico del sector, incluyendo entre otras cosas las condifuraciones de riego históricas.",
        "Mediante este reporte se puede observar los datos históricos relativos al riego en un determinado sector.",
        "Mediante este reporte se puede observar las heladas históricas que se han producido en el sector.",
        "Mediante este reporte se puede observar los eventos personalizados que se han cumplido para un determinado sector.",
        "Mediante este reporte se puede observar las ejecuciones de riego y las mediciones llevadas a cabo por los sensores de un determinado sector."
    ];

    reporteSeleccionado:string;

    dia=new Date().getDay();
    mes=new Date().getMonth()+1;
    anio=new Date().getFullYear();
    fechaActual:string=this.dia+"-"+this.mes+"-"+this.anio;
    hora;
    
    


    constructor(private router:Router,
                private route:ActivatedRoute,
                private appService:AppService,
                private dialog: MdDialog){
        appService.getState().topnavTitle="Home Reportes.";
    }

    ngOnInit(){}
}
