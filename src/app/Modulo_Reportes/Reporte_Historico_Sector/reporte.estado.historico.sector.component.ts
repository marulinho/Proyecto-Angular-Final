import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DialogExampleComponent } from '../../shared/dialog/dialog-example/dialog-example.component';
import { MdDialog } from '@angular/material';
import { AppService } from '../../app.service';
import { GenerarReportesService, HistoricoSector } from '../generar.repotes.service';

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
    
    estadoHistoricoSector:HistoricoSector;
    fechaInicioReporte:string;
    fechaFinReporte:string;
    perfilEstadoHistorico:boolean;

    //tablaHumedad
    humedadHistorico=[];
    humedadMaximoMinimo=[];
    

    constructor(private router: Router,
        private route: ActivatedRoute,
        private appService: AppService,
        private generarReportesService:GenerarReportesService,
        private dialog: MdDialog) {
        appService.getState().topnavTitle = "Reporte Histórico Estado Sector.";


    }

    ngOnInit(){}

    apretarGenerarReporte(){
        this.generarReportesService.obtenerInformeHistoricoSector(this.idSector,this.idFinca,this.fechaInicioReporte,this.fechaFinReporte)
            .then(
                response=>{
                    if(response.detalle_operacion=="No hay datos"){
                        this.errorMessageReporte="No hay datos para construir el reporte.";
                    }
                    else{
                        this.estadoHistoricoSector=response.datos_operacion['componenteMedicionListaMediciones'];
                        this.obtenerTablasInternas();
                        this.perfilEstadoHistorico=true;
                    }
                }
            )
    }
    getPerfilEstadoHistoricoSeleccionado(){
        return this.perfilEstadoHistorico;
    }
    
    obtenerTablasInternas(){
        let humedad=[];
        let longitud=Object.keys(this.estadoHistoricoSector).length;
        console.log("longitud "+longitud);
        let valorMedicion;
        let fechaMedicion;

        //obtengo el historico de la humedad
        for(var i=0;i<longitud;i++){
            let estadoActual=this.estadoHistoricoSector[i]['medicionCabecera'];
            let medicion=estadoActual['lista_mediciones_detalle'][0]['tipo_medicion'];
            if(medicion=="temperatura"){
                valorMedicion=estadoActual['lista_mediciones_detalle'][0]['valor'];
                fechaMedicion=estadoActual['fecha_y_hora'];
                let claseHumedad = new tablaHumedad(valorMedicion,fechaMedicion);
                humedad.push(claseHumedad);
            }
        }
        console.log(humedad);
        this.humedadHistorico=humedad;

        //obtengo dias unicos donde se registro humedad
        let humedadDiasUnicos=[];
        for(var j=0;j<humedad.length;j++){
            let valorDiaActual = humedad[j]['fechaMedicion'].substring(0,10);
            if(humedadDiasUnicos.includes(valorDiaActual)){

            }
            else{
                humedadDiasUnicos.push(humedad[j]['fechaMedicion'].substring(0,10));
            }
            
        }
        console.log(humedadDiasUnicos);

        //obtengo valores maximos para los dias en que se registro humedad
        let valorMaximoDia;
        let valorMinimoDia;
        let valorDiaActual;
        for(var j=0;j<humedadDiasUnicos.length;j++){
            valorDiaActual = humedadDiasUnicos[j];
            console.log("dia: "+valorDiaActual);
            valorMaximoDia=this.obtenerMaximoDia(humedad,valorDiaActual);

            //obtengo valores minimos para los dias en que se registro humedad
            for(var j=0;j<humedadDiasUnicos.length;j++){
                valorDiaActual = humedadDiasUnicos[j];
                console.log("dia: "+valorDiaActual);
                valorMinimoDia=this.obtenerMinimoDia(humedad,valorDiaActual);
            
            }
            let humedadMaximoMinimo = new tablaHumedadMaximoMinimo(valorMaximoDia,valorMinimoDia,valorDiaActual);
            this.humedadMaximoMinimo.push(humedadMaximoMinimo);
        }

        console.log("Humedad historica: ");
        console.log(this.humedadHistorico);

        console.log("Humedad maximo: ");
        console.log(this.humedadMaximoMinimo);
    }

    obtenerMaximoDia(humedad,valorDiaActual){
        let valorMaximo=-10000;
        for(var i = 0; i<humedad.length;i++){
            if(((humedad[i]['fechaMedicion']).substring(0,10))==valorDiaActual){
                console.log("igualdad: "+i);
                if(valorMaximo<humedad[i]['valorMedicion']){
                    valorMaximo=humedad[i]['valorMedicion'];
                }
            }
        }
        console.log("valor maximo: "+valorMaximo);
        return valorMaximo;
            
        
        

    }

    obtenerMinimoDia(humedad,valorDiaActual){
        let valorMinimo=10000;
        for(var i = 0; i<humedad.length;i++){
            if(((humedad[i]['fechaMedicion']).substring(0,10))==valorDiaActual){
                console.log("igualdad: "+i);
                if(valorMinimo>humedad[i]['valorMedicion']){
                    valorMinimo=humedad[i]['valorMedicion'];
                }
            }
        }
        console.log("valor minimo: "+valorMinimo);
        return valorMinimo;
            
        
        

    }
}

export class tablaHumedad{
    valorMedicion:number;
    fechaMedicion:string;

    constructor(valorMedicion:number,fechaMedicion:string){
        this.valorMedicion=valorMedicion;
        this.fechaMedicion=fechaMedicion;
    }
    getFecha(){
        return this.fechaMedicion;
    }
    getValor(){
        return this.valorMedicion;
    }
}

export class tablaHumedadMaximoMinimo{
    valorMedicionMaxima:number;
    valorMedicionMinima:number;
    fechaMedicion:string;

    constructor(valorMedicionMaxima:number,valorMedicionMinima:number,fechaMedicion:string){
        this.valorMedicionMaxima=valorMedicionMaxima;
        this.fechaMedicion=fechaMedicion;
        this.valorMedicionMinima=valorMedicionMinima;
    }
    getFecha(){
        return this.fechaMedicion;
    }
    getValorMedicionMaxima(){
        return this.valorMedicionMaxima;
    }
    getvalorMedicionMinima(){
        return this.valorMedicionMinima;

    }
}

