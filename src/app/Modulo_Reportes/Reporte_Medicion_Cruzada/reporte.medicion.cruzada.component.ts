import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DialogExampleComponent } from '../../shared/dialog/dialog-example/dialog-example.component';
import { MdDialog } from '@angular/material';
import { AppService } from '../../app.service';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
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
    tooltipAtras ='Volver HomeReportes';
    position = 'above';
    errorMessageReporte = "";
    idFinca: number = parseInt(JSON.parse(localStorage.getItem('idFinca')));
    idSector: number = parseInt(JSON.parse(localStorage.getItem('idSector')));
    nombreReporte: string = JSON.parse(localStorage.getItem('nombreReporte'));
    descripcionReporte: string = JSON.parse(localStorage.getItem('descripcionReporte'));


    fecha = new Date();
    hora = new Date();

    fechaInicioReporte: string;
    fechaFinReporte: string;
    medicionCruzada = [];
    medicionesComponenteDespues = [];
    medicionesComponenteAntes = [];
    medicionesClimaticas = [];
    reporteSeleccionado: Boolean;

    //tabla temperaturaAire 
        diasTemperaturaAire = [];
        temperaturaAireAntes = [];
        temperaturaAire=[];
        mockTemperaturaAire: any = ChartMockTemperaturaAire;
        settingsTemperaturaAire = {
            actions: {
                columnTitle: 'Accion',
                add: false,
                delete: false,
                edit: false
            },
            columns: {
                fechaHoraInicio: {
                    title: 'Fecha Inicio.',
                    filter: false,
                },
                fechaHoraFinal: {
                    title: 'Fecha Fin.',
                    filter: false,
                },
                medicionAntes: {
                    title: 'Valor Antes (°C).',
                    filter: false,
                },
                medicionDespues: {
                    title: 'Valor Después (°C).',
                    filter: false,
                }

            }
        };

        dataTemperaturaAire = [];
        sourceTemperaturaAire: LocalDataSource;

    //tabla temperaturaSuelo
        diasTemperaturaSuelo = [];
        temperaturaSueloAntes = [];
        temperaturaSuelo=[];
        mockTemperaturaSuelo: any = ChartMockTemperaturaSuelo;
        settingsTemperaturaSuelo = {
            actions: {
                columnTitle: 'Accion',
                add: false,
                delete: false,
                edit: false
            },
            columns: {
                fechaHoraInicio: {
                    title: 'Fecha Inicio.',
                    filter: false,
                },
                fechaHoraFinal: {
                    title: 'Fecha Fin.',
                    filter: false,
                },
                medicionAntes: {
                    title: 'Valor Antes (°C).',
                    filter: false,
                },
                medicionDespues: {
                    title: 'Valor Después (°C).',
                    filter: false,
                }

            }
        };

        dataTemperaturaSuelo = [];
        sourceTemperaturaSuelo: LocalDataSource;

    //tabla humedadAire 
        diasHumedadAire = [];
        humedadAireAntes = [];
        humedadAire=[];
        mockHumedadAire: any = ChartMockHumedadAire;
        settingsHumedadAire = {
            actions: {
                columnTitle: 'Accion',
                add: false,
                delete: false,
                edit: false
            },
            columns: {
                fechaHoraInicio: {
                    title: 'Fecha Inicio.',
                    filter: false,
                },
                fechaHoraFinal: {
                    title: 'Fecha Fin.',
                    filter: false,
                },
                medicionAntes: {
                    title: 'Valor Antes (%).',
                    filter: false,
                },
                medicionDespues: {
                    title: 'Valor Después (%).',
                    filter: false,
                }
    
            }
        };
    
        dataHumedadAire = [];
        sourceHumedadAire: LocalDataSource;
   
    //tabla humedadSuelo
       diasHumedadSuelo = [];
       humedadSueloAntes = [];
       humedadSuelo=[];
       mockHumedadSuelo: any = ChartMockHumedadSuelo;
       settingsHumedadSuelo = {
           actions: {
               columnTitle: 'Accion',
               add: false,
               delete: false,
               edit: false
           },
           columns: {
               fechaHoraInicio: {
                   title: 'Fecha Inicio.',
                   filter: false,
               },
               fechaHoraFinal: {
                   title: 'Fecha Fin.',
                   filter: false,
               },
               medicionAntes: {
                   title: 'Valor Antes (%).',
                   filter: false,
               },
               medicionDespues: {
                   title: 'Valor Después (%).',
                   filter: false,
               }
   
           }
       };
   
       dataHumedadSuelo = [];
       sourceHumedadSuelo: LocalDataSource;
    
    //tabla radiacion
        diasRadiacion = [];
        radiacionAntes = [];
        radiacion=[];
        mockRadiacion: any = ChartMockRadiacion;
        settingsRadiacion = {
            actions: {
                columnTitle: 'Accion',
                add: false,
                delete: false,
                edit: false
            },
            columns: {
                fechaHoraInicio: {
                    title: 'Fecha Inicio.',
                    filter: false,
                },
                fechaHoraFinal: {
                    title: 'Fecha Fin.',
                    filter: false,
                },
                medicionAntes: {
                    title: 'Valor Antes.',
                    filter: false,
                },
                medicionDespues: {
                    title: 'Valor Después.',
                    filter: false,
                }
    
            }
        };
    
        dataRadiacion = [];
        sourceRadiacion: LocalDataSource;


    constructor(private router: Router,
        private route: ActivatedRoute,
        private appService: AppService,
        private generarReportesService: GenerarReportesService,
        private dialog: MdDialog) {
        appService.getState().topnavTitle = "Reporte Medición Cruzada";

    }

    ngOnInit() { }
    apretarGenerarReporte() {
        let resultado = this.compararFechas()
        if (resultado) {
            this.generarReportesService.obtenerInformeMedicionCruzada(this.idFinca, this.idSector, this.fechaInicioReporte, this.fechaFinReporte)
                .then(
                response => {
                    if (response.detalle_operacion == "No hay datos") {
                        this.errorMessageReporte = "No hay registros en el plazo de tiempo establecido.";
                    }
                    else {
                        this.medicionCruzada = response.datos_operacion;

                        this.obtenerTablaDatosAntes();
                        this.obtenerTablaDatosDespues();

                        this.dataTemperaturaAire = this.temperaturaAire;
                        this.sourceTemperaturaAire = new LocalDataSource(this.dataTemperaturaAire);
                        
                        
                        this.dataTemperaturaSuelo = this.temperaturaSuelo;
                        this.sourceTemperaturaSuelo = new LocalDataSource(this.dataTemperaturaSuelo);
                        

                        this.dataHumedadAire = this.humedadAire;
                        this.sourceHumedadAire = new LocalDataSource(this.dataHumedadAire);
                        

                        this.dataHumedadSuelo = this.humedadSuelo;
                        this.sourceHumedadSuelo = new LocalDataSource(this.dataHumedadSuelo);
                        
                        this.dataRadiacion = this.radiacion;
                        this.sourceRadiacion= new LocalDataSource(this.dataRadiacion);

                        this.llenarGraficoTemperaturaAire();
                        this.llenarGraficoTemperaturaSuelo();
                        this.llenarGraficoHumedadAire();
                        this.llenarGraficoHumedadSuelo();
                        this.llenarGraficoRadiacion();
                        this.reporteSeleccionado = true;

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
    }

    getPermisoGenerarMedicionCruzada() {
        return this.permisoGenerarMedicionCruzada;
    }

    getReporteSeleccionado() {
        return this.reporteSeleccionado;
    }

    compararFechas() {
        let resultado: boolean;
        if (this.fechaInicioReporte == null || this.fechaInicioReporte == "" ||
            this.fechaFinReporte == null || this.fechaFinReporte == null) {
            this.errorMessageReporte = "Debe completar todos los campos obligatorios (*).";
            resultado = false;
        }
        else {
            let fechaInicializacion = [];
            let fechaInicial;
            fechaInicializacion = this.fechaInicioReporte.split("-");
            fechaInicial = parseInt(fechaInicializacion[0] + "" + fechaInicializacion[1] + "" + fechaInicializacion[2]);

            let fechaFinalizacion = [];
            let fechaFinal;
            fechaFinalizacion = this.fechaFinReporte.split("-");
            fechaFinal = parseInt(fechaFinalizacion[0] + "" + fechaFinalizacion[1] + "" + fechaFinalizacion[2]);

            if (fechaInicial > fechaFinal) {
                this.errorMessageReporte = "La fecha inicial no puede ser mayor que la fecha final.";
                resultado = false;
            }
            else {
                this.errorMessageReporte = "";
                resultado = true;
            }
        }
        return resultado;
    }

    obtenerTablaDatosAntes() {
        let temperaturaAire = [];
        let temperaturaSuelo = [];
        let humedadAire = [];
        let humedadSuelo = [];
        let radiacion = [];
        let valorMedicion;
        let fechaYhoraInicio;
        let fechaYhoraFin;

        let resultado = true;
        let i = 0;
        while (resultado == true) {
            let ejecucionFechaHoraActual = this.medicionCruzada[i]['ejecucion']['fechaHoraInicio'];
            if (ejecucionFechaHoraActual == null || ejecucionFechaHoraActual == "") {
                resultado = false;
            }
            else {
                let ejecucionFechaHoraFinal = this.medicionCruzada[i]['ejecucion']['fechaHoraFinalizacion'];
                let medicionDetalle = (this.medicionCruzada[i]['medicionesComponenteAntes']['lista_mediciones_detalle']);
                if (medicionDetalle == null || medicionDetalle == "") {
                    resultado = false;
                }
                else {
                    let tamanio = medicionDetalle.length;
                    for (var j = 0; j < tamanio; j++) {
                        let medicionActual = medicionDetalle[j]['tipo_medicion'];
                        if (medicionActual == "Temperatura aire") {
                            fechaYhoraInicio = ejecucionFechaHoraActual.substring(0, 10) + "  " + ejecucionFechaHoraActual.substring(11, 19);
                            fechaYhoraFin = ejecucionFechaHoraFinal.substring(0, 10) + "  " + ejecucionFechaHoraFinal.substring(11, 19);
                            valorMedicion = medicionDetalle[j]['valor']; 
                            let mediciones = new Mediciones(fechaYhoraInicio, fechaYhoraFin, valorMedicion);
                            temperaturaAire.push(mediciones);
                        }
                        if(medicionActual=="Temperatura suelo"){
                            fechaYhoraInicio = ejecucionFechaHoraActual.substring(0, 10) + "  " + ejecucionFechaHoraActual.substring(11, 19);
                            fechaYhoraFin = ejecucionFechaHoraFinal.substring(0, 10) + "  " + ejecucionFechaHoraFinal.substring(11, 19);
                            valorMedicion = medicionDetalle[j]['valor']; 
                            let mediciones = new Mediciones(fechaYhoraInicio, fechaYhoraFin, valorMedicion);
                            temperaturaSuelo.push(mediciones);
                        }
                        if(medicionActual=="Humedad aire"){
                            fechaYhoraInicio = ejecucionFechaHoraActual.substring(0, 10) + "  " + ejecucionFechaHoraActual.substring(11, 19);
                            fechaYhoraFin = ejecucionFechaHoraFinal.substring(0, 10) + "  " + ejecucionFechaHoraFinal.substring(11, 19);
                            valorMedicion = medicionDetalle[j]['valor']; 
                            let mediciones = new Mediciones(fechaYhoraInicio, fechaYhoraFin, valorMedicion);
                            humedadAire.push(mediciones);
                        }
                        if(medicionActual=="Humedad suelo"){
                            fechaYhoraInicio = ejecucionFechaHoraActual.substring(0, 10) + "  " + ejecucionFechaHoraActual.substring(11, 19);
                            fechaYhoraFin = ejecucionFechaHoraFinal.substring(0, 10) + "  " + ejecucionFechaHoraFinal.substring(11, 19);
                            valorMedicion = medicionDetalle[j]['valor']; 
                            let mediciones = new Mediciones(fechaYhoraInicio, fechaYhoraFin, valorMedicion);
                            humedadSuelo.push(mediciones);
                        }
                        if(medicionActual=="Radiacion solar"){
                            fechaYhoraInicio = ejecucionFechaHoraActual.substring(0, 10) + "  " + ejecucionFechaHoraActual.substring(11, 19);
                            fechaYhoraFin = ejecucionFechaHoraFinal.substring(0, 10) + "  " + ejecucionFechaHoraFinal.substring(11, 19);
                            valorMedicion = medicionDetalle[j]['valor']; 
                            let mediciones = new Mediciones(fechaYhoraInicio, fechaYhoraFin, valorMedicion);
                            radiacion.push(mediciones);
                        }
                    }
                }
            }
            i += 1;
        }
        this.temperaturaAireAntes=temperaturaAire;
        this.temperaturaSueloAntes=temperaturaSuelo;
        this.humedadAireAntes=humedadAire;
        this.humedadSueloAntes=humedadSuelo;
        this.radiacionAntes=radiacion;


    }
    obtenerTablaDatosDespues() {
        let temperaturaAire = [];
        let temperaturaSuelo = [];
        let humedadAire = [];
        let humedadSuelo = [];
        let radiacion = [];
        let diaInicio;
        let diaFin;
        let valorMedicionAntes;
        let valorMedicionDespues;

        let resultado = true;
        let i = 0;
        while (resultado == true) {
            let ejecucionFechaHoraActual = this.medicionCruzada[i]['ejecucion']['fechaHoraInicio'];
            if (ejecucionFechaHoraActual == null || ejecucionFechaHoraActual == "") {
                resultado = false;
            }
            else {
                let ejecucionFechaHoraFinal = this.medicionCruzada[i]['ejecucion']['fechaHoraFinalizacion'];
                let medicionDetalle = (this.medicionCruzada[i]['medicionesComponenteDespues']['lista_mediciones_detalle']);
                if (medicionDetalle == null || medicionDetalle == "") {
                    resultado = false;
                }
                else {
                    let tamanio = medicionDetalle.length;
                    for (var j = 0; j < tamanio; j++) {
                        let medicionActual = medicionDetalle[j]['tipo_medicion'];
                        if (medicionActual == "Temperatura aire") {
                            let temperaturaAireAntes = this.temperaturaAireAntes[i];
                            diaInicio = temperaturaAireAntes['fechaHoraInicio'];
                            diaFin = temperaturaAireAntes['fechaHoraFinal'];
                            valorMedicionAntes = temperaturaAireAntes['medicion'];
                            valorMedicionDespues = medicionDetalle[j]['valor'];
                            let mediciones = new MedicionesTotal(diaInicio, diaFin, valorMedicionAntes,valorMedicionDespues);
                            temperaturaAire.push(mediciones);
                        }
                        if(medicionActual=="Temperatura suelo"){
                            let temperaturaSueloAntes = this.temperaturaSueloAntes[i];
                            diaInicio = temperaturaSueloAntes['fechaHoraInicio'];
                            diaFin = temperaturaSueloAntes['fechaHoraFinal'];
                            valorMedicionAntes = temperaturaSueloAntes['medicion'];
                            valorMedicionDespues = medicionDetalle[j]['valor'];
                            let mediciones = new MedicionesTotal(diaInicio, diaFin, valorMedicionAntes,valorMedicionDespues);
                            temperaturaSuelo.push(mediciones);
                        }
                        if(medicionActual=="Humedad aire"){
                            let humedadAireAntes = this.humedadAireAntes[i];
                            diaInicio = humedadAireAntes['fechaHoraInicio'];
                            diaFin = humedadAireAntes['fechaHoraFinal'];
                            valorMedicionAntes = humedadAireAntes['medicion'];
                            valorMedicionDespues = medicionDetalle[j]['valor'];
                            let mediciones = new MedicionesTotal(diaInicio, diaFin, valorMedicionAntes,valorMedicionDespues);
                            humedadAire.push(mediciones);
                        }
                        if(medicionActual=="Humedad suelo"){
                            let humedadSueloAntes = this.humedadSueloAntes[i];
                            diaInicio = humedadSueloAntes['fechaHoraInicio'];
                            diaFin = humedadSueloAntes['fechaHoraFinal'];
                            valorMedicionAntes = humedadSueloAntes['medicion'];
                            valorMedicionDespues = medicionDetalle[j]['valor'];
                            let mediciones = new MedicionesTotal(diaInicio, diaFin, valorMedicionAntes,valorMedicionDespues);
                            humedadSuelo.push(mediciones);
                        }
                        if(medicionActual=="Radiacion solar"){
                            let radiacionAntes = this.radiacionAntes[i];
                            diaInicio = radiacionAntes['fechaHoraInicio'];
                            diaFin = radiacionAntes['fechaHoraFinal'];
                            valorMedicionAntes = radiacionAntes['medicion'];
                            valorMedicionDespues = medicionDetalle[j]['valor'];
                            let mediciones = new MedicionesTotal(diaInicio, diaFin, valorMedicionAntes,valorMedicionDespues);
                            radiacion.push(mediciones);
                        }
                    }
                }
            }
            i += 1;
        }
        this.temperaturaAire=temperaturaAire;
        this.temperaturaSuelo=temperaturaSuelo;
        this.humedadAire=humedadAire;
        this.humedadSuelo=humedadSuelo;
        this.radiacion=radiacion;

    }

    llenarGraficoTemperaturaAire(){
        let longitud = this.temperaturaAire.length;
        let antes = [];
        let despues = [];
        let dias = [];
        for (var i = 0; i < longitud; i++) {
            let medicionAntes = this.temperaturaAire[i]['medicionAntes'];
            let medicionDespues = this.temperaturaAire[i]['medicionDespues'];
            let diasMediciones = this.temperaturaAire[i]['fechaHoraInicio'];
            antes.push(medicionAntes);
            despues.push(medicionDespues);
            dias.push(diasMediciones);
        }

        ChartMockTemperaturaAire.bar.data.datasets[0]['data'] = antes;
        ChartMockTemperaturaAire.bar.data.datasets[1]['data'] = despues;
        ChartMockTemperaturaAire.bar.data.labels = dias;
    }

    llenarGraficoTemperaturaSuelo(){
        let longitud = this.temperaturaSuelo.length;
        let antes = [];
        let despues = [];
        let dias = [];
        for (var i = 0; i < longitud; i++) {
            let medicionAntes = this.temperaturaSuelo[i]['medicionAntes'];
            let medicionDespues = this.temperaturaSuelo[i]['medicionDespues'];
            let diasMediciones = this.temperaturaSuelo[i]['fechaHoraInicio'];
            antes.push(medicionAntes);
            despues.push(medicionDespues);
            dias.push(diasMediciones);
        }

        ChartMockTemperaturaSuelo.bar.data.datasets[0]['data'] = antes;
        ChartMockTemperaturaSuelo.bar.data.datasets[1]['data'] = despues;
        ChartMockTemperaturaSuelo.bar.data.labels = dias;
    }

    llenarGraficoHumedadAire(){
        let longitud = this.humedadAire.length;
        let antes = [];
        let despues = [];
        let dias = [];
        for (var i = 0; i < longitud; i++) {
            let medicionAntes = this.humedadAire[i]['medicionAntes'];
            let medicionDespues = this.humedadAire[i]['medicionDespues'];
            let diasMediciones = this.humedadAire[i]['fechaHoraInicio'];
            antes.push(medicionAntes);
            despues.push(medicionDespues);
            dias.push(diasMediciones);
        }

        ChartMockHumedadAire.bar.data.datasets[0]['data'] = antes;
        ChartMockHumedadAire.bar.data.datasets[1]['data'] = despues;
        ChartMockHumedadAire.bar.data.labels = dias;
    }

    llenarGraficoHumedadSuelo(){
        let longitud = this.humedadSuelo.length;
        let antes = [];
        let despues = [];
        let dias = [];
        for (var i = 0; i < longitud; i++) {
            let medicionAntes = this.humedadSuelo[i]['medicionAntes'];
            let medicionDespues = this.humedadSuelo[i]['medicionDespues'];
            let diasMediciones = this.humedadSuelo[i]['fechaHoraInicio'];
            antes.push(medicionAntes);
            despues.push(medicionDespues);
            dias.push(diasMediciones);
        }

        ChartMockHumedadSuelo.bar.data.datasets[0]['data'] = antes;
        ChartMockHumedadSuelo.bar.data.datasets[1]['data'] = despues;
        ChartMockHumedadSuelo.bar.data.labels = dias;
    }

    llenarGraficoRadiacion(){
        let longitud = this.radiacion.length;
        let antes = [];
        let despues = [];
        let dias = [];
        for (var i = 0; i < longitud; i++) {
            let medicionAntes = this.radiacion[i]['medicionAntes'];
            let medicionDespues = this.radiacion[i]['medicionDespues'];
            let diasMediciones = this.radiacion[i]['fechaHoraInicio'];
            antes.push(medicionAntes);
            despues.push(medicionDespues);
            dias.push(diasMediciones);
        }

        ChartMockRadiacion.bar.data.datasets[0]['data'] = antes;
        ChartMockRadiacion.bar.data.datasets[1]['data'] = despues;
        ChartMockRadiacion.bar.data.labels = dias;
    }


    apretarSalir() {
        this.router.navigate(['/homeReportes/']);
    }
    apretarAtras(){
        this.router.navigate(['/homeReportes/']);
    }

}


export class Mediciones {
    fechaHoraInicio: string;
    fechaHoraFinal: string;
    medicion: number;

    constructor(fechaHoraInicio, fechaHoraFinal, medicion) {
        this.fechaHoraInicio = fechaHoraInicio;
        this.fechaHoraFinal = fechaHoraFinal;
        this.medicion = medicion;
    }

}

export class MedicionesTotal {
    fechaHoraInicio: string;
    fechaHoraFinal: string;
    medicionAntes: number;
    medicionDespues:number;

    constructor(fechaHoraInicio, fechaHoraFinal, medicionAntes,medicionDespues) {
        this.fechaHoraInicio = fechaHoraInicio;
        this.fechaHoraFinal = fechaHoraFinal;
        this.medicionAntes = medicionAntes;
        this.medicionDespues = medicionDespues;
    }

}

class ChartMockTemperaturaAire {
    static bar = {
        type: 'bar',
        data: {
            labels: [],
            datasets: [
                {
                    label: 'Antes.',
                    borderColor: '#009688',
                    backgroundColor: 'rgba(0, 150, 136, 0.5)',
                    data: []
                },
                {
                    label: 'Después.',
                    borderColor: '#ffc107',
                    backgroundColor: 'rgba(255, 193, 7, 0.5)',
                    data: []
                }
            ]
        },
        options: {
            elements: {
                rectangle: {
                    borderWidth: 2,
                    borderColor: 'rgb(0, 255, 0)',
                    borderSkipped: 'bottom'
                }
            },
            scales: {
                yAxes: [{
                    ticks: {
                        min: 0,
                        max: 100
                    }
                }]
            },
            responsive: true,
        }
    };
}

class ChartMockTemperaturaSuelo {
    static bar = {
        type: 'bar',
        data: {
            labels: [],
            datasets: [
                {
                    label: 'Antes.',
                    borderColor: '#009688',
                    backgroundColor: 'rgba(0, 150, 136, 0.5)',
                    data: []
                },
                {
                    label: 'Después.',
                    borderColor: '#ffc107',
                    backgroundColor: 'rgba(255, 193, 7, 0.5)',
                    data: []
                }
            ]
        },
        options: {
            elements: {
                rectangle: {
                    borderWidth: 2,
                    borderColor: 'rgb(0, 255, 0)',
                    borderSkipped: 'bottom'
                }
            },
            scales: {
                yAxes: [{
                    ticks: {
                        min: 0,
                        max: 100
                    }
                }]
            },
            responsive: true,
        }
    };
}

class ChartMockHumedadAire {
    static bar = {
        type: 'bar',
        data: {
            labels: [],
            datasets: [
                {
                    label: 'Antes.',
                    borderColor: '#009688',
                    backgroundColor: 'rgba(0, 150, 136, 0.5)',
                    data: []
                },
                {
                    label: 'Después.',
                    borderColor: '#ffc107',
                    backgroundColor: 'rgba(255, 193, 7, 0.5)',
                    data: []
                }
            ]
        },
        options: {
            elements: {
                rectangle: {
                    borderWidth: 2,
                    borderColor: 'rgb(0, 255, 0)',
                    borderSkipped: 'bottom'
                }
            },
            scales: {
                yAxes: [{
                    ticks: {
                        min: 0,
                        max: 100
                    }
                }]
            },
            responsive: true,
        }
    };
}

class ChartMockHumedadSuelo {
    static bar = {
        type: 'bar',
        data: {
            labels: [],
            datasets: [
                {
                    label: 'Antes.',
                    borderColor: '#009688',
                    backgroundColor: 'rgba(0, 150, 136, 0.5)',
                    data: []
                },
                {
                    label: 'Después.',
                    borderColor: '#ffc107',
                    backgroundColor: 'rgba(255, 193, 7, 0.5)',
                    data: []
                }
            ]
        },
        options: {
            elements: {
                rectangle: {
                    borderWidth: 2,
                    borderColor: 'rgb(0, 255, 0)',
                    borderSkipped: 'bottom'
                }
            },
            scales: {
                yAxes: [{
                    ticks: {
                        min: 0,
                        max: 100
                    }
                }]
            },
            responsive: true,
        }
    };
}

class ChartMockRadiacion {
    static bar = {
        type: 'bar',
        data: {
            labels: [],
            datasets: [
                {
                    label: 'Antes.',
                    borderColor: '#009688',
                    backgroundColor: 'rgba(0, 150, 136, 0.5)',
                    data: []
                },
                {
                    label: 'Después.',
                    borderColor: '#ffc107',
                    backgroundColor: 'rgba(255, 193, 7, 0.5)',
                    data: []
                }
            ]
        },
        options: {
            elements: {
                rectangle: {
                    borderWidth: 2,
                    borderColor: 'rgb(0, 255, 0)',
                    borderSkipped: 'bottom'
                }
            },
            scales: {
                yAxes: [{
                    ticks: {
                        min: 0,
                        max: 10000
                    }
                }]
            },
            responsive: true,
        }
    };
}
