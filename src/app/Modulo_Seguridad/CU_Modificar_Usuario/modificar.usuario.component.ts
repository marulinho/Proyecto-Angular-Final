import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModificarUsuarioService, Usuario} from './modificar.usuario.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../../app.service';
import { MdDialog } from '@angular/material';
import { DialogExampleComponent } from '../../shared/dialog/dialog-example/dialog-example.component';



@Component({
    selector:'app-modificar-usuario',
    templateUrl: './modificar.usuario.component.html',
    styleUrls:['./modificar.usuario.component.css']
    
})

export class ModificarUsuarioComponent implements OnInit{
    
    //ATRIBUTOS PERFIL USUARIO
    perfilUsuarioSeleccionado:Boolean;
    usuarioActual: Usuario;

    //ATRIBUTOS MODIFICAR USUARIO
    errorMessage:string="";
    editarUsuarioSeleccionado:Boolean;
    cambiarContrasenia:Boolean;

    nombre:string;
    apellido:string;
    dni:number;
    cuit:number;
    direccion:string;
    fechaNacimiento;
    email:string;
    usuario:string;
    password1:string;
    password2:string;

    //ATRIBUTOS ELIMINAR USUARIO
    selectedOption: string;
    
    
    constructor(private router:Router,
                private modificarUsuarioService:ModificarUsuarioService,
                private appService:AppService,
                private dialog: MdDialog){
    appService.getState().topnavTitle = 'Perfil Usuario';
                    
        
        
    }

    ngOnInit(){
        this.perfilUsuarioSeleccionado=true;
        this.editarUsuarioSeleccionado=false;
        this.cambiarContrasenia=false;
        this.modificarUsuarioService.obtenerUsuarioActual()
        .then(
            response => {
                this.usuarioActual = response
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
        console.log("apretamos editar");
        this.perfilUsuarioSeleccionado=false;
        console.log("perfil: "+ this.perfilUsuarioSeleccionado);
        this.editarUsuarioSeleccionado=true;
                                                    
        
    }

    getEditarUsuario(){
        return this.editarUsuarioSeleccionado;
    }


    apretarModificarUsuario(){
        console.log("apretamos modificarUsuario");
        this.modificarUsuarioService.modificarUsuario(this.usuario,this.nombre,this.apellido,this.direccion,
        this.fechaNacimiento,this.email,this.dni,this.cuit)
        .then(
            response=>{
            console.log("modificacion exitosa");
            this.usuarioActual=response;
            this.perfilUsuarioSeleccionado=true;
            this.editarUsuarioSeleccionado=false;
            this.router.navigate(['/perfilUsuario/']);
            
            }
        )
        .catch(
            error=>{
                this.errorMessage=error.error_description;
            }
        );
    }
    
    apretarSalir(){
        this.perfilUsuarioSeleccionado=true;
        this.editarUsuarioSeleccionado=false;
        this.errorMessage=""
        this.router.navigate(['/perfilUsuario/']);
      }

    //TERMINA MODIFICAR USUARIO

    //EMPEZAR ELIMINAR USUARIO
    
    apretarEliminarIcono(){
        console.log("apretar eliminar");
        this.modificarUsuarioService.eliminarUsuario()
        .then(
            response=>{
                console.log("eliminacion exitosa");
                this.router.navigate(['/login/']);
            }
        )
        .catch(
            error=>{
                this.errorMessage=error.error_description;
            }
        );
        
    }

    openDialog() {
        let dialogRef = this.dialog.open(DialogExampleComponent);
        dialogRef.afterClosed().subscribe(result => {
          this.selectedOption = result;
        });
      }


    apretarCambiarContrasenia(){
        this.editarUsuarioSeleccionado=false;
        this.cambiarContrasenia=true;
    }

    apretarCancelarContrasenia(){
        console.log("apretamos cancelar modificar contrasenia");
        this.router.navigate(['/perfilUsuario/']);
    }
    apretarModificarContrasenia(passVieja:string,pass1:string,pass2:string){
        console.log("apretamos modificar contrasenia");
        if(pass1==pass2){
            this.modificarUsuarioService.modificarContrasenia(passVieja,pass1);
        }            
        else{
            console.log("las contrasenias no coinciden");
        }                        
    }
    apretarAceptarCambiarContrasenia(){
        this.router.navigate(['/login/']);
    }

    apretarModificarUsuarioModal(){
        this.router.navigate(['/homeFinca/']);
    }
    


}
