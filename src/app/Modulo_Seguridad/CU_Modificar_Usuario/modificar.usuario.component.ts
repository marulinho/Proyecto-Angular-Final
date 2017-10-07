import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModificarUsuarioService, Usuario} from './modificar.usuario.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../../app.service';
import { MdDialog } from '@angular/material';
import { ComponentDialogComponent } from '../../pages/component-dialog/component-dialog.component';
import { ComponentTooltipComponent } from '../../../app/pages/component-tooltip/component-tooltip.component';
import { DialogExampleComponent } from '../../../app/shared/dialog/dialog-example/dialog-example.component';


@Component({
    selector:'app-modificar-usuario',
    templateUrl: './modificar.usuario.component.html',
    styleUrls:['./modificar.usuario.component.css']
    
})

export class ModificarUsuarioComponent implements OnInit{
    
    //ATRIBUTOS GENERALES
    position = 'above';
    errorMessage:string="";
    

    //ATRIBUTOS PERFIL USUARIO
    perfilUsuarioSeleccionado:Boolean;
    usuarioActual:Usuario;

    //ATRIBUTOS MODIFICAR USUARIO
    editarUsuarioSeleccionado:Boolean;
    tooltipEditarUsuario='Editar Usuario';
    nombre:string;
    apellido:string;
    dni:number;
    cuit:number;
    domicilio:string;
    fechaNacimiento;
    email:string;
    usuario:string;
    

    //ATRIBUTOS ELIMINAR USUARIO
    selectedOption: string;
    tooltipEliminarUsuario='Eliminar Usuario';

    //ATRIBUTOS MODIFICAR CONTRASEÑA
    tooltipCambiarContrasenia='Cambiar Contraseña';
    cambiarContraseniaSeleccionado:boolean;
    passwordVieja:string;
    password1:string;
    password2:string;


    constructor(private router:Router,
                private modificarUsuarioService:ModificarUsuarioService,
                private appService:AppService,
                private dialog: MdDialog){
    appService.getState().topnavTitle = 'Perfil Usuario';
                    
        
        
    }

    ngOnInit(){
        this.editarUsuarioSeleccionado=false;
        this.cambiarContraseniaSeleccionado=false;
        this.modificarUsuarioService.obtenerUsuarioActual()
            .then(
                response => {
                    this.usuarioActual = response.datos_operacion;
                    this.perfilUsuarioSeleccionado=true;   
                }
            )
            .catch(
                error => {
                    this.errorMessage = error.error_description;
                    
                }
            );
    }

    //EMPIEZA PERFIL USUARIO

    getPerfilSeleccionado(){
        return this.perfilUsuarioSeleccionado;
    }

    //TERMINA PERFIL USUARIO

    //EMPIEZA EDITAR USUARIO

    apretarEditarIcono(){
        this.cambiarContraseniaSeleccionado=false;
        this.perfilUsuarioSeleccionado=false;
        this.editarUsuarioSeleccionado=true;
                                                 
    }

    getEditarUsuario(){
        return this.editarUsuarioSeleccionado;
    }


    apretarModificarUsuario(){
        let usuarioModificado;
        let nombreModificado;
        let apellidoModificado;
        let emailModificado;
        let fechaNacimientoModificado;
        let dniModificado;
        let cuitModificado;
        let domicilioModificado;

        if((this.usuario=="" || this.usuario==null),
           (this.nombre=="" || this.nombre==null),
           (this.apellido=="" || this.apellido==null),
           (this.email=="" || this.email==null)){
                this.errorMessage="Debe completar todos los campos obligatorios.";

        }
        else{

            //LA PARTE DE LOS CAMPOS OBLIGATORIOS ESTA AL PEDO PORQUE SIEMPRE HAY QUE LLENARLOS
            //VERIFICACION USUARIO
            if(this.usuario=="" || this.usuario==null){
                usuarioModificado=this.usuarioActual['usuario'];            
            }
            else{
                usuarioModificado=this.usuario;                        
            }

            //VERIFICACION NOMBRE
            if(this.nombre=="" || this.nombre==null){
                nombreModificado=this.usuarioActual['nombre'];            
            }
            else{
                nombreModificado=this.nombre; 
            }

            //VERIFICACION APELLIDO
            if(this.apellido=="" || this.apellido==null){
                apellidoModificado=this.usuarioActual['apellido'];     
            }
            else{
                apellidoModificado=this.apellido;
            }

            //VERIFICACION EMAIL
            if(this.email=="" || this.email==null){
                emailModificado=this.usuarioActual['email'];    
            }
            else{
                emailModificado=this.email;
            }

            //VERIFICACION FECHA DE NACIMIENTO
            if(this.fechaNacimiento==null){
                fechaNacimientoModificado=this.usuarioActual['fechaNacimiento'];            
            }
            else{
                fechaNacimientoModificado=this.fechaNacimiento;
            }

            //VERIFICACION DNI
            if(this.dni==null){
                dniModificado=this.usuarioActual['dni'];     
            }
            else{
                dniModificado=this.dni;
            }

            //VERIFICACION CUIT
            if(this.cuit==null){
                cuitModificado=this.usuarioActual['cuit'];     
            }
            else{
                cuitModificado=this.cuit;
            }

            //VERIFICACION DOMICILIO
            if(this.domicilio=="" || this.domicilio==null){
                domicilioModificado=this.usuarioActual['domicilio'];   
            }
            else{
                domicilioModificado=this.domicilio
            }
        
            this.modificarUsuarioService.modificarUsuario(usuarioModificado,nombreModificado,apellidoModificado,domicilioModificado,
                fechaNacimientoModificado,emailModificado,dniModificado,cuitModificado)
                .then(
                    response=>{
                    //this.cambiarContraseniaSeleccionado=false;
                    //this.editarUsuarioSeleccionado=false;
                    this.errorMessage="";
                    //this.perfilUsuarioSeleccionado=true;
                    this.router.navigate(['/dashboard/']);
                    
                    }
                )
                .catch(
                    error=>{
                        this.errorMessage=error.error_description;
                    }
                );

        }



        
    }
    
    apretarSalir(){
        this.editarUsuarioSeleccionado=false;
        this.cambiarContraseniaSeleccionado=false;
        this.errorMessage="";
        this.perfilUsuarioSeleccionado=true;
        
      }

    //TERMINA MODIFICAR USUARIO

    //EMPEZAR ELIMINAR USUARIO
    
    apretarEliminarIcono(){
        this.openDialog();
        
    }

    openDialog(){
        let dialogRef = this.dialog.open(DialogExampleComponent);
        dialogRef.componentInstance.title="Eliminar Usuario";
        dialogRef.componentInstance.description="¿Desea eliminar al usuario?";
        dialogRef.componentInstance.option1="Aceptar";
        dialogRef.componentInstance.option2="Cancelar";
        dialogRef.afterClosed().subscribe(
            result => {
                        this.selectedOption = result;
                        if(this.selectedOption==="Aceptar"){
                            this.apretarAceptarEliminarUsuario();
                        }
            });
    }

    apretarAceptarEliminarUsuario(){
        this.modificarUsuarioService.eliminarUsuario()
        .then(
            response=>{
                this.perfilUsuarioSeleccionado=false;
                this.errorMessage="";
                this.router.navigate(['/login/']);
            }
        )
        .catch(
            error=>{
                this.errorMessage=error.error_description;
            }
        );
    }

    //EMPIEZA CAMBIAR CONTRASEÑA

    apretarCambiarIcono(){
        this.editarUsuarioSeleccionado=false;
        this.perfilUsuarioSeleccionado=false;
        this.cambiarContraseniaSeleccionado=true;
    }

    getCambiarContrasenia(){
        return this.cambiarContraseniaSeleccionado;
    }

    apretarModificarContrasenia(){
        if( this.password1=="" || this.password1==null || 
            this.password2=="" || this.password2==null ||
            this.passwordVieja=="" || this.passwordVieja==null){
                
                this.errorMessage="Debe completar todos los campos."
        }
        else{
            if(this.password1!=this.password2){
                this.errorMessage="Las contraseñas no coinciden."
            }
            else{
                if(this.passwordVieja==this.password1){
                    this.errorMessage="La nueva contraseña no puede ser igual a la anterior."
                }
                else{
                    this.modificarUsuarioService.modificarContrasenia(this.passwordVieja,this.password1)
                        .then(
                            response=>{
                                this.errorMessage="";
                                //TENGO QUE AGREGAR QUE PRIMERO CIERRE SESION
                                this.router.navigate(['/login/']);
                                
                            }
                        )
                        .catch(
                            error=>{
                                this.errorMessage=error.error_description;
                            }
                        );
                }
                
            }
        }
    }

    
}
