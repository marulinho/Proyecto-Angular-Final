import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DialogExampleComponent } from '../../shared/dialog/dialog-example/dialog-example.component';
import { MdDialog } from '@angular/material';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
import { AppService } from '../../app.service';
import { GenerarReportesService, HistoricoSector } from '../generar.repotes.service';
import { ErroresSistema } from '../../Datos_Sistema/errores.sistema';


@Component({
    selector: 'reporte-estado-historico-sector',
    templateUrl: './reporte.estado.historico.sector.component.html',
    styleUrls: ['./reporte.estado.historico.sector.component.css']

})

export class ReporteEstadoHistoricoSectorComponent implements OnInit {

    erroresSistema = new ErroresSistema();
    permisoGenerarReporteEstadoHistoricoSector = JSON.parse(localStorage.getItem('puedeGenerarInformeEstadoHistoricoSectoresFinca'));

    errorMessageReporte = "";
    idFinca: number = parseInt(JSON.parse(localStorage.getItem('idFinca')));
    idSector: number = parseInt(JSON.parse(localStorage.getItem('idSector')));
    nombreReporte: string = JSON.parse(localStorage.getItem('nombreReporte'));
    descripcionReporte: string = JSON.parse(localStorage.getItem('descripcionReporte'));

    tooltipAtras ='Volver HomeReportes';
    position = 'above';
    fecha = new Date();
    hora = new Date();

    estadoHistoricoSector: HistoricoSector;
    estadoHistoricoSectorSensor: HistoricoSector;
    fechaInicioReporte: string;
    fechaFinReporte: string;
    perfilEstadoHistorico: boolean;

    //tabla temperatura
    diasUnicosTemperatura = [];
    temperaturaHistorico = [];
    temperaturaMaximoMinimo = [];

    //grafico temperatura
    mock: any = ChartMock;
    settingsTemperatura = {
        actions: {
            columnTitle: 'Accion',
            add: false,
            delete: false,
            edit: false
        },
        columns: {
            fechaMedicion: {
                title: 'Fecha.',
                filter: false,
            },
            valorMedicion: {
                title: 'Valor (°C).',
                filter: false,
            }
        }
    };

    dataTemperatura = [];
    sourceTemperatura: LocalDataSource;

    //tabla humedad
    diasUnicosHumedad = [];
    humedadHistorico = [];
    humedadMaximoMinimo = [];
    mockHumedad: any = ChartMockHumedad;
    settingsHumedad = {
        actions: {
            columnTitle: 'Accion',
            add: false,
            delete: false,
            edit: false
        },
        columns: {
            fechaMedicion: {
                title: 'Fecha.',
                filter: false,
            },
            valorMedicion: {
                title: 'Valor (%).',
                filter: false,
            }
        }
    };

    dataHumedad = [];
    sourceHumedad: LocalDataSource;

    //tabla presion
    diasUnicosPresion = [];
    presionHistorico = [];
    presionMaximoMinimo = [];
    mockPresion: any = ChartMockPresion;
    settingsPresion = {
        actions: {
            columnTitle: 'Accion',
            add: false,
            delete: false,
            edit: false
        },
        columns: {
            fechaMedicion: {
                title: 'Fecha.',
                filter: false,
            },
            valorMedicion: {
                title: 'Valor (Pha).',
                filter: false,
            }
        }
    };

    dataPresion = [];
    sourcePresion: LocalDataSource;

    //tabla temperatura suelo
    diasUnicosTemperaturaSuelo = [];
    temperaturaSueloHistorico = [];
    temperaturaSueloMaximoMinimo = [];
    mockTemperaturaSuelo: any = ChartMockTemperaturaSuelo;
    settingsTemperaturaSuelo = {
        actions: {
            columnTitle: 'Accion',
            add: false,
            delete: false,
            edit: false
        },
        columns: {
            fechaMedicion: {
                title: 'Fecha.',
                filter: false,
            },
            valorMedicion: {
                title: 'Valor (°C).',
                filter: false,
            }
        }
    };

    dataTemperaturaSuelo = [];
    sourceTemperaturaSuelo: LocalDataSource;

    //tabla humedad suelo
    diasUnicosHumedadSuelo = [];
    humedadSueloHistorico = [];
    humedadSueloMaximoMinimo = [];
    mockHumedadSuelo: any = ChartMockHumedadSuelo;
    settingsHumedadSuelo = {
        actions: {
            columnTitle: 'Accion',
            add: false,
            delete: false,
            edit: false
        },
        columns: {
            fechaMedicion: {
                title: 'Fecha.',
                filter: false,
            },
            valorMedicion: {
                title: 'Valor (%).',
                filter: false,
            }
        }
    };

    dataHumedadSuelo = [];
    sourceHumedadSuelo: LocalDataSource;

    //tabla radiacion 
    diasUnicosRadiacion = [];
    radiacionHistorico = [];
    radiacionMaximoMinimo = [];
    mockRadiacion: any = ChartMockRadiacion;
    settingsRadiacion = {
        actions: {
            columnTitle: 'Accion',
            add: false,
            delete: false,
            edit: false
        },
        columns: {
            fechaMedicion: {
                title: 'Fecha.',
                filter: false,
            },
            valorMedicion: {
                title: 'Valor (W/m2).',
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
        appService.getState().topnavTitle = "Reporte Histórico Estado Sector";


    }

    ngOnInit() { }

    getPermisoGenerarReporteEstadoHistoricoSector() {
        return this.permisoGenerarReporteEstadoHistoricoSector;
    }

    apretarGenerarReporte() {
        let resultado = this.compararFechas();
        if (resultado) {
            this.generarReportesService.obtenerInformeHistoricoSector(this.idSector, this.idFinca, this.fechaInicioReporte, this.fechaFinReporte)
                .then(
                response => {
                    if (response.detalle_operacion == "No hay datos") {
                        this.errorMessageReporte = "No hay datos para construir el reporte.";
                    }
                    else {
                        this.estadoHistoricoSector = response.datos_operacion['medicionClimaticaList'];
                        this.estadoHistoricoSectorSensor = response.datos_operacion['componenteMedicionListaMediciones'];
                        this.obtenerTablasInternas();
                        this.obtenerTablasSensores();

                        this.dataTemperatura = this.temperaturaHistorico;
                        this.sourceTemperatura = new LocalDataSource(this.dataTemperatura);

                        this.dataHumedad = this.humedadHistorico;
                        this.sourceHumedad = new LocalDataSource(this.dataHumedad);

                        this.dataPresion = this.presionHistorico;
                        this.sourcePresion = new LocalDataSource(this.dataPresion);

                        this.dataTemperaturaSuelo = this.temperaturaSueloHistorico;
                        this.sourceTemperaturaSuelo = new LocalDataSource(this.dataTemperaturaSuelo);

                        this.dataHumedadSuelo = this.humedadSueloHistorico;
                        this.sourceHumedadSuelo = new LocalDataSource(this.dataHumedadSuelo);

                        this.dataRadiacion = this.radiacionHistorico;
                        this.sourceRadiacion = new LocalDataSource(this.dataRadiacion);

                        this.llenarGraficoTemperatura();
                        this.llenarGraficoTemperaturaSuelo();
                        this.llenarGraficoHumedad();
                        this.llenarGraficoHumedadSuelo();
                        this.llenarGraficoPresion();
                        this.llenarGraficoRadiacion();
                        this.perfilEstadoHistorico = true;
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
    getPerfilEstadoHistoricoSeleccionado() {
        return this.perfilEstadoHistorico;
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
    obtenerTablasInternas() {
        let temperatura = [];
        let humedad = [];
        let presion = [];
        let longitud = Object.keys(this.estadoHistoricoSector).length;
        let valorMedicion;
        let fechaMedicion;

        //obtengo el historico de la temperatura
        for (var i = 0; i < longitud; i++) {
            let estadoActual = this.estadoHistoricoSector[i]['medicionClimatica'];
            let tamanioMedicion = (estadoActual['mediciones_detalles']).length;
            for (var k = 0; k < tamanioMedicion; k++) {
                let medicion = estadoActual['mediciones_detalles'][k]['tipoMedicionClimatica'];
                if (medicion == "temperatura") {
                    valorMedicion = (estadoActual['mediciones_detalles'][k]['valor']);
                    fechaMedicion = estadoActual['fechaHora'].substring(0, 10);
                    let clasetemperatura = new tablaMediciones(valorMedicion, fechaMedicion);
                    temperatura.push(clasetemperatura);
                }
                else {
                    if (medicion == "humedad") {
                        console.log("medicion: " + medicion);
                        valorMedicion = (estadoActual['mediciones_detalles'][k]['valor']);
                        console.log("valorMedicion: " + valorMedicion);
                        fechaMedicion = estadoActual['fechaHora'].substring(0, 10);
                        console.log("fechaMedicion: " + fechaMedicion);
                        let claseHumedad = new tablaMediciones(valorMedicion, fechaMedicion);
                        humedad.push(claseHumedad);
                    }
                    else {
                        if (medicion == "presion") {
                            console.log("medicion: " + medicion);
                            valorMedicion = (estadoActual['mediciones_detalles'][k]['valor']);
                            console.log("valorMedicion: " + valorMedicion);
                            fechaMedicion = estadoActual['fechaHora'].substring(0, 10);
                            console.log("fechaMedicion: " + fechaMedicion);
                            let clasePresion = new tablaMediciones(valorMedicion, fechaMedicion);
                            presion.push(clasePresion);
                        }
                    }
                }
            }

        }
        this.obtenerTablaTemperatura(temperatura);
        this.obtenerTablaHumedad(humedad);
        this.obtenerTablaPresion(presion);

    }
    obtenerTablaTemperatura(temperatura) {

        this.temperaturaHistorico = temperatura;

        //obtengo dias unicos donde se registro temperatura
        let temperaturaDiasUnicos = [];
        for (var j = 0; j < temperatura.length; j++) {
            let valorDiaActual = temperatura[j]['fechaMedicion'].substring(0, 10);
            if (temperaturaDiasUnicos.includes(valorDiaActual)) {

            }
            else {
                temperaturaDiasUnicos.push(temperatura[j]['fechaMedicion'].substring(0, 10));
            }

        }
        this.diasUnicosTemperatura = temperaturaDiasUnicos;

        //obtengo valores maximos para los dias en que se registro temperatura
        let valorMaximoDia;
        let valorMinimoDia;
        let valorDiaActual;
        for (var j = 0; j < temperaturaDiasUnicos.length; j++) {
            valorDiaActual = temperaturaDiasUnicos[j];
            valorMaximoDia = this.obtenerMaximoDia(temperatura, valorDiaActual);
            valorMinimoDia = this.obtenerMinimoDia(temperatura, valorDiaActual);

            let temperaturaMaximoMinimo = new tablaMedicionesMaximoMinimo(valorMaximoDia, valorMinimoDia, valorDiaActual);
            this.temperaturaMaximoMinimo.push(temperaturaMaximoMinimo);
        }

    }

    obtenerTablaHumedad(humedad) {
        this.humedadHistorico = humedad;

        //obtengo dias unicos donde se registro humedad
        let humedadDiasUnicos = [];
        for (var j = 0; j < humedad.length; j++) {
            let valorDiaActual = humedad[j]['fechaMedicion'].substring(0, 10);
            if (humedadDiasUnicos.includes(valorDiaActual)) {

            }
            else {
                humedadDiasUnicos.push(humedad[j]['fechaMedicion'].substring(0, 10));
            }

        }
        this.diasUnicosHumedad = humedadDiasUnicos;
        console.log(this.diasUnicosHumedad);

        //obtengo valores maximos para los dias en que se registro humedad
        let valorMaximoDia;
        let valorMinimoDia;
        let valorDiaActual;
        for (var j = 0; j < humedadDiasUnicos.length; j++) {
            valorDiaActual = humedadDiasUnicos[j];
            valorMaximoDia = this.obtenerMaximoDia(humedad, valorDiaActual);
            valorMinimoDia = this.obtenerMinimoDia(humedad, valorDiaActual);

            let humedadMaximoMinimo = new tablaMedicionesMaximoMinimo(valorMaximoDia, valorMinimoDia, valorDiaActual);
            this.humedadMaximoMinimo.push(humedadMaximoMinimo);
        }
        console.log(this.humedadMaximoMinimo)
    }

    obtenerTablaPresion(presion) {
        this.presionHistorico = presion;

        //obtengo dias unicos donde se registro presion
        let presionDiasUnicos = [];
        for (var j = 0; j < presion.length; j++) {
            let valorDiaActual = presion[j]['fechaMedicion'].substring(0, 10);
            if (presionDiasUnicos.includes(valorDiaActual)) {

            }
            else {
                presionDiasUnicos.push(presion[j]['fechaMedicion'].substring(0, 10));
            }

        }
        this.diasUnicosPresion = presionDiasUnicos;
        console.log(this.diasUnicosPresion);

        //obtengo valores maximos para los dias en que se registro presion
        let valorMaximoDia;
        let valorMinimoDia;
        let valorDiaActual;
        for (var j = 0; j < presionDiasUnicos.length; j++) {
            valorDiaActual = presionDiasUnicos[j];
            valorMaximoDia = this.obtenerMaximoDia(presion, valorDiaActual);
            valorMinimoDia = this.obtenerMinimoDia(presion, valorDiaActual);

            let presionMaximoMinimo = new tablaMedicionesMaximoMinimo(valorMaximoDia, valorMinimoDia, valorDiaActual);
            this.presionMaximoMinimo.push(presionMaximoMinimo);
        }
        console.log(this.presionMaximoMinimo)
    }

    obtenerTablasSensores() {
        let temperatura = [];
        let humedad = [];
        let radiacion = [];
        let longitud = Object.keys(this.estadoHistoricoSectorSensor).length;
        let valorMedicion;
        let fechaMedicion;

        //obtengo el historico de la temperatura
        for (var i = 0; i < longitud; i++) {
            let estadoActual = this.estadoHistoricoSectorSensor[i]['medicionCabecera'];
            let tamanioMedicion = (estadoActual['lista_mediciones_detalle']).length;
            for (var k = 0; k < tamanioMedicion; k++) {
                let medicion = estadoActual['lista_mediciones_detalle'][k]['tipo_medicion'];
                if (medicion == "Temperatura suelo") {
                    valorMedicion = (estadoActual['lista_mediciones_detalle'][k]['valor']);
                    fechaMedicion = estadoActual['fecha_y_hora'].substring(0, 10);
                    let clasetemperatura = new tablaMediciones(valorMedicion, fechaMedicion);
                    temperatura.push(clasetemperatura);
                }
                else {
                    if (medicion == "Humedad suelo") {
                        console.log("medicion: " + medicion);
                        valorMedicion = (estadoActual['lista_mediciones_detalle'][k]['valor']);
                        console.log("valorMedicion: " + valorMedicion);
                        fechaMedicion = estadoActual['fecha_y_hora'].substring(0, 10);
                        console.log("fechaMedicion: " + fechaMedicion);
                        let claseHumedad = new tablaMediciones(valorMedicion, fechaMedicion);
                        humedad.push(claseHumedad);
                    }
                    else {
                        if (medicion == "Radiacion solar") {
                            console.log("medicion: " + medicion);
                            valorMedicion = (estadoActual['lista_mediciones_detalle'][k]['valor']);
                            console.log("valorMedicion: " + valorMedicion);
                            fechaMedicion = estadoActual['fecha_y_hora'].substring(0, 10);
                            console.log("fechaMedicion: " + fechaMedicion);
                            let claseRadiacion = new tablaMediciones(valorMedicion, fechaMedicion);
                            radiacion.push(claseRadiacion);
                        }
                    }
                }
            }

        }
        this.obtenerTablaTemperaturaSuelo(temperatura);
        this.obtenerTablaHumedadSuelo(humedad);
        this.obtenerTablaRadiacion(radiacion);
    }

    obtenerTablaTemperaturaSuelo(temperatura) {
        this.temperaturaSueloHistorico = temperatura;

        //obtengo dias unicos donde se registro temperatura
        let temperaturaDiasUnicos = [];
        for (var j = 0; j < temperatura.length; j++) {
            let valorDiaActual = temperatura[j]['fechaMedicion'].substring(0, 10);
            if (temperaturaDiasUnicos.includes(valorDiaActual)) {

            }
            else {
                temperaturaDiasUnicos.push(temperatura[j]['fechaMedicion'].substring(0, 10));
            }

        }
        this.diasUnicosTemperaturaSuelo = temperaturaDiasUnicos;

        //obtengo valores maximos para los dias en que se registro temperatura
        let valorMaximoDia;
        let valorMinimoDia;
        let valorDiaActual;
        for (var j = 0; j < temperaturaDiasUnicos.length; j++) {
            valorDiaActual = temperaturaDiasUnicos[j];
            valorMaximoDia = this.obtenerMaximoDia(temperatura, valorDiaActual);
            valorMinimoDia = this.obtenerMinimoDia(temperatura, valorDiaActual);

            let temperaturaMaximoMinimo = new tablaMedicionesMaximoMinimo(valorMaximoDia, valorMinimoDia, valorDiaActual);
            this.temperaturaSueloMaximoMinimo.push(temperaturaMaximoMinimo);
        }

    }

    obtenerTablaHumedadSuelo(humedad) {
        this.humedadSueloHistorico = humedad;

        //obtengo dias unicos donde se registro humedad
        let humedadDiasUnicos = [];
        for (var j = 0; j < humedad.length; j++) {
            let valorDiaActual = humedad[j]['fechaMedicion'].substring(0, 10);
            if (humedadDiasUnicos.includes(valorDiaActual)) {

            }
            else {
                humedadDiasUnicos.push(humedad[j]['fechaMedicion'].substring(0, 10));
            }

        }
        this.diasUnicosHumedadSuelo = humedadDiasUnicos;

        //obtengo valores maximos para los dias en que se registro humedad
        let valorMaximoDia;
        let valorMinimoDia;
        let valorDiaActual;
        for (var j = 0; j < humedadDiasUnicos.length; j++) {
            valorDiaActual = humedadDiasUnicos[j];
            valorMaximoDia = this.obtenerMaximoDia(humedad, valorDiaActual);
            valorMinimoDia = this.obtenerMinimoDia(humedad, valorDiaActual);

            let humedadMaximoMinimo = new tablaMedicionesMaximoMinimo(valorMaximoDia, valorMinimoDia, valorDiaActual);
            this.humedadSueloMaximoMinimo.push(humedadMaximoMinimo);
        }
        console.log(this.humedadMaximoMinimo)
    }

    obtenerTablaRadiacion(radiacion) {
        this.radiacionHistorico = radiacion;

        //obtengo dias unicos donde se registro humedad
        let radiacionDiasUnicos = [];
        for (var j = 0; j < radiacion.length; j++) {
            let valorDiaActual = radiacion[j]['fechaMedicion'].substring(0, 10);
            if (radiacionDiasUnicos.includes(valorDiaActual)) {

            }
            else {
                radiacionDiasUnicos.push(radiacion[j]['fechaMedicion'].substring(0, 10));
            }

        }
        this.diasUnicosRadiacion = radiacionDiasUnicos;

        //obtengo valores maximos para los dias en que se registro humedad
        let valorMaximoDia;
        let valorMinimoDia;
        let valorDiaActual;
        for (var j = 0; j < radiacionDiasUnicos.length; j++) {
            valorDiaActual = radiacionDiasUnicos[j];
            valorMaximoDia = this.obtenerMaximoDia(radiacion, valorDiaActual);
            valorMinimoDia = this.obtenerMinimoDia(radiacion, valorDiaActual);

            let radiacionMaximoMinimo = new tablaMedicionesMaximoMinimo(valorMaximoDia, valorMinimoDia, valorDiaActual);
            this.radiacionMaximoMinimo.push(radiacionMaximoMinimo);
        }
        
    }


    obtenerMaximoDia(arrayElementos, valorDiaActual) {
        let valorMaximo = -10000;
        for (var i = 0; i < arrayElementos.length; i++) {
            if (((arrayElementos[i]['fechaMedicion']).substring(0, 10)) == valorDiaActual) {
                if (valorMaximo < arrayElementos[i]['valorMedicion']) {
                    valorMaximo = arrayElementos[i]['valorMedicion'];
                }
            }
        }
        return valorMaximo;




    }

    obtenerMinimoDia(arrayElementos, valorDiaActual) {
        let valorMinimo = 10000;
        for (var i = 0; i < arrayElementos.length; i++) {
            if (((arrayElementos[i]['fechaMedicion']).substring(0, 10)) == valorDiaActual) {
                if (valorMinimo > arrayElementos[i]['valorMedicion']) {
                    valorMinimo = arrayElementos[i]['valorMedicion'];
                }
            }
        }
        return valorMinimo;
    }

    llenarGraficoTemperatura() {
        let longitud = this.temperaturaMaximoMinimo.length;
        let maximo = [];
        let minimo = [];
        for (var i = 0; i < longitud; i++) {
            let minimoActual = this.temperaturaMaximoMinimo[i]['valorMedicionMinima'];
            let maximoActual = this.temperaturaMaximoMinimo[i]['valorMedicionMaxima'];
            minimo.push(minimoActual);
            maximo.push(maximoActual);
        }

        ChartMock.bar.data.datasets[0]['data'] = maximo;
        ChartMock.bar.data.datasets[1]['data'] = minimo;
        ChartMock.bar.data.labels = this.diasUnicosTemperatura;

    }
    llenarGraficoTemperaturaSuelo() {
        let longitud = this.temperaturaSueloMaximoMinimo.length;
        let maximo = [];
        let minimo = [];
        for (var i = 0; i < longitud; i++) {
            let minimoActual = this.temperaturaSueloMaximoMinimo[i]['valorMedicionMinima'];
            let maximoActual = this.temperaturaSueloMaximoMinimo[i]['valorMedicionMaxima'];
            minimo.push(minimoActual);
            maximo.push(maximoActual);
        }

        ChartMockTemperaturaSuelo.bar.data.datasets[0]['data'] = maximo;
        ChartMockTemperaturaSuelo.bar.data.datasets[1]['data'] = minimo;
        ChartMockTemperaturaSuelo.bar.data.labels = this.diasUnicosTemperaturaSuelo;
    }

    llenarGraficoHumedad() {
        let longitud = this.humedadMaximoMinimo.length;
        let maximo = [];
        let minimo = [];
        for (var i = 0; i < longitud; i++) {
            let minimoActual = this.humedadMaximoMinimo[i]['valorMedicionMinima'];
            let maximoActual = this.humedadMaximoMinimo[i]['valorMedicionMaxima'];
            minimo.push(minimoActual);
            maximo.push(maximoActual);
        }

        ChartMockHumedad.bar.data.datasets[0]['data'] = maximo;
        ChartMockHumedad.bar.data.datasets[1]['data'] = minimo;
        ChartMockHumedad.bar.data.labels = this.diasUnicosHumedad;
    }

    llenarGraficoHumedadSuelo() {
        let longitud = this.humedadSueloMaximoMinimo.length;
        let maximo = [];
        let minimo = [];
        for (var i = 0; i < longitud; i++) {
            let minimoActual = this.humedadSueloMaximoMinimo[i]['valorMedicionMinima'];
            let maximoActual = this.humedadSueloMaximoMinimo[i]['valorMedicionMaxima'];
            minimo.push(minimoActual);
            maximo.push(maximoActual);
        }

        ChartMockHumedadSuelo.bar.data.datasets[0]['data'] = maximo;
        ChartMockHumedadSuelo.bar.data.datasets[1]['data'] = minimo;
        ChartMockHumedadSuelo.bar.data.labels = this.diasUnicosHumedadSuelo;
    }

    llenarGraficoPresion() {
        let longitud = this.presionMaximoMinimo.length;
        let maximo = [];
        let minimo = [];
        for (var i = 0; i < longitud; i++) {
            let minimoActual = this.presionMaximoMinimo[i]['valorMedicionMinima'];
            let maximoActual = this.presionMaximoMinimo[i]['valorMedicionMaxima'];
            minimo.push(minimoActual);
            maximo.push(maximoActual);
        }

        ChartMockPresion.bar.data.datasets[0]['data'] = maximo;
        ChartMockPresion.bar.data.datasets[1]['data'] = minimo;
        ChartMockPresion.bar.data.labels = this.diasUnicosPresion;
    }

    llenarGraficoRadiacion() {
        let longitud = this.radiacionMaximoMinimo.length;
        let maximo = [];
        let minimo = [];
        for (var i = 0; i < longitud; i++) {
            let minimoActual = this.radiacionMaximoMinimo[i]['valorMedicionMinima'];
            let maximoActual = this.radiacionMaximoMinimo[i]['valorMedicionMaxima'];
            minimo.push(minimoActual);
            maximo.push(maximoActual);
        }

        ChartMockRadiacion.bar.data.datasets[0]['data'] = maximo;
        ChartMockRadiacion.bar.data.datasets[1]['data'] = minimo;
        ChartMockRadiacion.bar.data.labels = this.diasUnicosRadiacion;
    }

    apretarSalir() {
        this.router.navigate(['/homeReportes/']);
    }

    apretarAtras(){
        this.router.navigate(['/homeReportes/']);
    }
}

export class tablaMediciones {
    valorMedicion: number;
    fechaMedicion: string;

    constructor(valorMedicion: number, fechaMedicion: string) {
        this.valorMedicion = valorMedicion;
        this.fechaMedicion = fechaMedicion;
    }
    getFecha() {
        return this.fechaMedicion;
    }
    getValor() {
        return this.valorMedicion;
    }
}

export class tablaMedicionesMaximoMinimo {
    valorMedicionMaxima: number;
    valorMedicionMinima: number;
    fechaMedicion: string;

    constructor(valorMedicionMaxima: number, valorMedicionMinima: number, fechaMedicion: string) {
        this.valorMedicionMaxima = valorMedicionMaxima;
        this.valorMedicionMinima = valorMedicionMinima;
        this.fechaMedicion = fechaMedicion;
    }
    getFecha() {
        return this.fechaMedicion;
    }
    getValorMedicionMaxima() {
        return this.valorMedicionMaxima;
    }
    getvalorMedicionMinima() {
        return this.valorMedicionMinima;

    }
}
class ChartMock {
    static bar = {
        type: 'bar',
        data: {
            labels: [],
            datasets: [
                {
                    label: 'Máximo',
                    borderColor: '#009688',
                    backgroundColor: 'rgba(0, 150, 136, 0.5)',
                    data: []
                },
                {
                    label: 'Mínimo',
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

class ChartMockHumedad {
    static bar = {
        type: 'bar',
        data: {
            labels: [],
            datasets: [
                {
                    label: 'Máximo',
                    borderColor: '#009688',
                    backgroundColor: 'rgba(0, 150, 136, 0.5)',
                    data: []
                },
                {
                    label: 'Mínimo',
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

class ChartMockPresion {
    static bar = {
        type: 'bar',
        data: {
            labels: [],
            datasets: [
                {
                    label: 'Máximo',
                    borderColor: '#009688',
                    backgroundColor: 'rgba(0, 150, 136, 0.5)',
                    data: []
                },
                {
                    label: 'Mínimo',
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
                        max: 2000
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
                    label: 'Máximo',
                    borderColor: '#009688',
                    backgroundColor: 'rgba(0, 150, 136, 0.5)',
                    data: []
                },
                {
                    label: 'Mínimo',
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
                    label: 'Máximo',
                    borderColor: '#009688',
                    backgroundColor: 'rgba(0, 150, 136, 0.5)',
                    data: []
                },
                {
                    label: 'Mínimo',
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
                    label: 'Máximo',
                    borderColor: '#009688',
                    backgroundColor: 'rgba(0, 150, 136, 0.5)',
                    data: []
                },
                {
                    label: 'Mínimo',
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