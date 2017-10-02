import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModificarUsuarioService, Usuario} from './modificar.usuario.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { CerrarSesionService } from '../CU_Cerrar_Sesion/cerrar.sesion.service';

@Component({
    selector:'app-modificar-usuario',
    templateUrl: './modificar.usuario.component.html',
    styleUrls:['./modificar.usuario.component.css']
    
})

export class ModificarUsuarioComponent implements OnInit{
    
    //ATRIBUTOS PERFIL USUARIO
    perfilUsuarioSeleccionado:Boolean;

    //ATRIBUTOS MODIFICAR USUARIO
    errorMessage:string="";
    editarUsuarioSeleccionado:Boolean;
    cambiarContrasenia:Boolean;
    usuarioActual: Usuario;

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
    
    constructor(private router:Router,
                private modificarUsuarioService:ModificarUsuarioService){
        
        
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
        
        /*this.modificarUsuarioService.modificarUsuario(this.usuario,this.nombre,this.apellido,this.direccion,
                                                      this.fechaNacimiento,this.email,this.dni,this.cuit)
        .then(
            response=>{
                console.log("modificacion exitosa");
                this.usuarioActual=response;
            }
        )
          */                                              
        
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
            this.router.navigate(['/home/']);
            this.perfilUsuarioSeleccionado=true;
            this.editarUsuarioSeleccionado=false;
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
        this.errorMessage="";
      }


    apretarModificar(usuario:string,nombre:string,apellido:string,domicilio:string,
        fechaNac:string,email:string,dni:number,cuit:number){
        console.log("estamos aca");
        if(usuario==''){
            console.log("el usuario es null");
            usuario=this.usuarioActual.usuario;
        }
        if(email==''){
            console.log("el email es null");
            email=this.usuarioActual.email;
        }
        if(nombre==''){
            console.log("el nombre es null");
            nombre=this.usuarioActual.nombre;
        }
        if(apellido==''){
            console.log("el apellido es null");
            apellido=this.usuarioActual.apellido;
        }
        if(domicilio==''){
            console.log("el domicilio es null");
            domicilio='';
        }
        if(fechaNac==''){
            console.log("la fechaNac es null");
            fechaNac='';
        }
        //tengo que verificar si el campo del dni y cuit es null
        
        
        this.modificarUsuarioService.modificarUsuario(usuario,nombre,apellido,domicilio,fechaNac,email,dni,cuit)
        .then(
            response=>this.editarUsuarioSeleccionado=false
        );
        
    }
    
    apretarCancelarModificacion(){
        this.editarUsuarioSeleccionado=false;
        this.cambiarContrasenia=false;
    }


    //TERMINA MODIFICAR USUARIO

    apretarEliminar(){
        this.modificarUsuarioService.eliminarUsuario()
        .then(
            response=>this.router.navigate(['/'])
        );
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
