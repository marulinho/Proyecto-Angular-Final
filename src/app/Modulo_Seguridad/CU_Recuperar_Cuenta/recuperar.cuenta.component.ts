import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecuperarCuentaService,ResultadoRecuperacion } from './recuperar.cuenta.service'

@Component({
    selector:'app-recuperar',
    templateUrl: './recuperar.cuenta.component.html',
    styleUrls:['./recuperar.cuenta.component.css']
    
})

export class RecuperarCuentaComponent implements OnInit{

    constructor(private router:Router,
                private recuperarCuentaService:RecuperarCuentaService){

    }

    ngOnInit(){}

    
}