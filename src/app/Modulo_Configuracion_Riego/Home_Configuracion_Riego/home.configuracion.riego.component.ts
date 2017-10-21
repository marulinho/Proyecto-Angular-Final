import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DialogExampleComponent } from '../../shared/dialog/dialog-example/dialog-example.component';
import { MdDialog } from '@angular/material';
import { AppService } from '../../app.service';
import { GestionarConfiguracionRiegoService, CriterioRiego } from '../Gestionar_Configuracion_Riego/gestionar.configuracion.riego.service';

@Component({
    selector: 'home-configuracion-riego',
    templateUrl: './home.configuracion.riego.component.html',
    styleUrls: ['./home.configuracion.riego.component.css']

})

export class HomeConfiguracionRiegoComponent implements OnInit {

    idFinca: number;
    idConfiguracionRiego: number;
    idMecanismoRiegoFincaSector: number;
    idSector:number;
    position = 'above';
    tooltipEditarConfiguracion = 'Editar Configuración';
    tooltipEliminarConfiguracion = 'Eliminar Configuración';
    tooltipCambiarEstadoConfiguracion ='Cambiar Estado Configuración';
    selectedOption:string;
    errorEliminarConfiguracionRiego="";

    //CRITERIO INICIAL
    criterioInicialRiego: CriterioRiego;
    errorMessageCriterioInicialRiego = "";
    perfilCriterioInicialSeleccionado: Boolean;
    tooltipAgregarCriterioInicial = 'Agregar Criterio Inicial';
    existeCriterioInicial: Boolean;

    //CRITERIO FINAL
    criterioFinalRiego: CriterioRiego;
    errorMessageCriterioFinalRiego = "";
    perfilCriterioFinalSeleccionado: Boolean;
    tooltipAgregarCriterioFinal = 'Agregar Criterio Final';


    constructor(private router: Router,
        private route: ActivatedRoute,
        private gestionarConfiguracionRiegoService: GestionarConfiguracionRiegoService,
        private appService: AppService,
        private dialog: MdDialog) {

        appService.getState().topnavTitle = "Home Configuración Riego";
        this.route.params.subscribe(params => {
            this.idMecanismoRiegoFincaSector = +params['idMecanismoRiegoFincaSector'];
            this.idFinca = +params['idFinca'];
            this.idConfiguracionRiego = +params['idConfiguracionRiego'];
            this.idSector = +params['idSector'];
            

        });

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
                    this.existeCriterioInicial = true;
                    this.perfilCriterioInicialSeleccionado = true;
                }
            }
            )
            .catch(
            error => {
                this.errorMessageCriterioInicialRiego = error.error_description;
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
                    if (this.existeCriterioInicial == true) {
                        this.perfilCriterioFinalSeleccionado = true;
                    }
                    else {
                        this.errorMessageCriterioFinalRiego = "No puede crear un criterio de finalizaci&oacute;n hasta que cree uno de inicio.";
                    }


                }
            }
            )
            .catch(
            error => {
                this.errorMessageCriterioFinalRiego = error.error_description;
            }
            );
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
                    this.gestionarConfiguracionRiegoService.eliminarConfiguracionRiego(this.idFinca,this.idMecanismoRiegoFincaSector,this.idConfiguracionRiego)
                        .then(
                            response => {
                                this.router.navigate(['/homeSector/'+this.idFinca+"/"+this.idSector]);
                            }
                        )
                        .catch(
                            error => {
                                this.errorEliminarConfiguracionRiego = error.error_description;
                            }
                        )
                }
            });
    }

    apretarCambiarEstadoConfiguracionRiego(){
        this.gestionarConfiguracionRiegoService.cambiarEstadoConfiguracionRiego(this.idFinca,this.idMecanismoRiegoFincaSector,this.idConfiguracionRiego)
            .then(
                response=>{
                    this.router.navigate(['/homeSector/'+this.idSector+"/"+this.idFinca]);
                }
            )
    }
}   
