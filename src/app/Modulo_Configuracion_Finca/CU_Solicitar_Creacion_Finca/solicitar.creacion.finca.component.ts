import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SolicitarCreacionFincaService, FincaCreada } from './solicitar.creacion.finca.service';
import { GestionarProveedorInformacionService, ProveedorInformacion } from '../../Modulo_Obtencion_Informacion_Externa/CU_Gestionar_Proveedor_Informacion/gestionar.proveedor.service';
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
    proveedor:string;
    nombre:string;
    direccion:string;
    ubicacion:string;
    tamanio:number;
    frecuencia:number;

    constructor(private router:Router,
                private solicitarCreacionFincaService:SolicitarCreacionFincaService){

    }

    ngOnInit(){
       this.solicitarCreacionFincaService.obtenerProveedores()
            .then(
                response=>{
                    this.llenarProveedores(response);
                }
            )
            .catch(
                error=>{
                    this.errorMessage=error.error_description;
                }
            );
    }
    
    llenarProveedores(response){
        let longitud = Object.keys(response.datos_operacion).length;
        for(var i = 0; i<longitud; i++){
            let valor= response['datos_operacion'][i]['nombreProveedor'];
            this.proveedoresInformacion.push(valor);
        }
    }
    
    apretarNextCrear(){
        if(this.selectIndex==0){
            if( this.nombre=="" || this.nombre==null ||
                this.direccion=="" || this.direccion==null ||
                this.ubicacion=="" || this.ubicacion==null ||
                this.tamanio==null){
                    this.errorMessage="Debe completar todos los campos obligatorios (*)";
                }
            else{
                this.errorMessage="";
                this.selectIndex +=1;
            } 
        }
        else{
            if(this.selectIndex==1){
                if( this.proveedor=="" || this.proveedor==null || this.frecuencia==null){
                    this.errorMessage="Debe completar todos los campos obligatorios (*).";
                }
                else{
                    this.errorMessage="";
                    this.selectIndex +=1;
                }
            }
        }
    }

    apretarSalir(){
        this.router.navigate(['/homeFinca/']);
    }

    apretarCrearFinca(){
        this.solicitarCreacionFincaService.solicitarCreacion(this.nombre,this.direccion,this.ubicacion,this.tamanio,this.frecuencia,this.proveedor)
            .then(
                response=>{
                    this.router.navigate(['/homeFinca/']);
                }
            )
            .catch(
                error=>{
                    this.errorMessage=error.error_description;
                }
            )
    }

}
