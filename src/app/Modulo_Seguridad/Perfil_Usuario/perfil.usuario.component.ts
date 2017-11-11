import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../../app.service';
import { MdDialog } from '@angular/material';
import { ComponentDialogComponent } from '../../pages/component-dialog/component-dialog.component';
import { ComponentTooltipComponent } from '../../../app/pages/component-tooltip/component-tooltip.component';
import { DialogExampleComponent } from '../../../app/shared/dialog/dialog-example/dialog-example.component';
import { PerfilUsuarioService, Usuario } from './perfil.usuario.service';
import { ModificarUsuarioService } from '../CU_Modificar_Usuario/modificar.usuario.service';
import { FinalizarSesionService } from '../CU_Finalizar_Sesion/finalizar.sesion.service';
import { ErroresSistema } from '../../Datos_Sistema/errores.sistema';

@Component({
    selector: 'app-perfil-usuario',
    templateUrl: './perfil.usuario.component.html',
    styleUrls: ['./perfil.usuario.component.css']

})

export class PerfilUsuarioComponent implements OnInit {

    erroresSistema = new ErroresSistema();

    position = 'above';
    errorMessage: string = "";
    usuarioActual: Usuario;
    perfilUsuarioSeleccionado: Boolean;

    //ATRIBUTOS MODIFICAR USUARIO
    tooltipEditarUsuario = 'Editar Usuario.';

    //ATRIBUTOS ELIMINAR USUARIO
    selectedOption: string;
    tooltipEliminarUsuario = 'Eliminar Usuario.';

    //ATRIBUTOS MODIFICAR CONTRASEÑA
    tooltipCambiarContrasenia = 'Cambiar Contraseña.';


    constructor(private router: Router,
        private perfilUsuarioService: PerfilUsuarioService,
        private modificarUsuarioService: ModificarUsuarioService,
        private finalizarSesionService: FinalizarSesionService,
        private appService: AppService,
        private dialog: MdDialog) {
        appService.getState().topnavTitle = 'Perfil Usuario';
    }

    ngOnInit() {

        this.perfilUsuarioService.obtenerUsuarioActual()
            .then(
                response => {
                    this.perfilUsuarioSeleccionado = true;
                    this.usuarioActual = response.datos_operacion;
                }
            )
            .catch(
                error => {
                    if (error.error_description == this.erroresSistema.getInicioSesion()) {
                        this.router.navigate(['/login/']);
                    }
                    else{
                        this.perfilUsuarioSeleccionado = false;
                        this.errorMessage = error.error_description;
                    }

                }
            );
    }

    getPerfilSeleccionado() {
        return this.perfilUsuarioSeleccionado;
    }

    apretarEliminarIcono() {
        this.openDialog();
    }

    openDialog() {
        let dialogRef = this.dialog.open(DialogExampleComponent);
        dialogRef.componentInstance.title = "Eliminar Usuario";
        dialogRef.componentInstance.description = "¿Desea eliminar al usuario?";
        dialogRef.componentInstance.option1 = "Aceptar";
        dialogRef.componentInstance.option2 = "Cancelar";
        dialogRef.afterClosed().subscribe(
            result => {
                this.selectedOption = result;
                if (this.selectedOption === "Aceptar") {
                    this.modificarUsuarioService.eliminarUsuario()
                        .then(
                            response => {
                                this.router.navigate(['/login/']);
                            }
                        )
                        .catch(
                            error => {
                                if (error.error_description == this.erroresSistema.getInicioSesion()) {
                                    this.router.navigate(['/login/']);
                                }
                                else{
                                    this.errorMessage = error.error_description;
                                }
                            }
                        );
                }
            });
    }
}
