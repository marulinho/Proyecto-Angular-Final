import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DialogExampleComponent } from '../../shared/dialog/dialog-example/dialog-example.component';
import { MdDialog } from '@angular/material';
import { AppService } from '../../app.service';
import { GestionarConfiguracionRiegoService, CriterioRiego } from '../Gestionar_Configuracion_Riego/gestionar.configuracion.riego.service';
import { ErroresSistema } from '../../Datos_Sistema/errores.sistema';

@Component({
    selector: 'home-configuracion-riego',
    templateUrl: './home.configuracion.riego.component.html',
    styleUrls: ['./home.configuracion.riego.component.css']

})

export class HomeConfiguracionRiegoComponent implements OnInit {

    erroresSistema = new ErroresSistema();
    permisoModificarConfiguracionRiego = JSON.parse(localStorage.getItem('puedeModificarConfiguracionRiego'));

    idFinca: number=JSON.parse(localStorage.getItem('idFinca'));
    idConfiguracionRiego: number= JSON.parse(localStorage.getItem('idConfiguracionRiego'));
    idMecanismoRiegoFincaSector: number = JSON.parse(localStorage.getItem('idMecanismoRiegoFincaSector'));
    idSector: number=JSON.parse(localStorage.getItem('idSector'));
    position = 'above';
    tooltipEditarConfiguracion = 'Editar Configuración.';
    tooltipEliminarConfiguracion = 'Eliminar Configuración.';
    tooltipCambiarEstadoConfiguracion = 'Cambiar Estado Configuración.';
    selectedOption: string;
    errorEliminarConfiguracionRiego = "";
    tooltipAtras = 'Volver HomeSector.';

    //CRITERIO INICIAL
    criterioInicialRiego: CriterioRiego;
    errorMessageCriterioInicialRiego = "";
    perfilCriterioInicialSeleccionado: Boolean;
    tooltipAgregarCriterioInicial = 'Agregar Criterio Inicial.';
    tooltipModificarCriterioInicial = 'Modificar Criterio Inicial.';
    tooltipEliminarCriterioInicial = 'Eliminar Criterio Inicial.';
    existeCriterioInicial: Boolean;
    tipoCriterioEncontrado: string;
    tipoCriterioInicio: string;
    operadorInicial;

    //CRITERIO FINAL
    criterioFinalRiego: CriterioRiego;
    errorMessageCriterioFinalRiego = "";
    perfilCriterioFinalSeleccionado: Boolean;
    tooltipAgregarCriterioFinal = 'Agregar Criterio Final.';
    tooltipModificarCriterioFinal = 'Modificar Criterio Final.';
    tooltipEliminarCriterioFinal = 'Eliminar Criterio Final.';
    tipoCriterioFinalEncontrado: string;
    existeCriterioFinal: Boolean;
    tipoCriterioFinal: string;
    operadorFinal;


    constructor(private router: Router,
        private route: ActivatedRoute,
        private gestionarConfiguracionRiegoService: GestionarConfiguracionRiegoService,
        private appService: AppService,
        private dialog: MdDialog) {

        appService.getState().topnavTitle = "Home Configuración Riego";

    }

    ngOnInit() {

        this.gestionarConfiguracionRiegoService.obtenerCriterioInicialRiegoFinca(this.idFinca, this.idMecanismoRiegoFincaSector, this.idConfiguracionRiego)
            .then(
                response => {
                    if (response.detalle_operacion == "No hay datos") {
                        this.errorMessageCriterioInicialRiego = "No hay criterios iniciales de riego asignados a la configuración de riego.";
                    }
                    else {
                        this.criterioInicialRiego = response.datos_operacion;
                        this.tipoCriterioEncontrado = this.criterioInicialRiego[0]['tipo_criterio_riego'];
                        if (this.tipoCriterioEncontrado == "criterio_riego_medicion") {
                            this.tipoCriterioInicio = this.tipoCriterioEncontrado;
                            this.tipoCriterioEncontrado = "Medición.";
                            this.operadorInicial = this.criterioInicialRiego[0]['operador'];
                            if (this.operadorInicial == "Menor o igual") {
                                this.operadorInicial = "<=";
                            }
                            else {
                                this.operadorInicial = ">=";
                            }
                        }
                        else {
                            if (this.tipoCriterioEncontrado == "criterio_riego_hora") {
                                this.tipoCriterioInicio = this.tipoCriterioEncontrado;
                                this.tipoCriterioEncontrado = "Hora.";
                            }
                            else {
                                this.tipoCriterioInicio = this.tipoCriterioEncontrado;
                                this.tipoCriterioEncontrado = "Por volumen de agua.";
                            }
                        }
                        localStorage.setItem('criterioInicial', JSON.stringify(this.tipoCriterioEncontrado));
                        this.existeCriterioInicial = true;
                        this.perfilCriterioInicialSeleccionado = true;
                    }
                }
            )
            .catch(
                error => {
                    if (error.error_description == this.erroresSistema.getInicioSesion()) {
                        this.router.navigate(['/login/']);
                    }
                    else {
                        this.errorMessageCriterioInicialRiego = error.error_description;
                    }
                }
            );

        this.gestionarConfiguracionRiegoService.obtenerCriterioFinalRiegoFinca(this.idFinca, this.idMecanismoRiegoFincaSector, this.idConfiguracionRiego)
            .then(
                response => {
                    if (response.detalle_operacion == "No hay datos") {
                        this.errorMessageCriterioFinalRiego = "No hay criterios finales de riego asignados a la configuración de riego.";
                    }
                    else {
                        this.criterioFinalRiego = response.datos_operacion;
                        this.tipoCriterioFinalEncontrado = this.criterioFinalRiego[0]['tipo_criterio_riego'];
                        if (this.tipoCriterioFinalEncontrado == "criterio_riego_medicion") {
                            this.tipoCriterioFinal = this.tipoCriterioFinalEncontrado;
                            this.tipoCriterioFinalEncontrado = "Medición.";
                            this.operadorFinal = this.criterioFinalRiego[0]['operador'];
                            if (this.operadorFinal == "Menor o igual") {
                                this.operadorFinal = "<=";
                            }
                            else {
                                this.operadorFinal = ">=";
                            }
                        }
                        else {
                            if (this.tipoCriterioFinalEncontrado == "criterio_riego_hora") {
                                this.tipoCriterioFinal = this.tipoCriterioFinalEncontrado;
                                this.tipoCriterioFinalEncontrado = "Hora.";
                            }
                            else {
                                this.tipoCriterioFinal = this.tipoCriterioFinalEncontrado;
                                this.tipoCriterioFinalEncontrado = "Por volumen de agua.";
                            }
                        }
                        this.perfilCriterioFinalSeleccionado = true;
                        this.existeCriterioFinal = true;
                    }
                }
            )
            .catch(
                error => {
                    if (error.error_description == this.erroresSistema.getInicioSesion()) {
                        this.router.navigate(['/login/']);
                    }
                    else {
                        this.errorMessageCriterioFinalRiego = error.error_description;
                    }
                }
            );
    }

    getPermisoModificarConfiguracionRiego(){
        return this.permisoModificarConfiguracionRiego;
    }

    getPerfilCriterioInicialSeleccionado() {
        return this.criterioInicialRiego;
    }

    getPerfilCriterioFinalSeleccionado() {
        return this.criterioFinalRiego;
    }

    getExisteCriterioInicial() {
        return this.existeCriterioInicial;
    }

    getExisteCriterioFinal() {
        return this.existeCriterioFinal;
    }

    apretarEliminarConfiguracion() {
        let title = "Eliminar Configuración de Riego";
        let description = "¿Desea eliminar la configuración de riego";
        let option1 = "Aceptar";
        let option2 = "Cancelar";
        this.openDialogEliminarConfiguracionRiego(title, description, option1, option2);
    }

    openDialogEliminarConfiguracionRiego(title: string, description: string, option1: string, option2: string) {
        let dialogRef = this.dialog.open(DialogExampleComponent);
        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.description = description;
        dialogRef.componentInstance.option1 = option1;
        dialogRef.componentInstance.option2 = option2;
        dialogRef.afterClosed().subscribe(
            result => {
                this.selectedOption = result;
                if (this.selectedOption === "Aceptar") {
                    this.gestionarConfiguracionRiegoService.eliminarConfiguracionRiego(this.idFinca, this.idMecanismoRiegoFincaSector, this.idConfiguracionRiego)
                        .then(
                        response => {
                            this.router.navigate(['/homeSector/']);
                        }
                        )
                        .catch(
                        error => {
                            if (error.error_description == this.erroresSistema.getInicioSesion()) {
                                this.router.navigate(['/login/']);
                            }
                            else {
                                this.errorEliminarConfiguracionRiego = error.error_description;
                            }
                        }
                        );
                }
            });
    }

    apretarCambiarEstadoConfiguracionRiego() {
        this.gestionarConfiguracionRiegoService.cambiarEstadoConfiguracionRiego(this.idFinca, this.idMecanismoRiegoFincaSector, this.idConfiguracionRiego)
            .then(
            response => {
                this.router.navigate(['/homeSector/']);
            }
            )
            .catch(
            error => {
                if (error.error_description == this.erroresSistema.getInicioSesion()) {
                    this.router.navigate(['/login/']);
                }
                else {
                    this.errorEliminarConfiguracionRiego = error.error_description;
                }
            }
            )
    }

    apretarEditarCriterioRiego(idCriterioRiego: number, tipoCriterioRiego: string) {
        localStorage.setItem('tipoCriterioRiego', JSON.stringify(tipoCriterioRiego));
        localStorage.setItem('idCriterioRiego', JSON.stringify(idCriterioRiego));
        this.router.navigate(['/gestionarCriterioRiego/']);
    }


    refresh(): void {
        window.location.reload();
    }

    apretarAtras(){
        this.router.navigate(['/homeSector/']);
    }

    apretarEliminarCriterioRiego(idCriterio: number, tipo: string) {
        let title = "Eliminar Criterio de Riego.";
        let description = "¿Desea eliminar el criterio?";
        let option1 = "Aceptar";
        let option2 = "Cancelar";
        this.openDialogEliminarCriterioRiego(title, description, option1, option2, idCriterio,tipo);

    }


    openDialogEliminarCriterioRiego(title,description,option1,option2, idCriterio,tipo){
        let dialogRef = this.dialog.open(DialogExampleComponent);
        dialogRef.componentInstance.title=title;
        dialogRef.componentInstance.description=description;
        dialogRef.componentInstance.option1=option1;
        dialogRef.componentInstance.option2=option2;
        dialogRef.afterClosed().subscribe(
            result => {
                        this.selectedOption = result;
                        if(this.selectedOption==="Aceptar"){
                            this.gestionarConfiguracionRiegoService.eliminarCriterioConfiguracionRiego(this.idFinca, this.idMecanismoRiegoFincaSector,
                                this.idConfiguracionRiego, idCriterio)
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
                                        if (tipo == "inicio") {
                                            this.errorMessageCriterioInicialRiego = error.error_description;
                                        }
                                        else {
                                            this.errorMessageCriterioFinalRiego = error.error_description;
                                        }
                                    }
                                }
                                );
                        }
            });
    }

}   
