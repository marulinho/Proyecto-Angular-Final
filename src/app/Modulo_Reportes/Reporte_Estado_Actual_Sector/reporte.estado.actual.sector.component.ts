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
    idFinca: number = parseInt(JSON.parse(localStorage.getItem('idFinca')));
    idSector: number = parseInt(JSON.parse(localStorage.getItem('idSector')));
    nombreReporte: string = JSON.parse(localStorage.getItem('nombreReporte'));
    descripcionReporte: string = JSON.parse(localStorage.getItem('descripcionReporte'));

    estadoActual: EstadoActualSector;
    estadoActualSeleccionado: Boolean;

    TEMPERATURA_SUELO = "Temperatura suelo";
    TEMPERATURA_AIRE = "Temperatura aire";
    HUMEDAD_SUELO = "Humedad suelo";
    HUMEDAD_AIRE = "Humedad aire";
    RADIACION_SOLAR = "Radiacion solar";
    PRESION_ATMOSFERICA = "presion";
    CONDICION_CLIMATICA = "condicionClima";

    temperaturaSuelo;
    temperaturaAire;
    humedadSuelo;
    humedadAire;
    radiacionSolar;
    presionAtmosferica;
    condicionClimatica;

    fecha = new Date();
    hora = new Date();


    constructor(private router: Router,
        private route: ActivatedRoute,
        private appService: AppService,
        private generarReportesService: GenerarReportesService,
        private dialog: MdDialog) {
        appService.getState().topnavTitle = "Reporte Estado Actual Sector.";

    }

    ngOnInit() {
        this.generarReportesService.obtenerEstadoActualSector(this.idSector, this.idFinca)
            .then(
            response => {
                if (response.datos_operacion['ultima_medicion'] == "" || response.detalle_operacion == "") {
                    this.errorMessageReporte = "No hay mediciones asociadas al sector seleccionado.";
                }
                else {
                    this.estadoActual = response.datos_operacion;
                    this.llenarDatos();
                    this.estadoActualSeleccionado = true;

                }
            }
            )
            .catch(
            error => {
                if (error.error_description == this.erroresSistema.getInicioSesion()) {
                    this.router.navigate(['/login/']);
                }
                else {
                    this.errorMessageReporte = error.error_description;
                }
            }
            );
    }

    getPermisoGenerarReporteEstadoActual() {
        return this.permisoGenerarReporteEstadoActual;
    }

    getEstadoActualSeleccionado() {
        return this.estadoActualSeleccionado;
    }

    llenarDatos() {
        let longitud = (this.estadoActual['ultima_medicion']['lista_mediciones_detalle']).length;
        for (var i = 0; i < longitud; i++) {
            let tipoActual = this.estadoActual['ultima_medicion']['lista_mediciones_detalle'][i];

            console.log(tipoActual);
            console.log(tipoActual['tipo_medicion']);
            if (tipoActual['tipo_medicion'] == this.CONDICION_CLIMATICA) {
                console.log(tipoActual['valor']);
                this.condicionClimatica=tipoActual['valor'];
            }
            if (tipoActual['tipo_medicion'] == this.TEMPERATURA_AIRE) {
                console.log(tipoActual['valor']);
                this.temperaturaAire=tipoActual['valor'];
            }
            if (tipoActual['tipo_medicion'] == this.TEMPERATURA_SUELO) {
                console.log(tipoActual['valor']);
                this.temperaturaSuelo=tipoActual['valor'];
            }
            if (tipoActual['tipo_medicion'] == this.HUMEDAD_AIRE) {
                console.log(tipoActual['valor']);
                this.humedadAire=tipoActual['valor'];
            }
            if (tipoActual['tipo_medicion'] == this.HUMEDAD_SUELO) {
                console.log(tipoActual['valor']);
                this.humedadSuelo=tipoActual['valor'];
            }
            if (tipoActual['tipo_medicion'] == this.PRESION_ATMOSFERICA) {
                console.log(tipoActual['valor']);
                this.presionAtmosferica=tipoActual['valor'];
            }
            if (tipoActual['tipo_medicion'] == this.RADIACION_SOLAR) {
                console.log(tipoActual['valor']);
                this.radiacionSolar=tipoActual['valor'];
            }

        }
        
        if (this.condicionClimatica == "" || this.condicionClimatica == null) {
            this.condicionClimatica = "No se ha podido determinar";
        }

        if (this.temperaturaAire == "" || this.temperaturaAire==null) {
            if(this.temperaturaAire==0){

            }
            else{
                this.temperaturaAire = "No se ha podido determinar";
            }
        }

        if (this.temperaturaSuelo == "" || this.temperaturaSuelo ==null) {
            if(this.temperaturaSuelo==0){}
            else{this.temperaturaSuelo = "No se ha podido determinar";}
        }

        if (this.humedadAire == "" || this.humedadAire ==null) {
            if(this.humedadAire==0){}
            else{this.humedadAire = "No se ha podido determinar";}
        }

        if (this.humedadSuelo == "" || this.humedadSuelo ==null) {
            if(this.humedadSuelo==0){}
            else{this.humedadSuelo = "No se ha podido determinar";}
        }

        if (this.presionAtmosferica == "" || this.presionAtmosferica ==null) {
            if(this.presionAtmosferica==0){}
            else{this.presionAtmosferica = "No se ha podido determinar";}
        }
        if (this.radiacionSolar == "" || this.radiacionSolar ==null) {
            if(this.radiacionSolar==0){}
            else{this.radiacionSolar = "No se ha podido determinar";}
        }
    }


    apretarSalir() {
        this.router.navigate(['/homeReportes/']);
    }
}
