import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HomeFincaService, Finca, FincaUsuario } from './home.finca.service';

@Component({
    selector:'homeFinca',
    templateUrl: './home.finca.component.html',
    styleUrls:['./home.finca.component.css']
    
})

export class HomeFincaComponent implements OnInit{
    errorMessage:string;
    fincasPendientes:Finca[];
    fincasPendienteSeleccionado:Boolean;
    fincasUsuario:FincaUsuario[];
    fincasUsuarioSeleccionado:Boolean;
    fincasEncargado:Finca[];
    fincasEncargadoSeleccionado:Boolean;
    rolesFincaUsuario:string[];
    Roles;
    constructor(private router:Router,
                private homeFincaService:HomeFincaService){

    }

    ngOnInit(){
        this.fincasEncargadoSeleccionado=false;
        this.fincasPendienteSeleccionado=false;
        this.fincasUsuarioSeleccionado=false;
        this.homeFincaService.obtenerFincasEncargado()
            .then(
                response=>{
                    this.fincasEncargado=response;
                    if(this.fincasEncargado.length==0){
                        this.errorMessage="No existen fincas asociadas al usuario con el rol especificado.";
                    }
                    else{
                        this.fincasEncargadoSeleccionado=true;
                    }
                }
            )
            .catch(
                error=>{
                    this.errorMessage=error.error_description;
                }
            );
        
       
        this.homeFincaService.obtenerFincasPendientes()
            .then(
                response=>{
                    this.fincasPendientes=response;
                        if(this.fincasPendientes.length==0){
                            this.errorMessage="No existen fincas asociadas al usuario con el rol especificado.";
                        }
                        else{
                            this.fincasPendienteSeleccionado=true;
                        }
                    }
                )
            .catch(
                error=>{
                    this.errorMessage=error.error_description;
                }
            );

            //hay que terminarlo
        this.homeFincaService.obtenerFincasUsuario()
            .then(
                    response=>{
                        this.fincasUsuario=response;
                        this.fincasUsuarioSeleccionado=true;
                    }
                )
                             
        
    }

    getFincasEncargado(){
        return this.fincasEncargadoSeleccionado;
    }

    getFincasPendientes(){
        return this.fincasPendienteSeleccionado;
    }
    getFincasUsuario(){
        return this.fincasUsuarioSeleccionado;
    }

    obtenerRoles(arr){
        /*let rolesUsuario:string[];
        for(let i=0;i<this.fincasUsuario.length;i++){
            rolesUsuario.push(this.fincasUsuario[i].nombreRol);
            for(let j=1;j<this.fincasUsuario.length;j++){
                if(rolesUsuario[i]==this.fincasUsuario[j].nombreRol){

                }
                else{
                    rolesUsuario.push(this.fincasUsuario[j].nombreRol);
                }
            }
        }
        console.log(rolesUsuario);
    */
    }
}
