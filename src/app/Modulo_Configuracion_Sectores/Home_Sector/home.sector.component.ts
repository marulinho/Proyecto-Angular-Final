import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DialogExampleComponent } from '../../shared/dialog/dialog-example/dialog-example.component';
import { MdDialog } from '@angular/material';
import { AppService } from '../../../app/app.service';
import { GestionarSectorFincaService, Sector } from '../CU_Gestionar_Sector/gestionar.sector.service';
import { AsignarMecanismoRiegoSectorService, MecanismoRiego } from '../CU_Asignar_Mecanismo_Riego_Sector/asignar.mecanismo.riego.sector.service';
import { GestionarCultivoSectorService, Cultivo } from '../../Modulo_Cultivo/CU_Gestionar_Cultivo_Sector/gestionar.cultivo.sector.service';
import { AsignarComponenteSensorSectorService, ComponenteSensor } from '../CU_Asignar_Componente_Sensor_Sector/asignar.componente.sensor.sector.service';
import { GestionarConfiguracionRiegoService, ConfiguracionRiego } from '../../Modulo_Configuracion_Riego/Gestionar_Configuracion_Riego/gestionar.configuracion.riego.service';
import { GestionarRiegoService, Riego } from '../../Modulo_Configuracion_Riego/Gestionar_Riego/gestionar.riego.service';
import { GestionarEventoPersonalizadoService, ConfiguracionEvento } from '../../Modulo_Reportes/Gestionar_Evento_Persinalizado/gestionar.evento.personalizado.service';
import { ErroresSistema } from '../../Datos_Sistema/errores.sistema';

@Component({
    selector: 'homeSectorFinca',
    templateUrl: './home.sector.component.html',
    styleUrls: ['./home.sector.component.css']

})

export class HomeSectorComponent implements OnInit {

    erroresSistema = new ErroresSistema();
    configiruacionRiego;
    fechaFinRiego;
    //ATRIBUTOS HOME SECTOR
        idFinca: number=JSON.parse(localStorage.getItem('idFinca'));
        idSector: number=JSON.parse(localStorage.getItem('idSector'));
        sector: Sector;
        errorMessageHomeSector = "";
        sectorSeleccionado: Boolean;
        tooltipEditarSector = 'Editar Sector.';
        tooltipEliminarSector = 'Eliminar Sector.';
        position = 'above';
        selectedOption: string;
        permisosGestionarSector = JSON.parse(localStorage.getItem('puedeGestionarSector'));
        tooltipAtras='Volver HomeFincaDetalle.';

    //ATRIBUTOS MECANISMO RIEGO SECTOR
        errorMessageMecanismoSector = "";
        mecanismoSeleccionado: Boolean;
        tooltipAgregarMecanismoSector = 'Asignar Mecanismo.';
        tooltipDeshabilitarMecanismoSector = 'Deshabilitar Mecanismo.';
        mecanismoRiego: MecanismoRiego;
        mecanismoHabilitado: boolean;
        idMecanismoRiegoFincaSector: number;
        permisosAsignarMecanismoSector = JSON.parse(localStorage.getItem('puedeAsignarMecRiegoASector'));

    //ATRIBUTOS CULTIVO SECTOR
        errorMessageCultivoSector = "";
        cultivosSector: Cultivo;
        tooltipAsignarCultivoSector = 'Asignar Cultivo.';
        tooltipDeshabilitarCultivoSector = 'Deshabilitar Cultivo.';
        tooltipModificarCultivoSector = 'Modificar Cultivo.';
        cultivoSectorSeleccionado: Boolean;
        cultivoExistente: Boolean;
        permisosGestionarCultivoSector=JSON.parse(localStorage.getItem('puedeGestionarCultivoSector'));
        permisosAsignarCultivo=JSON.parse(localStorage.getItem('puedeAsignarCultivo'));

    //ATRIBUTOS COMPONENTE SENSOR SECTOR
        errorMessageComponenteSector = "";
        componenteSensor: ComponenteSensor;
        componenteSensorSeleccionado: Boolean;
        componenteSensorExistente: Boolean;
        tooltipAsignarComponenteSector = 'Asignar Componente.';
        tooltipDeshabilitarComponenteSector = 'Deshabilitar Componente.';
        permisosAsignarComponenteSensor=JSON.parse(localStorage.getItem('puedeAsignarComponenteSensor'));

    //ATRIBUTOS CONFIGURACION DE RIEGO
        errorMessageConfiguracionRiego = "";
        configuracionRiegoSeleccionado: Boolean;
        tooltipCrearConfiguracionRiego = 'Crear Configuración.';
        tooltipVerConfiguracionRiego = 'Ver Configuración.';
        tooltipHabilitarConfiguracionRiego = 'Habilitar Configuración.';
        configuracionesRiego: ConfiguracionRiego;
        permisoCrearConfiguracionRiego=JSON.parse(localStorage.getItem('puedeCrearConfiguracionRiego'));
        permisoModificarConfiguracionRiego=JSON.parse(localStorage.getItem('puedeModificarConfiguracionRiego'));

    //ATRIBUTOS RIEGO
        errorMessageRiego = "";
        riegoSeleccionado: Boolean;
        tooltipIniciarRiego = 'Iniciar Riego.';
        tooltipPausarRiego = 'Pausar Riego.';
        tooltipCancelarRiego = 'Cancelar Riego.';
        riegos: Riego;
        existeRiego: Boolean;
        permisoIniciarODetenerRiegoManualmente=JSON.parse(localStorage.getItem('puedeIniciarODetenerRiegoManualmente'));

    //ATRIBUTOS EVENTO PERSONALIZADO
        idUsuarioFinca: number = JSON.parse(localStorage.getItem("idUsuarioFinca"));
        errorMessageEventoPersonalizado = "";
        eventoPersonalizadoSeleccionado: Boolean;
        tooltipCrearEvento = 'Crear Evento.';
        tooltipEditarEvento = 'Editar Evento.';
        tooltipHabilitarEvento = 'Habilitar Evento.';
        tooltipDeshabilitarEvento = 'Deshabilitar Evento.';
        eventosPersonalizados: ConfiguracionEvento;
        permisoGestionarEventoPersonalizado = JSON.parse(localStorage.getItem('puedeGestionarEventoPersonalizado'));


    constructor(private router: Router,
        private route: ActivatedRoute,
        private gestionarSectorFincaService: GestionarSectorFincaService,
        private asignarMecanismoRiegoSectorService: AsignarMecanismoRiegoSectorService,
        private gestionarCultivoSectorService: GestionarCultivoSectorService,
        private asignarComponenteSensorSectorService: AsignarComponenteSensorSectorService,
        private gestionarConfiguracionRiegoService: GestionarConfiguracionRiegoService,
        private gestionarRiegoService: GestionarRiegoService,
        private gestionarEventoPersonalizadoService: GestionarEventoPersonalizadoService,
        private appService: AppService,
        private dialog: MdDialog) {

        appService.getState().topnavTitle = "Home Sector";

    }

    ngOnInit() {
        this.gestionarSectorFincaService.buscarSectorId(this.idSector,this.idFinca)
            .then(
                response => {
                    this.sector = response.datos_operacion;
                    this.sectorSeleccionado = true;
                }
            )
            .catch(
                error => {
                    if (error.error_description == this.erroresSistema.getInicioSesion()) {
                        this.router.navigate(['/login/']);
                    }
                    else {
                        this.errorMessageHomeSector = error.error_description;
                    }
                }
            );
        this.asignarMecanismoRiegoSectorService.mostrarMecanismos(this.idSector)
            .then(
            response => {
                if (response.detalle_operacion == "No hay datos") {
                    this.errorMessageMecanismoSector = "No hay mecanismos de riego asociados al sector.";
                    this.mecanismoHabilitado = false;
                    this.errorMessageConfiguracionRiego = "Debe asignar un mecanismo de riego al sector.";
                    this.errorMessageRiego = "Debe asignar un mecanismo de riego al sector.";
                }
                else {
                    this.mecanismoRiego = response.datos_operacion;
                    if (this.mecanismoRiego['mecanismoRiegoFinca'] != null) {
                        this.mecanismoHabilitado = true;
                        this.idMecanismoRiegoFincaSector = this.mecanismoRiego['idMecanismoRiegoFincaSector'];
                        localStorage.setItem('idMecanismoRiegoFincaSector',JSON.stringify(this.idMecanismoRiegoFincaSector));
                        this.buscarConfiguracionesRiego();
                        this.buscarRiegoEnEjecucion();
                    }
                    else {
                        this.mecanismoHabilitado = false;
                        this.riegoSeleccionado = false;
                        this.configuracionRiegoSeleccionado = false;
                        this.errorMessageConfiguracionRiego = "Debe asignar un mecanismo de riego al sector.";
                        this.errorMessageRiego = "Debe asignar un mecanismo de riego al sector.";
                    }

                    this.mecanismoSeleccionado = true;
                }
            }
            )
            .catch(
            error => {
                if (error.error_description == this.erroresSistema.getInicioSesion()) {
                    this.router.navigate(['/login/']);
                }
                else {
                    this.errorMessageMecanismoSector = error.error_description;
                }
            }
            );

        this.gestionarCultivoSectorService.mostrarCultivoSector(this.idSector,this.idFinca)
            .then(
            response => {
                if (response.detalle_operacion == "No hay datos") {
                    this.errorMessageCultivoSector = "No hay cultivos asociados al sector.";
                    this.cultivoExistente = false;
                }
                else {
                    this.cultivosSector = response.datos_operacion;
                    this.cultivoSectorSeleccionado = true;
                    this.cultivoExistente = true;
                }
            }
            )
            .catch(
            error => {
                if (error.error_description == this.erroresSistema.getInicioSesion()) {
                    this.router.navigate(['/login/']);
                }
                else {
                    this.errorMessageCultivoSector = error.error_description;
                }
            }
            );

        this.asignarComponenteSensorSectorService.buscarComponenteSector(this.idSector)
            .then(
            response => {
                if (response.detalle_operacion == "No hay datos") {
                    this.errorMessageComponenteSector = "No hay ningún componente sensor asignado al sector.";
                    this.componenteSensorExistente = false;
                }
                else {
                    this.componenteSensor = response.datos_operacion;
                    this.componenteSensorSeleccionado = true;
                    this.componenteSensorExistente = true;
                }
            }
            )
            .catch(
            error => {
                if (error.error_description == this.erroresSistema.getInicioSesion()) {
                    this.router.navigate(['/login/']);
                }
                else {
                    this.errorMessageComponenteSector = error.error_description;
                }
            }
            );
        this.gestionarEventoPersonalizadoService.buscarConfiguracionesEventosPersonalizadosSector(this.idUsuarioFinca, this.idFinca, this.idSector)
            .then(
            response => {
                if (response.detalle_operacion == "No hay datos") {
                    this.errorMessageEventoPersonalizado = "No hay eventos personalizados asociados al sector.";
                }
                else {
                    this.eventosPersonalizados = response.datos_operacion['dto_evento_lista'];
                    this.eventoPersonalizadoSeleccionado = true;
                }
            }
            )
            .catch(
            error => {
                if (error.error_description == this.erroresSistema.getInicioSesion()) {
                    this.router.navigate(['/login/']);
                }
                else {
                    this.errorMessageEventoPersonalizado = error.error_description;
                }
            }
            );
    }

    buscarConfiguracionesRiego() {
        this.gestionarConfiguracionRiegoService.obtenerConfiguracionesRiegoFincaMecanismoSector(this.idFinca, this.idMecanismoRiegoFincaSector)
            .then(
            response => {
                if (response.detalle_operacion == "No hay datos") {
                    this.errorMessageConfiguracionRiego = "No hay configuraciones de riego asociadas al sector.";
                }
                else {
                    this.configuracionesRiego = response.datos_operacion;
                    this.configuracionRiegoSeleccionado = true;
                }
            }
            )
            .catch(
            error => {
                if (error.error_description == this.erroresSistema.getInicioSesion()) {
                    this.router.navigate(['/login/']);
                }
                else {
                    this.errorMessageConfiguracionRiego = error.error_description;
                }
            }
            );
    }

    buscarRiegoEnEjecucion() {
        this.gestionarRiegoService.obtenerRiegoEnEjecucion(this.idFinca, this.idMecanismoRiegoFincaSector)
            .then(
            response => {
                if (response.detalle_operacion == "No hay riego activo") {
                    this.errorMessageRiego = "No hay riegos en ejecución asociados al sector.";
                    this.existeRiego = false;
                    this.riegoSeleccionado = false;
                }
                else {
                    this.riegos = response.datos_operacion;
                    this.configiruacionRiego = this.riegos['configuracion_riego'];
                    
                    if(this.configiruacionRiego=="" || this.configiruacionRiego==null){
                        this.configiruacionRiego="Manual.";
                    }
                    this.fechaFinRiego = this.riegos['fechaHoraFinalProgramada'];
                    if(this.fechaFinRiego=="" || this.fechaFinRiego==null){
                        this.fechaFinRiego="No se ha determinado.";
                    }
                    
                    this.existeRiego = true;
                    this.riegoSeleccionado = true;
                }
            }
            )
            .catch(
            error => {
                if (error.error_description == this.erroresSistema.getInicioSesion()) {
                    this.router.navigate(['/login/']);
                }
                else {
                    this.errorMessageRiego = error.error_description;
                }
            }
            );
    }

    getPermisosGestionarSector() {
        return this.permisosGestionarSector;
    }

    getPermisosAsignarMecanismoSector() {
        return this.permisosAsignarMecanismoSector;
    }

    getPermisosGestionarCultivoSector(){
        return this.permisosGestionarCultivoSector;
    }

    getPermisosAsignarCultivo(){
        return this.permisosAsignarCultivo;
    }

    getPermisosAsignarComponenteSensor(){
        return this.permisosAsignarComponenteSensor;
    }

    getPermisoCrearConfiguracionRiego(){
        return this.permisoCrearConfiguracionRiego;
    }
    
    getPermisoIniciarODetenerRiegoManualmente(){
        return this.permisoIniciarODetenerRiegoManualmente;
    }

    getPermisoGestionarEventoPersonalizado(){
        return this.permisoGestionarEventoPersonalizado;
    }

    getPermisoModificarConfiguracionRiego(){
        return this.permisoModificarConfiguracionRiego;
    }
    getSectorSeleccionado() {
        return this.sectorSeleccionado;
    }

    getMecanismoSeleccionado() {
        return this.mecanismoSeleccionado;
    }

    getMecanismoHabilitado() {
        return this.mecanismoHabilitado;
    }

    getCultivoSectorSeleccionado() {
        return this.cultivoSectorSeleccionado;
    }

    getCultivoExistente() {
        return this.cultivoExistente;
    }

    getComponenteSensorSeleccionado() {
        return this.componenteSensorSeleccionado;
    }

    getComponenteSensorExistente() {
        return this.componenteSensorExistente;
    }

    getConfiguracionRiegoSeleccionado() {
        return this.configuracionRiegoSeleccionado;
    }

    getRiegoSeleccionado() {
        return this.riegoSeleccionado;
    }

    getExisteRiegoEnEjecucion() {
        return this.existeRiego;
    }

    getEventoPersonalizadoSeleccionado() {
        return this.eventoPersonalizadoSeleccionado;
    }

    apretarEliminarIcono() {
        let title = "Eliminar Sector";
        let description = "¿Desea eliminar el sector de la finca?";
        let option1 = "Aceptar";
        let option2 = "Cancelar";
        this.openDialogEliminarSectorFinca(title, description, option1, option2);
    }

    openDialogEliminarSectorFinca(title: string, description: string, option1: string, option2: string) {
        let dialogRef = this.dialog.open(DialogExampleComponent);
        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.description = description;
        dialogRef.componentInstance.option1 = option1;
        dialogRef.componentInstance.option2 = option2;
        dialogRef.afterClosed().subscribe(
            result => {
                this.selectedOption = result;
                if (this.selectedOption === "Aceptar") {
                    this.gestionarSectorFincaService.eliminarSectorFinca(this.idSector, this.idFinca)
                        .then(
                        response => {
                            this.router.navigate(['/homeFinca/']);
                        }
                        )
                        .catch(
                        error => {
                            if (error.error_description == this.erroresSistema.getInicioSesion()) {
                                this.router.navigate(['/login/']);
                            }
                            else {
                                this.errorMessageHomeSector = error.error_description;
                            }
                        }
                        )
                }
            });
    }

    apretarSalir() {
        this.router.navigate(['/homeSector/' + this.idSector]);
    }


    apretarHabilitarConfiguracionRiego(idConfiguracionRiego: number) {
        this.gestionarConfiguracionRiegoService.cambiarEstadoConfiguracionRiego(this.idFinca, this.idMecanismoRiegoFincaSector, idConfiguracionRiego)
            .then(
            response => {
                this.refresh();
            }
            )
            .catch(
            error => {
                if (error.error_description == this.erroresSistema.getInicioSesion()) {
                    this.router.navigate(['/login/']);
                }
                else {
                    this.errorMessageConfiguracionRiego = error.error_description;
                }
            }
            );
    }

    apretarIniciarRiego() {
        this.gestionarRiegoService.iniciarRiegoManualmente(this.idFinca, this.idMecanismoRiegoFincaSector)
            .then(
            response => {
                this.refresh();
            }
            )
            .catch(
            error => {
                if (error.error_description == this.erroresSistema.getInicioSesion()) {
                    this.router.navigate(['/login/']);
                }
                else {
                    this.errorMessageRiego = error.error_description;
                }
            }
            );
    }

    apretarPausarRiego() {
        this.gestionarRiegoService.pausarRiegoManualmente(this.idFinca, this.idMecanismoRiegoFincaSector)
            .then(
            response => {
                this.refresh();
            }
            )
            .catch(
            error => {
                if (error.error_description == this.erroresSistema.getInicioSesion()) {
                    this.router.navigate(['/login/']);
                }
                else {
                    this.errorMessageRiego = error.error_description;
                }
            }
            );
    }

    apretarCancelarRiego() {
        this.gestionarRiegoService.cancelarRiegoManualmente(this.idFinca, this.idMecanismoRiegoFincaSector)
            .then(
            response => {
                this.refresh();
            }
            )
            .catch(
            error => {
                if (error.error_description == this.erroresSistema.getInicioSesion()) {
                    this.router.navigate(['/login/']);
                }
                else {
                    this.errorMessageRiego = error.error_description;
                }
            }
            );
    }

    apretarHabilitarEvento(idConfiguracionEvento: number) {
        this.gestionarEventoPersonalizadoService.activarConfiguracionEventoPersonalizado(idConfiguracionEvento, this.idFinca)
            .then(
            response => {
                this.refresh();
            }
            )
            .catch(
            error => {
                this.errorMessageEventoPersonalizado = error.error_description;
            }
            );
    }

    apretarModificarEvento(idConfiguracionEvento: number) {
        localStorage.setItem('idConfiguracionEvento', JSON.stringify(idConfiguracionEvento));
        this.router.navigate(['/gestionarEventoPersonalizado/']);

    }

    apretarDeshabilitarEvento(idConfiguracionEvento: number) {
        let title = "Deshabilitar Evento.";
        let description = "¿Desea deshabilitar el evento del sector?";
        let option1 = "Aceptar";
        let option2 = "Cancelar";
        this.openDialogDeshabilitarEvento(title, description, option1, option2, idConfiguracionEvento);
    }

    openDialogDeshabilitarEvento(title: string, description: string, option1: string, option2: string, idConfiguracionEvento: number) {
        let dialogRef = this.dialog.open(DialogExampleComponent);
        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.description = description;
        dialogRef.componentInstance.option1 = option1;
        dialogRef.componentInstance.option2 = option2;
        dialogRef.afterClosed().subscribe(
            result => {
                this.selectedOption = result;
                if (this.selectedOption === "Aceptar") {
                    this.gestionarEventoPersonalizadoService.desactivarConfiguracionEventoPersonalizado(idConfiguracionEvento, this.idFinca)
                        .then(
                        response => {
                            this.refresh();
                        }
                        )
                        .catch(
                        error => {
                            if (error.error_description == this.erroresSistema.getInicioSesion()) {
                                this.router.navigate(['/login/']);
                            }
                            else {
                                this.errorMessageEventoPersonalizado = error.error_description;
                            }
                        }
                        )
                }
            });
    }

    apretarEditarCultivo(idCultivo:number){
        localStorage.setItem('idCultivo',JSON.stringify(idCultivo));
        
        this.router.navigate(['/gestionarCultivoSector/']);
    }

    apretarHomeConfiguracionRiego(idConfiguracionRiego:number){
        localStorage.setItem('idConfiguracionRiego',JSON.stringify(idConfiguracionRiego));
        this.router.navigate(['/homeConfiguracionRiego/']);
    }
    
    refresh(): void {
        window.location.reload();
    }

    apretarAtras(){
        this.router.navigate(['/homeFincaDetalle/']);
    }

    apretarDeshabilitarMecanismoIcono(idMecanismo: number) {
        let title = "Deshabilitar Mecanismo Riego."
        let description = "¿Desea deshabilitar el Mecanismo de Riego?";
        let option1="Aceptar";
        let option2="Cancelar";
        this.idMecanismoRiegoFincaSector = idMecanismo;
        this.openDialogDeshabilitarMecanismo(title,description,option1,option2);
        
    }

    openDialogDeshabilitarMecanismo(title,description,option1,option2){
        let dialogRef = this.dialog.open(DialogExampleComponent);
        dialogRef.componentInstance.title=title;
        dialogRef.componentInstance.description=description;
        dialogRef.componentInstance.option1=option1;
        dialogRef.componentInstance.option2=option2;
        dialogRef.afterClosed().subscribe(
            result => {
                        this.selectedOption = result;
                        if(this.selectedOption==="Aceptar"){
                            this.asignarMecanismoRiegoSectorService.deshabilitarMecanismoSector(this.idMecanismoRiegoFincaSector, this.idFinca)
                            .then(
                            response => {
                                this.refresh();
                            }
                            )
                            .catch(
                            error => {
                                if (error.error_description == this.erroresSistema.getInicioSesion()) {
                                    this.router.navigate(['/login/']);
                                }
                                else {
                                    this.errorMessageMecanismoSector = error.error_description;
                                }
                            }
                            );
                        }
            });
    }

    apretarDeshabilitarCultivo(idCultivo: number) {
        let title = "Deshabilitar Cultivo.";
        let description = "¿Desea deshabilitar el cultivo del sector?";
        let option1 = "Aceptar";
        let option2 = "Cancelar";
        this.openDialogDeshabilitarCultivo(title, description, option1, option2, idCultivo);
    }

    openDialogDeshabilitarCultivo(title,description,option1,option2, idCultivo){
        let dialogRef = this.dialog.open(DialogExampleComponent);
        dialogRef.componentInstance.title=title;
        dialogRef.componentInstance.description=description;
        dialogRef.componentInstance.option1=option1;
        dialogRef.componentInstance.option2=option2;
        dialogRef.afterClosed().subscribe(
            result => {
                        this.selectedOption = result;
                        if(this.selectedOption==="Aceptar"){
                            this.gestionarCultivoSectorService.deshabilitarCultivoSector(idCultivo, this.idFinca)
                            .then(
                            response => {
                                this.refresh();
                            }
                            )
                            .catch(
                            error => {
                                if (error.error_description == this.erroresSistema.getInicioSesion()) {
                                    this.router.navigate(['/login/']);
                                }
                                else {
                                    this.errorMessageCultivoSector = error.error_description;
                                }
                            }
                            );
                        }
            });
    }

    apretarDeshabilitarComponenteSector(idComponenteSensor: number) {
        let title = "Deshabilitar Componente Sensor.";
        let description = "¿Desea deshabilitar el componente sensor del sector?";
        let option1 = "Aceptar";
        let option2 = "Cancelar";
        this.openDialogDeshabilitarCultivo(title, description, option1, option2, idComponenteSensor);
        
    }
    openDialogDeshabilitarComponenteSensor(title,description,option1,option2, idComponenteSensor){
        let dialogRef = this.dialog.open(DialogExampleComponent);
        dialogRef.componentInstance.title=title;
        dialogRef.componentInstance.description=description;
        dialogRef.componentInstance.option1=option1;
        dialogRef.componentInstance.option2=option2;
        dialogRef.afterClosed().subscribe(
            result => {
                        this.selectedOption = result;
                        if(this.selectedOption==="Aceptar"){
                            this.asignarComponenteSensorSectorService.desasignarComponenteSector(this.idFinca, idComponenteSensor, this.idSector)
                            .then(
                            response => {
                                this.refresh();
                            }
                            )
                            .catch(
                            error => {
                                if (error.error_description == this.erroresSistema.getInicioSesion()) {
                                    this.router.navigate(['/login/']);
                                }
                                else {
                                    this.errorMessageComponenteSector = error.error_description;
                                }
                            }
                            );
                        }
            });
    }

}
