import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../../../app.service';
import { ModificarUsuarioService } from '../modificar.usuario.service';
import { FinalizarSesionService } from '../../CU_Finalizar_Sesion/finalizar.sesion.service';
import { ErroresSistema } from '../../../Datos_Sistema/errores.sistema';

@Component({
    selector: 'app-modificar-contrasenia',
    templateUrl: './modificar.contrasenia.compontent.html',
    styleUrls: ['./modificar.contrasenia.component.css']

})

export class ModificarContraseniaComponent implements OnInit {

    erroresSistema = new ErroresSistema();

    errorMessage: string = "";
    passwordVieja: string;
    password1: string;
    password2: string;

    constructor(private router: Router,
        private modificarUsuarioService: ModificarUsuarioService,
        private finalizarSesisonService:FinalizarSesionService,
        private appService: AppService) {
        appService.getState().topnavTitle = 'Modificar Contraseña.';
    }

    ngOnInit() { }

    apretarModificarContrasenia() {
        if (this.password1 == "" || this.password1 == null ||
            this.password2 == "" || this.password2 == null ||
            this.passwordVieja == "" || this.passwordVieja == null) {
                this.errorMessage = "Debe completar todos los campos obligatorios (*)."
        }
        else {
            if (this.password1 != this.password2) {
                this.errorMessage = "Las contraseñas no coinciden."
            }
            else {
                if (this.passwordVieja == this.password1) {
                    this.errorMessage = "La nueva contraseña no puede ser igual a la anterior."
                }
                else {
                    this.modificarUsuarioService.modificarContrasenia(this.passwordVieja, this.password1)
                        .then(
                            response => {
                                this.errorMessage = "";
                                this.finalizarSesisonService.cerrarSesion()
                                    .then(
                                        response=>{
                                            this.router.navigate(['/login/']);
                                        }
                                    )
                                    .catch(
                                        error=>{
                                            if (error.error_description == this.erroresSistema.getInicioSesion()) {
                                                this.router.navigate(['/login/']);
                                            }
                                            else{
                                                this.errorMessage=error.error_description;
                                            }
                                        }
                                    );
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
            }
        }
    }

    apretarSalir(){
        this.router.navigate(['/perfilUsuario/']);
    }
}
