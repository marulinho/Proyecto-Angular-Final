import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DialogExampleComponent } from '../../shared/dialog/dialog-example/dialog-example.component';
import { MdDialog } from '@angular/material';
import { AppService } from '../../app.service';
import { GenerarReportesService, InformeEvento } from '../generar.repotes.service';
import { GestionarEventoPersonalizadoService , ConfiguracionEvento } from'../../Modulo_Reportes/Gestionar_Evento_Persinalizado/gestionar.evento.personalizado.service';
import { ErroresSistema } from '../../Datos_Sistema/errores.sistema';

@Component({
    selector: 'reporte-evento-personalizado',
    templateUrl: './reporte.evento.personalizado.component.html',
    styleUrls: ['./reporte.evento.personalizado.component.css']

})

export class ReporteEventoPersonalizadoComponent implements OnInit {

    erroresSistema = new ErroresSistema();
    permisoGenerarReporteEventoPersonalizado = JSON.parse(localStorage.getItem('puedeGenerarInformeEventoPersonalizado'));

    errorMessageReporte = "";
    idFinca:number=parseInt(JSON.parse(localStorage.getItem('idFinca'))); 
    idSector:number=parseInt(JSON.parse(localStorage.getItem('idSector')));
    nombreReporte:string=JSON.parse(localStorage.getItem('nombreReporte'));
    descripcionReporte:string=JSON.parse(localStorage.getItem('descripcionReporte'));   

   
    fecha=new Date();
    hora=new Date();

    eventosPersonalizados : ConfiguracionEvento;
    eventosExistentes:Boolean;
    eventoSeleccionado:number;


    constructor(private router: Router,
        private route: ActivatedRoute,
        private appService: AppService,
        private generarReportesService:GenerarReportesService,
        private gestionarEventoPersonalizadoService:GestionarEventoPersonalizadoService,
        private dialog: MdDialog) {
        appService.getState().topnavTitle = "Reporte Evento Personalizado.";


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

    apretarGenerarReporte(){
        //this.generarReportesService.obtenerInformeEventosPersonalizados()
    }

    apretarSalir(){
        this.router.navigate(['/homeReportes/']);
    }
}
