import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {RegistrarUsuarioService, RespuestaRegistrar} from './registrar.usuario.service'

@Component({
    selector:'app-registrar',
    templateUrl: './registrar.usuario.component.html',
    styleUrls:['./registrar.usuario.component.css']
    
})

export class RegistrarUsuarioComponent implements OnInit{
    
       
    constructor(private router:Router,
                private registrarUsuarioService:RegistrarUsuarioService){

    }

    ngOnInit(){

    }
    
         
}



