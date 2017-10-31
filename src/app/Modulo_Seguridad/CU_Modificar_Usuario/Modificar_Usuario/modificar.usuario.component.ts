import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdDialog } from '@angular/material';
import { ComponentDialogComponent } from '../../../pages/component-dialog/component-dialog.component';
import { ComponentTooltipComponent } from '../../../../app/pages/component-tooltip/component-tooltip.component';
import { DialogExampleComponent } from '../../../../app/shared/dialog/dialog-example/dialog-example.component';
import { AppService } from '../../../app.service';
import { ModificarUsuarioService} from '../modificar.usuario.service';
import { PerfilUsuarioService, Usuario } from '../../Perfil_Usuario/perfil.usuario.service';
import { ErroresSistema } from '../../../Datos_Sistema/errores.sistema';

@Component({
    selector:'app-modificar-usuario',
    templateUrl: './modificar.usuario.component.html',
    styleUrls:['./modificar.usuario.component.css']
    
})

export class ModificarUsuarioComponent implements OnInit{
    
    erroresSistema = new ErroresSistema();

    position = 'above';
    errorMessage:string="";
    usuarioActual:Usuario;
    editarUsuarioSeleccionado:Boolean;
    tooltipEditarUsuario='Editar Usuario';
    nombre:string;
    apellido:string;
    dni:number;
    cuit:string;
    domicilio:string;
    fechaNacimiento;
    email:string;


    constructor(private router:Router,
                private modificarUsuarioService:ModificarUsuarioService,
                private perfilUsuarioService:PerfilUsuarioService,
                private appService:AppService,
                private dialog: MdDialog){
    appService.getState().topnavTitle = 'Modificar Usuario.';
        
    }

    ngOnInit(){
        this.perfilUsuarioService.obtenerUsuarioActual()
            .then(
                response => {
                    this.usuarioActual = response.datos_operacion;
                    this.nombre=this.usuarioActual['nombre'];
                    this.apellido=this.usuarioActual['apellido'];
                    this.cuit=this.usuarioActual['cuit'];
                    this.dni=this.usuarioActual['dni'];
                    this.email=this.usuarioActual['email'];
                    this.domicilio=this.usuarioActual['domicilio'];

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


    apretarModificarUsuario(){

        if((this.nombre=="" || this.nombre==null),
           (this.apellido=="" || this.apellido==null),
           (this.email=="" || this.email==null)){
                this.errorMessage="Debe completar todos los campos obligatorios (*).";
        }
        else{

            //VERIFICACION FECHA DE NACIMIENTO
            if(this.fechaNacimiento==null || this.fechaNacimiento==""){
                this.fechaNacimiento=this.usuarioActual['fechaNacimiento'];            
            }

            //VERIFICACION DNI
            if(this.dni==null){
                this.dni=this.usuarioActual['dni'];     
            }

            //VERIFICACION CUIT
            if(this.cuit==null){
                this.cuit=this.usuarioActual['cuit'];     
            }

            //VERIFICACION DOMICILIO
            if(this.domicilio=="" || this.domicilio==null){
                this.domicilio=this.usuarioActual['domicilio'];   
            }
        
            this.modificarUsuarioService.modificarUsuario(this.nombre,this.apellido,this.domicilio,
                this.fechaNacimiento,this.email,this.dni,this.cuit)
                .then(
                    response=>{
                    this.errorMessage="";
                    this.router.navigate(['/perfilUsuario/']);
                    
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

    }
    
    apretarSalir(){
        this.router.navigate(['/perfilUsuario/']);
        
      }    
}
