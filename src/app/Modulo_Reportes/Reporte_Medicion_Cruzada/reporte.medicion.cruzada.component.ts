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
                    title: 'Fecha Inicio',
                    filter: false,
                },
                fechaHoraFinal: {
                    title: 'Fecha Fin',
                    filter: false,
                },
                medicionAntes: {
                    title: 'Valor Antes (°C)',
                    filter: false,
                },
                medicionDespues: {
                    title: 'Valor Después(°C)',
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
                    title: 'Fecha Inicio',
                    filter: false,
                },
                fechaHoraFinal: {
                    title: 'Fecha Fin',
                    filter: false,
                },
                medicionAntes: {
                    title: 'Valor Antes (°C)',
                    filter: false,
                },
                medicionDespues: {
                    title: 'Valor Antes (°C)',
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
                    title: 'Fecha Inicio',
                    filter: false,
                },
                fechaHoraFinal: {
                    title: 'Fecha Fin',
                    filter: false,
                },
                medicionAntes: {
                    title: 'Valor Antes(%)',
                    filter: false,
                },
                medicionDespues: {
                    title: 'Valor Después(%)',
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
                   title: 'Fecha Inicio',
                   filter: false,
               },
               fechaHoraFinal: {
                   title: 'Fecha Fin',
                   filter: false,
               },
               medicionAntes: {
                   title: 'Valor Antes(%)',
                   filter: false,
               },
               medicionDespues: {
                   title: 'Valor Después(%)',
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
                    title: 'Fecha Inicio',
                    filter: false,
                },
                fechaHoraFinal: {
                    title: 'Fecha Fin',
                    filter: false,
                },
                medicionAntes: {
                    title: 'Valor Antes(W/m2)',
                    filter: false,
                },
                medicionDespues: {
                    title: 'Valor Después(W/m2)',
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
        appService.getState().topnavTitle = "Reporte Medición Cruzada.";

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
                        console.log("FIN LLENADO TABLAS")

                    }
                }
                )
                .catch(
                error => {
                    if (error.error_description == this.erroresSistema.getInicioSesion()) {
                        this.router.navigate(['/login/']);
                    }
                    else {
                        console.log(error.error_description)
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
            console.log("Iteracion: "+i);
            console.log(this.medicionCruzada.length);
            let ejecucionFechaHoraActual = this.medicionCruzada[i]['ejecucion']['fechaHoraInicio'];
            console.log("fecha ejecucion: "+ejecucionFechaHoraActual);
            if (ejecucionFechaHoraActual == null || ejecucionFechaHoraActual == "") {
                console.log("fecha vacia: "+i);
                //resultado = false;
            }
            
            else {
                let ejecucionFechaHoraFinal = this.medicionCruzada[i]['ejecucion']['fechaHoraFinalizacion'];
                let medicionDetalle = (this.medicionCruzada[i]['medicionesComponenteAntes']['lista_mediciones_detalle']);
                if (medicionDetalle == null || medicionDetalle == "") {
                    console.log("medicion vacia: "+i);
                    let mediciones = new Mediciones("-", "-", "-");
                    temperaturaAire.push(mediciones);
                    temperaturaSuelo.push(mediciones);
                    humedadAire.push(mediciones);
                    humedadSuelo.push(mediciones);
                    radiacion.push(mediciones);
                }
                
                else {
                    let tamanio = medicionDetalle.length;
                    for (var j = 0; j < tamanio; j++) {
                        let medicionActual = medicionDetalle[j]['tipo_medicion'];
                        if (medicionActual == "Temperatura aire") {
                            fechaYhoraInicio = ejecucionFechaHoraActual.substring(0, 10) + "  " + ejecucionFechaHoraActual.substring(11, 19);
                            fechaYhoraFin = ejecucionFechaHoraFinal.substring(0, 10) + "  " + ejecucionFechaHoraFinal.substring(11, 19);
                            valorMedicion = medicionDetalle[j]['valor']; 
                            if(valorMedicion==null || valorMedicion == ""){
                            }
                            else{
                                let mediciones = new Mediciones(fechaYhoraInicio, fechaYhoraFin, valorMedicion);
                                temperaturaAire.push(mediciones);
                            }
                        }
                        if(medicionActual=="Temperatura suelo"){
                            fechaYhoraInicio = ejecucionFechaHoraActual.substring(0, 10) + "  " + ejecucionFechaHoraActual.substring(11, 19);
                            fechaYhoraFin = ejecucionFechaHoraFinal.substring(0, 10) + "  " + ejecucionFechaHoraFinal.substring(11, 19);
                            valorMedicion = medicionDetalle[j]['valor']; 
                            if(valorMedicion==null || valorMedicion == ""){}
                            else{
                                let mediciones = new Mediciones(fechaYhoraInicio, fechaYhoraFin, valorMedicion);
                                temperaturaSuelo.push(mediciones);
                            }
                        }
                        if(medicionActual=="Humedad aire"){
                            fechaYhoraInicio = ejecucionFechaHoraActual.substring(0, 10) + "  " + ejecucionFechaHoraActual.substring(11, 19);
                            fechaYhoraFin = ejecucionFechaHoraFinal.substring(0, 10) + "  " + ejecucionFechaHoraFinal.substring(11, 19);
                            valorMedicion = medicionDetalle[j]['valor']; 
                            if(valorMedicion == null || valorMedicion == ""){}
                            else{    
                                let mediciones = new Mediciones(fechaYhoraInicio, fechaYhoraFin, valorMedicion);
                                humedadAire.push(mediciones);
                            }
                        }
                        if(medicionActual=="Humedad suelo"){
                            fechaYhoraInicio = ejecucionFechaHoraActual.substring(0, 10) + "  " + ejecucionFechaHoraActual.substring(11, 19);
                            fechaYhoraFin = ejecucionFechaHoraFinal.substring(0, 10) + "  " + ejecucionFechaHoraFinal.substring(11, 19);
                            valorMedicion = medicionDetalle[j]['valor']; 
                            if(valorMedicion==null || valorMedicion == ""){}
                            else{    
                                let mediciones = new Mediciones(fechaYhoraInicio, fechaYhoraFin, valorMedicion);
                                humedadSuelo.push(mediciones);
                            }
                        }
                        if(medicionActual=="Radiacion solar"){
                            fechaYhoraInicio = ejecucionFechaHoraActual.substring(0, 10) + "  " + ejecucionFechaHoraActual.substring(11, 19);
                            fechaYhoraFin = ejecucionFechaHoraFinal.substring(0, 10) + "  " + ejecucionFechaHoraFinal.substring(11, 19);
                            valorMedicion = medicionDetalle[j]['valor']; 
                            if(valorMedicion==null || valorMedicion == ""){}
                            else{    
                                let mediciones = new Mediciones(fechaYhoraInicio, fechaYhoraFin, valorMedicion);
                                radiacion.push(mediciones);
                            }
                        }
                    }
                }
            }
            i += 1;
            if (i >= this.medicionCruzada.length){
                resultado = false;
            }
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
            console.log("iteracion: "+i);
            let ejecucionFechaHoraActual = this.medicionCruzada[i]['ejecucion']['fechaHoraInicio'];
            if (ejecucionFechaHoraActual == null || ejecucionFechaHoraActual == "") {
                console.log("fecha vacia: "+i);
            }
            else {
                console.log("antes de medicion: "+i);
                let ejecucionFechaHoraFinal = this.medicionCruzada[i]['ejecucion']['fechaHoraFinalizacion'];
                let medicionDetalle = (this.medicionCruzada[i]['medicionesComponenteDespues']['lista_mediciones_detalle']);
                console.log("despues de medicion: "+i);
                if (medicionDetalle == null || medicionDetalle == "") {
                    console.log("medicion vacia: "+i);
                    //resultado = false;
                }
                else {
                    let tamanio = medicionDetalle.length;
                    console.log("medicion tamanio: "+tamanio);
                    
                    for (var j = 0; j < tamanio; j++) {
                        let medicionActual = medicionDetalle[j]['tipo_medicion'];
                        
                        if (medicionActual == "Temperatura aire") {
                            console.log("medicion aire: "+i);
                            let temperaturaAireAntes = this.temperaturaAireAntes[i];
                            console.log("medicion aire: " + i + " "+this.temperaturaAireAntes[i]);
                            if (temperaturaAireAntes != null){
                                diaInicio = temperaturaAireAntes['fechaHoraInicio'];
                                diaFin = temperaturaAireAntes['fechaHoraFinal'];
                                valorMedicionAntes = temperaturaAireAntes['medicion'];
                                if(valorMedicionAntes == null || valorMedicionAntes == ""){}
                                else{    
                                    console.log("medicion aire valoe medicon: " + valorMedicionAntes);
                                    valorMedicionDespues = medicionDetalle[j]['valor'];
                                    if(valorMedicionDespues==null || valorMedicionDespues == ""){}
                                    else{    
                                        if (diaInicio != "-") {   
                                            let mediciones = new MedicionesTotal(diaInicio, diaFin, valorMedicionAntes,valorMedicionDespues);
                                            temperaturaAire.push(mediciones);
                                        }    
                                    }                            
                                }
                            }
                            
                        }

                        if(medicionActual=="Temperatura suelo"){
                            console.log("medicion temp suelo: "+i);

                            let temperaturaSueloAntes = this.temperaturaSueloAntes[i];
                            if (temperaturaSueloAntes != null){
                                diaInicio = temperaturaSueloAntes['fechaHoraInicio'];
                                diaFin = temperaturaSueloAntes['fechaHoraFinal'];
                                valorMedicionAntes = temperaturaSueloAntes['medicion'];
                                if(valorMedicionAntes == null || valorMedicionAntes == ""){}
                                else{
                                    valorMedicionDespues = medicionDetalle[j]['valor'];
                                    if(valorMedicionDespues == null || valorMedicionDespues == ""){}
                                    else{
                                        if (diaInicio != "-") {   
                                            let mediciones = new MedicionesTotal(diaInicio, diaFin, valorMedicionAntes,valorMedicionDespues);
                                            temperaturaSuelo.push(mediciones);
                                        }  
                                    }
                                }
                            }
                            
                        }

                        if(medicionActual=="Humedad aire"){
                            console.log("medicion humedad aire: "+i);

                            let humedadAireAntes = this.humedadAireAntes[i];
                            if (humedadAireAntes != null){
                                diaInicio = humedadAireAntes['fechaHoraInicio'];
                                diaFin = humedadAireAntes['fechaHoraFinal'];
                                valorMedicionAntes = humedadAireAntes['medicion'];
                                if(valorMedicionAntes == null || valorMedicionAntes == ""){}
                                else{
                                    valorMedicionDespues = medicionDetalle[j]['valor'];
                                    if(valorMedicionDespues == null || valorMedicionDespues == ""){}
                                    else{  
                                        if (diaInicio != "-") {   
                                            let mediciones = new MedicionesTotal(diaInicio, diaFin, valorMedicionAntes,valorMedicionDespues);
                                            humedadAire.push(mediciones);
                                        }   
                                    }
                                }
                            }
                            
                        }

                        if(medicionActual=="Humedad suelo"){
                            console.log("medicion humedad suelo: "+i);

                            let humedadSueloAntes = this.humedadSueloAntes[i];
                            if (humedadSueloAntes != null){
                                diaInicio = humedadSueloAntes['fechaHoraInicio'];
                                diaFin = humedadSueloAntes['fechaHoraFinal'];
                                valorMedicionAntes = humedadSueloAntes['medicion'];
                                if(valorMedicionAntes==null || valorMedicionAntes == ""){}
                                else{
                                    valorMedicionDespues = medicionDetalle[j]['valor'];
                                    if(valorMedicionDespues == null || valorMedicionDespues == ""){}
                                    else{    

                                        if (diaInicio != "-") {   
                                            let mediciones = new MedicionesTotal(diaInicio, diaFin, valorMedicionAntes,valorMedicionDespues);
                                            humedadSuelo.push(mediciones);
                                        } 
                                    }
                                }
                            }
                            
                        }

                        if(medicionActual=="Radiacion solar"){
                            console.log("medicion radiacion: "+i);

                            let radiacionAntes = this.radiacionAntes[i];
                            if (radiacionAntes != null){
                                console.log("medicion radiacion a: "+radiacionAntes);
                                console.log("medicion radiacion a: "+radiacionAntes['fechaHoraInicio']);
                                diaInicio = radiacionAntes['fechaHoraInicio'];
                                console.log("medicion radiacion b: "+i);
                                diaFin = radiacionAntes['fechaHoraFinal'];
                                console.log("medicion radiacion c: "+i);
                                valorMedicionAntes = radiacionAntes['medicion'];
                                console.log("medicion radiacion d: "+i);
                                if(valorMedicionAntes == null || valorMedicionAntes == ""){}
                                else{
                                    console.log("medicion radiacion e: "+i);
                                    valorMedicionDespues = medicionDetalle[j]['valor'];
                                    console.log("medicion radiacion f: "+i);
                                    if(valorMedicionDespues == null || valorMedicionDespues == ""){}    
                                    else{
                                        if (diaInicio != "-") {   
                                            let mediciones = new MedicionesTotal(diaInicio, diaFin, valorMedicionAntes,valorMedicionDespues);
                                            radiacion.push(mediciones);
                                        }   
                                    }
                                }
                            }
                            
                        }
                    }
                }
            }
            i += 1;
            if (i >= this.medicionCruzada.length){
                resultado = false;
            }
        }
        this.temperaturaAire=temperaturaAire;
        console.log(temperaturaAire);
        this.temperaturaSuelo=temperaturaSuelo;
        console.log(temperaturaSuelo);
        this.humedadAire=humedadAire;
        console.log(humedadAire);
        this.humedadSuelo=humedadSuelo;
        console.log(humedadSuelo);
        this.radiacion=radiacion;
        console.log(radiacion);
    }

    llenarGraficoTemperaturaAire(){
        console.log("llenarGraficoTemperaturaAire");
        let longitud = this.temperaturaAire.length;
        let antes = [];
        let despues = [];
        let dias = [];
        for (var i = 0; i < longitud; i++) {
            let medicionAntes = this.temperaturaAire[i]['medicionAntes'];
            let medicionDespues = this.temperaturaAire[i]['medicionDespues'];
            let diasMediciones = this.temperaturaAire[i]['fechaHoraInicio'];
            if (diasMediciones != "-") {
                console.log(diasMediciones)
                antes.push(medicionAntes);
                despues.push(medicionDespues);
                dias.push(diasMediciones);
            } 
        }
        ChartMockTemperaturaAire.bar.data.datasets[0]['data'] = antes;
        ChartMockTemperaturaAire.bar.data.datasets[1]['data'] = despues;
        ChartMockTemperaturaAire.bar.data.labels = dias;
    }

    llenarGraficoTemperaturaSuelo(){
        console.log("llenarGraficoTemperaturaSuelo");
        let longitud = this.temperaturaSuelo.length;
        let antes = [];
        let despues = [];
        let dias = [];
        for (var i = 0; i < longitud; i++) {
            let medicionAntes = this.temperaturaSuelo[i]['medicionAntes'];
            let medicionDespues = this.temperaturaSuelo[i]['medicionDespues'];
            let diasMediciones = this.temperaturaSuelo[i]['fechaHoraInicio'];
            if (diasMediciones != "-") {
                console.log(diasMediciones)
                antes.push(medicionAntes);
                despues.push(medicionDespues);
                dias.push(diasMediciones);
            }
        }
        ChartMockTemperaturaSuelo.bar.data.datasets[0]['data'] = antes;
        ChartMockTemperaturaSuelo.bar.data.datasets[1]['data'] = despues;
        ChartMockTemperaturaSuelo.bar.data.labels = dias;
    }

    llenarGraficoHumedadAire(){
        console.log("llenarGraficoHumedadAire");
        let longitud = this.humedadAire.length;
        let antes = [];
        let despues = [];
        let dias = [];
        for (var i = 0; i < longitud; i++) {
            let medicionAntes = this.humedadAire[i]['medicionAntes'];
            let medicionDespues = this.humedadAire[i]['medicionDespues'];
            let diasMediciones = this.humedadAire[i]['fechaHoraInicio'];
            if (diasMediciones != "-") {
                console.log(diasMediciones)
                antes.push(medicionAntes);
                despues.push(medicionDespues);
                dias.push(diasMediciones);
            }
        }

        ChartMockHumedadAire.bar.data.datasets[0]['data'] = antes;
        ChartMockHumedadAire.bar.data.datasets[1]['data'] = despues;
        ChartMockHumedadAire.bar.data.labels = dias;
    }

    llenarGraficoHumedadSuelo(){
        console.log("llenarGraficoHumedadSuelo");
        let longitud = this.humedadSuelo.length;
        let antes = [];
        let despues = [];
        let dias = [];
        for (var i = 0; i < longitud; i++) {
            let medicionAntes = this.humedadSuelo[i]['medicionAntes'];
            let medicionDespues = this.humedadSuelo[i]['medicionDespues'];
            let diasMediciones = this.humedadSuelo[i]['fechaHoraInicio'];
            if (diasMediciones != "-") {
                console.log(diasMediciones)
                antes.push(medicionAntes);
                despues.push(medicionDespues);
                dias.push(diasMediciones);
            }
        }

        ChartMockHumedadSuelo.bar.data.datasets[0]['data'] = antes;
        ChartMockHumedadSuelo.bar.data.datasets[1]['data'] = despues;
        ChartMockHumedadSuelo.bar.data.labels = dias;
    }

    llenarGraficoRadiacion(){
        console.log("llenarGraficoRadiacion");
        let longitud = this.radiacion.length;
        let antes = [];
        let despues = [];
        let dias = [];
        for (var i = 0; i < longitud; i++) {
            let medicionAntes = this.radiacion[i]['medicionAntes'];
            console.log("medicion radiacion: " +i);
            console.log("medicion radiacion: " + this.radiacion[i]['medicionAntes']);
            let medicionDespues = this.radiacion[i]['medicionDespues'];
            let diasMediciones = this.radiacion[i]['fechaHoraInicio'];
            if (diasMediciones != "-") {
                console.log(diasMediciones)
                antes.push(medicionAntes);
                despues.push(medicionDespues);
                dias.push(diasMediciones);
            }
        }

        ChartMockRadiacion.bar.data.datasets[0]['data'] = antes;
        ChartMockRadiacion.bar.data.datasets[1]['data'] = despues;
        ChartMockRadiacion.bar.data.labels = dias;
    }


    apretarSalir() {
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
