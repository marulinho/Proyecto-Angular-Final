import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DialogExampleComponent } from '../../shared/dialog/dialog-example/dialog-example.component';
import { MdDialog } from '@angular/material';
import { AppService } from '../../app.service';
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
    idFinca:number=parseInt(JSON.parse(localStorage.getItem('idFinca'))); 
    idSector:number=parseInt(JSON.parse(localStorage.getItem('idSector')));
    nombreReporte:string=JSON.parse(localStorage.getItem('nombreReporte'));
    descripcionReporte:string=JSON.parse(localStorage.getItem('descripcionReporte'));   
    
   
    fecha = new Date();
    hora=new Date();

    fechaInicioReporte:string;
    fechaFinReporte:string;
    medicionCruzada=[];
    medicionesComponenteDespues=[];
    medicionesComponenteAntes=[];
    medicionesClimaticas=[];
    reporteSeleccionado:Boolean;

    arrayCompleto=[];



    constructor(private router: Router,
        private route: ActivatedRoute,
        private appService: AppService,
        private generarReportesService:GenerarReportesService,
        private dialog: MdDialog) {
        appService.getState().topnavTitle = "Reporte Medición Cruzada.";

    }

    ngOnInit(){}
    apretarGenerarReporte(){
        let resultado=this.compararFechas()
        if(resultado){
            this.generarReportesService.obtenerInformeMedicionCruzada(this.idFinca,this.idSector,this.fechaInicioReporte,this.fechaFinReporte)
                .then(
                    response=>{
                        if(response.detalle_operacion=="No hay datos"){
                            this.errorMessageReporte="No hay registros en el plazo de tiempo establecido.";
                        }
                        else{
                            this.medicionCruzada=response.datos_operacion;
                            this.obtenerMedicionesDespues();
                            this.obtenerMedicionesAntes();
                            //this.obtenerMedicionesClimaticas();
                            this.reporteSeleccionado=true;
                            
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
                );
        }
    }

    getPermisoGenerarMedicionCruzada(){
        return this.permisoGenerarMedicionCruzada;
    }

    getReporteSeleccionado(){
        return this.reporteSeleccionado;
    }

    compararFechas(){
        let resultado:boolean;
        if( this.fechaInicioReporte==null || this.fechaInicioReporte=="" ||
            this.fechaFinReporte==null || this.fechaFinReporte==null){
            this.errorMessageReporte="Debe completar todos los campos obligatorios (*).";
            resultado=false;
        }
        else{ 
            let fechaInicializacion=[];
            let fechaInicial;
            fechaInicializacion=this.fechaInicioReporte.split("-");
            fechaInicial=parseInt(fechaInicializacion[0]+""+fechaInicializacion[1]+""+fechaInicializacion[2]);

            let fechaFinalizacion=[];
            let fechaFinal;
            fechaFinalizacion=this.fechaFinReporte.split("-");
            fechaFinal=parseInt(fechaFinalizacion[0]+""+fechaFinalizacion[1]+""+fechaFinalizacion[2]);

            if(fechaInicial>fechaFinal){
                this.errorMessageReporte="La fecha inicial no puede ser mayor que la fecha final.";
                resultado=false;
            }
            else{
                this.errorMessageReporte="";
                resultado=true;
            }
        }
        return resultado;
    }

    /*obtenerTablas(){
        console.log("estamos aca");
        let longitud = Object.keys(this.medicionCruzada).length;
        let fechasRiego=[];
        let medicionesDiaTipoValor=[];
        for(var i=0;i<longitud;i++){
            let mediciones = this.medicionCruzada[i]['ejecucion'];
            let fechaInicio = (mediciones['fechaHoraInicio'].substring(0,10))+"  "+mediciones['fechaHoraInicio'].substring(11,19);
            //let horaInicio = mediciones['fechaHoraInicio'].substring(11,19);
            let fechaFinal = (mediciones['fechaHoraFinalizacion'].substring(0,10))+"  "+mediciones['fechaHoraFinalizacion'].substring(11,19);
            //let horaFinal = mediciones['fechaHoraFinalizacion'].substring(11,19);

            let diaRiego = new diasRiego(fechaInicio,fechaFinal);
            fechasRiego.push(diaRiego);
        }

        console.log(fechasRiego);

        let cantidadDias = fechasRiego.length;

        for(var j=0;j<cantidadDias;j++){
            for(var k =0;k<longitud;k++){
                let medicionesDia = this.medicionCruzada[k]['medicionesComponenteAntes'];
                let tamanio = (medicionesDia['lista_mediciones_detalle']).length;
                for(var z=0;z<tamanio;z++){
                    let tipo  = medicionesDia['lista_mediciones_detalle'][z]['tipo_medicion'];
                    
                    let valor = medicionesDia['lista_mediciones_detalle'][z]['valor'];
                    
                    let medic = new Mediciones(tipo,valor);
                    medicionesDiaTipoValor.push(medic);
                    console.log(medicionesDiaTipoValor); 
                }
            }
        }
        

    }
    */

    obtenerMedicionesDespues(){
        let longitud = Object.keys(this.medicionCruzada).length;
        console.log("longitud: "+longitud);
        
        //COLUMNA MEDICIONES DESPUES
            for(var i=0;i<longitud;i++){
                let medicionActual= (this.medicionCruzada[i]['medicionesComponenteDespues'])
                if(medicionActual==""){
                    let medicionTamanio = [];
                    let tipo = 'Sin establecer';
                    let valor = 'Sin establecer';
                    let mediciones = new Mediciones(tipo,valor);
                    /*let mediciones1 = new Mediciones(tipo,valor);
                    let mediciones2 = new Mediciones(tipo,valor);
                    let mediciones3 = new Mediciones(tipo,valor);
                    let mediciones4 = new Mediciones(tipo,valor);*/

                    this.medicionesComponenteDespues.push(mediciones);
                    /*this.medicionesComponenteDespues.push(mediciones1);
                    this.medicionesComponenteDespues.push(mediciones2);
                    this.medicionesComponenteDespues.push(mediciones3);
                    this.medicionesComponenteDespues.push(mediciones4);*/

                }
                else{
                    let tamanio = (medicionActual['lista_mediciones_detalle']).length 
                    let medicionTamanio = [];
                    for(var j=0;j<tamanio;j++){
                        let tipo = medicionActual['lista_mediciones_detalle'][j]['tipo_medicion'];
                        let valor = medicionActual['lista_mediciones_detalle'][j]['valor'];
                        let mediciones = new Mediciones(tipo,valor);    
                        this.medicionesComponenteDespues.push(mediciones);
                    }
                    
                    //this.medicionesComponenteDespues.push(medicionTamanio);
                }
                
        }
        console.log(this.medicionesComponenteDespues);



    }

    obtenerMedicionesAntes(){
        let longitud = Object.keys(this.medicionCruzada).length;
        console.log("longitud: "+longitud);
        
        //COLUMNA MEDICIONES ANTES
            for(var i=0;i<longitud;i++){
                let medicionActual= (this.medicionCruzada[i]['medicionesComponenteAntes']);
                
                if(medicionActual==""){
                    let medicionTamanio = [];
                    let tipo = 'Sin establecer';
                    let valor = 'Sin establecer';
                    let mediciones = new Mediciones(tipo,valor);
                    /*let mediciones1 = new Mediciones(tipo,valor);
                    let mediciones2 = new Mediciones(tipo,valor);
                    let mediciones3 = new Mediciones(tipo,valor);
                    let mediciones4 = new Mediciones(tipo,valor);*/

                    this.medicionesComponenteAntes.push(mediciones);
                    /*this.medicionesComponenteAntes.push(mediciones1);
                    this.medicionesComponenteAntes.push(mediciones2);
                    this.medicionesComponenteAntes.push(mediciones3);
                    this.medicionesComponenteAntes.push(mediciones4);*/

                }
                else{
                    let tamanio = (medicionActual['lista_mediciones_detalle']).length 
                    let medicionTamanio = [];
                    for(var j=0;j<tamanio;j++){
                        let tipo = medicionActual['lista_mediciones_detalle'][j]['tipo_medicion'];
                        let valor = medicionActual['lista_mediciones_detalle'][j]['valor'];
                        let mediciones = new Mediciones(tipo,valor);    
                        this.medicionesComponenteAntes.push(mediciones);
                    }
                    
                    //this.medicionesComponenteDespues.push(medicionTamanio);
                }
                
        }
        console.log(this.medicionesComponenteAntes);


    }

    
    obtenerMedicionesClimaticas(){
        let longitud = Object.keys(this.medicionCruzada).length;
        console.log("longitud: "+longitud);
        
        //COLUMNA MEDICIONES ANTES
            for(var i=0;i<longitud;i++){
                let medicionActual= (this.medicionCruzada[i]['ultima_medicion_climatica'])
                if(medicionActual==""){
                    let medicionTamanio = [];
                    let tipo = 'Sin establecer';
                    let valor = 'Sin establecer';
                    let mediciones = new Mediciones(tipo,valor);
                    /*let mediciones1 = new Mediciones(tipo,valor);
                    let mediciones2 = new Mediciones(tipo,valor);
                    let mediciones3 = new Mediciones(tipo,valor);
                    let mediciones4 = new Mediciones(tipo,valor);*/

                    this.medicionesClimaticas.push(mediciones);
                    /*this.medicionesClimaticas.push(mediciones1);
                    this.medicionesClimaticas.push(mediciones2);
                    this.medicionesClimaticas.push(mediciones3);
                    this.medicionesClimaticas.push(mediciones4);*/

                }
                else{
                    let tamanio = (medicionActual['mediciones_detalles']).length 
                    let medicionTamanio = [];
                    for(var j=0;j<tamanio;j++){
                        let tipo = medicionActual['mediciones_detalles'][j]['tipoMedicionClimatica'];
                        let valor = medicionActual['mediciones_detalles'][j]['valor'];
                        let mediciones = new Mediciones(tipo,valor);    
                        this.medicionesClimaticas.push(mediciones);
                    }
                    
                    //this.medicionesComponenteDespues.push(medicionTamanio);
                }
                
        }
        console.log(this.medicionesClimaticas);


    }

    apretarSalir(){
        this.router.navigate(['/homeReportes/']);
    }

}


export class diasRiego{
    fechaHoraInicio:string;
    fechaHoraFinal:string;

    constructor(fechaHoraInicio,fechaHoraFinal){
        this.fechaHoraInicio=fechaHoraInicio;
        this.fechaHoraFinal=fechaHoraFinal;
    }
}

export class Mediciones{
    tipo:string;
    valor:number;

    constructor(tipo,valor){
        this.tipo=tipo;
        this.valor=valor;
    }
}