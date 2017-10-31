import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DialogExampleComponent } from '../../shared/dialog/dialog-example/dialog-example.component';
import { MdDialog } from '@angular/material';
import { AppService } from '../../app.service';
import { HomeFincaService, Finca } from '../../Modulo_Configuracion_Finca/Home_Finca/home.finca.service';
import { GestionarSectorFincaService, Sector } from '../../Modulo_Configuracion_Sectores/CU_Gestionar_Sector/gestionar.sector.service';
import { HomeFincaDetalleService, Permisos } from '../../Modulo_Configuracion_Finca/Home_Finca_Detalle/home.finca.detalle.service';
import { ErroresSistema } from '../../Datos_Sistema/errores.sistema';
import { PermisosSistema } from '../../Datos_Sistema/permisos.sistema';

@Component({
    selector: 'home-reporte',
    templateUrl: './home.reporte.component.html',
    styleUrls: ['./home.reporte.component.css']

})

export class HomeReporteComponent implements OnInit {

    erroresSistema = new ErroresSistema();

    errorMessageReporte = "";
    fincasUsuario = [];
    fincasHabilitadas = [];
    fincasHabilitadasSeleccionado:Boolean;
    fincaSeleccionada:number;
    sectores:Sector;
    sectorSeleccionado:number;
    sectoresSeleccionado:Boolean;
    reporteSeleccionado: string;    
    nombresReportes = [
        { nombre: 'Informe Estado Actual Sector.', id: 0 },
        { nombre: 'Informe Riego en Ejecución.', id: 1 },
        { nombre: 'Informe Estado Histórico Sector.', id: 2 },
        { nombre: 'Informe Riego Histórico Sector.', id: 3 },
        { nombre: 'Informe Heladas Histórico.', id: 4 },
        { nombre: 'Informe Eventos Personalizados.', id: 5 },
        { nombre: 'Informe Cruzado Riego-Medición.', id: 6 }

    ];
    descripcionesReportes = [
        "Mediante este reporte se puede observar el estado actual del sector, incluyendo las mediciones a las  que se encuentra sometido el mismo.",
        "Mediante este reporte se puede observar los datos relativos al riego en ejecución de un determinado sector.",
        "Mediante este reporte se puede observar el estado histórico del sector, incluyendo entre otras cosas las condifuraciones de riego históricas.",
        "Mediante este reporte se puede observar los datos históricos relativos al riego en un determinado sector.",
        "Mediante este reporte se puede observar las heladas históricas que se han producido en el sector.",
        "Mediante este reporte se puede observar los eventos personalizados que se han cumplido para un determinado sector.",
        "Mediante este reporte se puede observar las ejecuciones de riego y las mediciones llevadas a cabo por los sensores de un determinado sector."
    ];


    constructor(private router: Router,
        private route: ActivatedRoute,
        private appService: AppService,
        private homeFincaService: HomeFincaService,
        private gestionarSectorFincaService:GestionarSectorFincaService,
        private homeFincaDetalleService:HomeFincaDetalleService,
        private dialog: MdDialog) {
        appService.getState().topnavTitle = "Home Reportes.";
    }

    ngOnInit() {
        this.homeFincaService.obtenerFincasUsuario()
            .then(
                response => {
                    if (response.detalle_operacion == "No hay datos") {
                        this.errorMessageReporte = "No hay fincas asociadas al usuario.";
                    }
                    else {
                        this.fincasUsuario = response.datos_operacion;
                        this.obtenerFincasHabilitadas();
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

    getFincasHabilitadas(){
        return this.fincasHabilitadasSeleccionado;
    }

    getSectorSeleccionado(){
        return this.sectoresSeleccionado;
    }

    obtenerFincasHabilitadas() {
        let fincas = this.fincasUsuario;
        let longitud = Object.keys(fincas).length;
        console.log("logitud " + longitud);

        for (var i = 0; i < longitud; i++) {
            let estadoActual = fincas[i]['estadoFinca'];
            let ubicacion = [];

            if (estadoActual == "habilitado") {
                ubicacion = fincas[i]['ubicacion'].split(";");
                fincas[i]['ubicacion'] = ubicacion;
                this.fincasHabilitadas.push(fincas[i]);
            }

            //HABILITACION DE LA TABLA FINCAS ENCARGADO
            if (this.fincasHabilitadas.length == 0) {
                this.errorMessageReporte = "No existen fincas habilitadas para el usuario.";
            }
            else {
                this.fincasHabilitadasSeleccionado = true;
            }

        }
    }

    seleccionarFinca(){
        this.homeFincaDetalleService.devolverPermisos(this.fincaSeleccionada)
            .then(
                response=>{
                    if(response.detalle_operacion=="No hay datos"){
                        this.errorMessageReporte="No se han podido obtener los reportes disponibles para la finca, intente de nuevo.";
                    }
                    else{
                        let permisos = new PermisosSistema(response.datos_operacion);
                    }
                }
            )
            .catch(
                error=>{
                    if(this.erroresSistema.getInicioSesion()){
                        this.router.navigate(['/login/']);
                    }
                    else{
                        this.errorMessageReporte=error.error_description;
                    }
                }
            );
        
        this.gestionarSectorFincaService.buscarSectoresFinca(this.fincaSeleccionada)
            .then(
                response=>{
                    if(response.detalle_operacion=="No hay datos"){
                        this.errorMessageReporte="No hay sectores asociadas a las fincas.";
                    }
                    else{
                        this.errorMessageReporte="";
                        this.sectores=response.datos_operacion;
                        this.sectoresSeleccionado=true;
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
    getSectoresSeleccionados(){
        return this.sectoresSeleccionado;
    }

    apretarBuscarReporte(){
        localStorage.setItem('idFinca',JSON.stringify(this.fincaSeleccionada));
        localStorage.setItem('idSector',JSON.stringify(this.sectorSeleccionado));
        let nombre=this.nombresReportes.find(x => x.id == parseInt(this.reporteSeleccionado))['nombre'];
        localStorage.setItem('nombreReporte',JSON.stringify(nombre));
        localStorage.setItem('descripcionReporte',JSON.stringify(this.descripcionesReportes[this.reporteSeleccionado]));

        if(this.reporteSeleccionado=='0'){
            this.router.navigate(['/reporteEstadoActualSector/']);
        }
        if(this.reporteSeleccionado=='1'){
            this.router.navigate(['/reporteRiegoEjecucion/']);
        }
        if(this.reporteSeleccionado=='2'){
            this.router.navigate(['/reporteEstadoHistoricoSector/']);
        }
        if(this.reporteSeleccionado=='3'){
            this.router.navigate(['/reporteRiegoHistoricoSector/']);
        }
        if(this.reporteSeleccionado=='4'){
            this.router.navigate(['/reporteHistoricoHeladas/']);
        }
        if(this.reporteSeleccionado=='5'){
            this.router.navigate(['/reporteEventosPersonalizados/']);
        }
        if(this.reporteSeleccionado=='6'){
            this.router.navigate(['/reporteCruzado/']);
        }
    }    
}