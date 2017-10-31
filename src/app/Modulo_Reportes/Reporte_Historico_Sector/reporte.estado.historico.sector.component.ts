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


    dia = new Date().getDay();
    mes = new Date().getMonth() + 1;
    anio = new Date().getFullYear();
    fechaActual: string = this.dia + "-" + this.mes + "-" + this.anio;
    hora = new Date().getHours();
    minutos = new Date().getMinutes();
    segundos = new Date().getSeconds();
    horaActual = this.hora + ":" + this.minutos + ":" + this.segundos;

    estadoHistoricoSector: HistoricoSector;
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
                title: 'Valor.',
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
                title: 'Valor.',
                filter: false,
            }
        }
    };

    dataHumedad = [];
    sourceHumedad: LocalDataSource;


    constructor(private router: Router,
        private route: ActivatedRoute,
        private appService: AppService,
        private generarReportesService: GenerarReportesService,
        private dialog: MdDialog) {
        appService.getState().topnavTitle = "Reporte Histórico Estado Sector.";


    }

    ngOnInit() { }

    getPermisoGenerarReporteEstadoHistoricoSector(){
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
                        this.estadoHistoricoSector = response.datos_operacion['componenteMedicionListaMediciones'];
                        this.obtenerTablasInternas();
                        this.dataTemperatura = this.temperaturaHistorico;
                        this.sourceTemperatura = new LocalDataSource(this.dataTemperatura);

                        this.dataHumedad = this.humedadHistorico;
                        this.sourceHumedad = new LocalDataSource(this.dataHumedad);

                        this.llenarGraficoTemperatura();
                        this.llenarGraficoHumedad();
                        this.perfilEstadoHistorico = true;
                    }
                }
                )
                .catch(
                error => {
                    if (error.error_description == this.erroresSistema.getInicioSesion()) {
                        this.router.navigate(['/login/']);
                    }
                    else{
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
        let longitud = Object.keys(this.estadoHistoricoSector).length;
        let valorMedicion;
        let fechaMedicion;

        //obtengo el historico de la temperatura
        for (var i = 0; i < longitud; i++) {
            let estadoActual = this.estadoHistoricoSector[i]['medicionCabecera'];
            let tamanioMedicion = (estadoActual['lista_mediciones_detalle']).length;
            console.log(tamanioMedicion);
            for (var k = 0; k < tamanioMedicion; k++) {
                let medicion = estadoActual['lista_mediciones_detalle'][k]['tipo_medicion'];
                if (medicion == "temperatura") {
                    valorMedicion = (estadoActual['lista_mediciones_detalle'][k]['valor']);
                    fechaMedicion = estadoActual['fecha_y_hora'].substring(0, 10);
                    let clasetemperatura = new tablaMediciones(valorMedicion, fechaMedicion);
                    temperatura.push(clasetemperatura);
                }
                else {
                    if (medicion == "humedad") {
                        valorMedicion = (estadoActual['lista_mediciones_detalle'][k]['valor']);
                        fechaMedicion = estadoActual['fecha_y_hora'].substring(0, 10);
                        let claseHumedad = new tablaMediciones(valorMedicion, fechaMedicion);
                        humedad.push(claseHumedad);
                    }
                }
            }

        }
        this.obtenerTablaTemperatura(temperatura);
        this.obtenerTablaHumedad(humedad);
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

    apretarSalir(){
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
