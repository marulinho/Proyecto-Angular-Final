import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SolicitarCreacionFincaService, FincaCreada, ProveedorInformacion } from './solicitar.creacion.finca.service';
import { LoginComponent } from '../../Modulo_Seguridad/CU_Iniciar_Sesion/login.component';

@Component({
    selector:'app-solicitar.creacion.finca',
    templateUrl: './solicitar.creacion.finca.component.html',
    styleUrls:['./solicitar.creacion.finca.component.css']
    
})

export class SolicitarCreacionFincaComponent implements OnInit{
    
    errorMessage:string="";
    selectIndex: number = 0;   
    proveedoresInformacion = new Array;

    constructor(private router:Router,
                private solicitarCreacionFincaService:SolicitarCreacionFincaService){

    }

    ngOnInit(){
       this.solicitarCreacionFincaService.obtenerProveedores()
            .then(
                response=>{
                    console.log("response: "+response);
                    this.llenarProveedores(response);
                    //this.proveedoresInformacion=response.datos_operacion;
                    //console.log("proveedores: "+this.proveedoresInformacion);
                    //this.proveedoresInformacion=response;
                }
            )
            .catch(
                error=>{
                    this.errorMessage=error.error_description;
                }
            );
            //console.log("proveedores: "+this.proveedoresInformacion);
    }
    
    llenarProveedores(response){
        let longitud = Object.keys(response.datos_operacion).length;
        for(var i = 0; i<longitud; i++){
            let valor= response['datos_operacion'][i]['nombreProveedor'];
            this.proveedoresInformacion.push(valor);
        }
    }
    
/*    apretarCrearFinca(){
        console.log("apretamos crear finca");
        if(this.nombre=="" || this.direccion=="" || this.ubicacion=="" || this.tamanio==null){
            this.errorMessageCrearFinca="Debe completar todos los campos.";
        }
        else{
            this.solicitarCreacionFinca.solicitarCreacion(this.nombre,this.direccion,this.ubicacion,this.tamanio)
            .then(
                response=>{
                    this.fincaCreada=response;
                }
            )
            .catch(
                error=>{
                    this.errorMessageCrearFinca=error.error_description;
                }
            );
        }
    */
}
