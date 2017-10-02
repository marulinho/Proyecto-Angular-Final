import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {RegistrarUsuarioService, RespuestaRegistrar} from './registrar.usuario.service'

@Component({
    selector:'app-registrar',
    templateUrl: './registrar.usuario.component.html',
    styleUrls:['./registrar.usuario.component.css']
    
})

export class RegistrarUsuarioComponent implements OnInit{
    
    usuarioRegistrado: RespuestaRegistrar;
    
    constructor(private router:Router,
                private registrarUsuarioService:RegistrarUsuarioService){

    }

    ngOnInit(){

    }
    
    apretarRegistrar(nombre:string,apellido:string,dni:number,cuit:number,
        fechaNac:string,direc:string, email:string, usuario:string,pass1:string,pass2:string){
        console.log("apretamos Registrar");
        if(pass1==pass2){
            this.registrarUsuarioService.registrarUsuario(nombre,apellido,dni,cuit,fechaNac,direc,email,usuario,pass1)
            .then(
                registrar => this.usuarioRegistrado=registrar
            );
        }
        //this.router.navigate(['/login']);
        
    }

    apretarCancelar(){
        console.log("estamos aca");
        this.router.navigate(['/']);
    }

    apretarRegistrarAceptar(){
        this.router.navigate(['/login/']);
        
    }

     
}



