import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecuperarCuentaService, Cuenta,ResultadoRecuperacion } from './recuperar.cuenta.service'

@Component({
    selector:'app-recuperar',
    templateUrl: './recuperar.cuenta.component.html',
    styleUrls:['./recuperar.cuenta.component.css']
    
})

export class RecuperarCuentaComponent implements OnInit{
    divPrimero:Boolean;
    divSegundo:Boolean;
    cuenta:Cuenta;
    resultadoRecuperacion:ResultadoRecuperacion;
    constructor(private router:Router,
                private recuperarCuentaService:RecuperarCuentaService){

    }

    ngOnInit(){
        this.divPrimero=true;
        this.divSegundo=false;

    }

    apretarAceptarDivPrimero(email:string){
        this.recuperarCuentaService.recuperarCuenta(email)
        .then(
            response=>this.cuenta=response
        );
        this.divPrimero=false;
        this.divSegundo=true;
    }

    apretarCancelarDivPrimero(){
        this.router.navigate(['/']);
    }
  

    apretarReestablecerContrasenia(codigo:string,pass1:string,pass2:string){
        if(codigo!=""){
            console.log("codigo correcto");
            if(pass1==pass2){
                console.log("los pass son iguales");
                this.recuperarCuentaService.cambiarContraseniaRecuperarCuenta(this.cuenta.usuario,codigo,pass1)
                .then(
                    response=>this.resultadoRecuperacion=response
                );
                
            }
            else{
                console.log("los pass son distintos");
            }
        }
        
        this.divPrimero=false;
        this.divSegundo=false;
    }
    apretarCancelarContrasenia(){
        this.router.navigate(['/login/']);
    }

    apretarAceptarCambiarContraseniaModal(){
        this.router.navigate(['/login/']);
    }
}