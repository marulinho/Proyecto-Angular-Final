import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HomeFincaService, Finca, FincaUsuario } from './home.finca.service';
import { SolicitarCreacionFincaService,FincaCreada,ProveedorInformacion } from '../CU_Solicitar_Creacion_Finca/solicitar.creacion.finca.service';
@Component({
    selector:'homeFinca',
    templateUrl: './home.finca.component.html',
    styleUrls:['./home.finca.component.css']
    
})

export class HomeFincaComponent implements OnInit{
    
    
    crearFincaSeleccionado:Boolean;

    //ATRIBUTOS LLAMADA FINCAS PENDIENTES
    fincasPendientes:Finca;
    fincasPendienteSeleccionado:Boolean;
    errorMessageFincasPendientes:string;

    //ATRIBUTOS LLAMADA FINCAS USUARIO
    fincasUsuario:FincaUsuario[];
    fincasUsuarioSeleccionado:Boolean;
    rolesFincaUsuario:string[];
    errorMessageFincasUsuario:string;

    //ATRIBUTOS LLAMADA FINCAS ENCARGADO
    fincasEncargado:Finca;
    fincasEncargadoSeleccionado:Boolean;
    errorMessageFincasEncargado:string;

    //ATRIBUTOS LLAMADA CREAR FINCA
    errorMessageCrearFinca:string;
    selectIndex: number = 0;
    nombre:string;
    direccion:string;
    ubicacion:string;
    tamanio:number;   
    fincaCreada : FincaCreada; 
    proveedor: string;
    proveedoresInformacion: ProveedorInformacion[];
    
    
    constructor(private router:Router,
                private homeFincaService:HomeFincaService,
                private solicitarCreacionFinca:SolicitarCreacionFincaService){

    }

    ngOnInit(){
        this.fincasEncargadoSeleccionado=false;
        this.fincasPendienteSeleccionado=false;
        this.fincasUsuarioSeleccionado=false;
        this.crearFincaSeleccionado=false;
        this.errorMessageFincasUsuario="";
        this.errorMessageCrearFinca="";
        this.errorMessageFincasPendientes="";
        this.errorMessageFincasUsuario="";

        this.homeFincaService.obtenerFincasEncargado()
            .then(
                response=>{
                    
                    if(response.detalle_operacion=="no_hay_datos"){
                        this.errorMessageFincasEncargado="No existen fincas asociadas al usuario con el rol especificado.";
                    }
                    else{
                        this.fincasEncargado=response.detalle_operacion;
                        this.fincasEncargadoSeleccionado=true;
                    }
                }
            )
            .catch(
                error=>{
                    this.errorMessageFincasEncargado=error.error_description;
                }
            );
        
       
        this.homeFincaService.obtenerFincasPendientes()
            .then(
                response=>{
                        if(response.detalle_operacion=="no_hay_datos"){
                            this.errorMessageFincasPendientes="No existen fincas asociadas al estado especificado.";
                        }
                        else{
                            this.fincasPendientes=response.detalle_operacion;
                            this.fincasPendienteSeleccionado=true;
                            
                        }
                    }
                )
            .catch(
                error=>{
                    this.errorMessageFincasPendientes=error.error_description;
                }
            );

            //hay que terminarlo
        this.homeFincaService.obtenerFincasUsuario()
            .then(
                    response=>{
                        this.fincasUsuario=response;
                        if(this.fincasUsuario.length==0){
                            this.errorMessageFincasUsuario="No existen fincas asociadas al usuario con el rol especificado.";
                        }
                        else{
                            this.fincasUsuarioSeleccionado=true
                        }
                    }
                )
            .catch(
                error=>{
                    this.errorMessageFincasUsuario=error.error_description;
                }
            );
              
        this.solicitarCreacionFinca.obtenerProveedores()
            .then(
                response=>{
                    this.proveedoresInformacion=response;
                }
            )
            .catch(
                error=>{
                    this.errorMessageCrearFinca=error.error_description;
                }
            );
        
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


    apretarNuevaIcono(){
        console.log("apretamos crear nueva finca");
        this.selectIndex=0;
        this.nombre="";
        this.direccion="";
        this.ubicacion="";
        this.tamanio=null;
        this.proveedor="";
        this.errorMessageCrearFinca="";
        this.crearFincaSeleccionado=true;
    }

    getCrearFinca(){
        return this.crearFincaSeleccionado;
    }


    apretarSalir(){
        this.crearFincaSeleccionado=false;
    }

    apretarCrearFinca(){
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
    }


    prev() {
        if (this.selectIndex <= 0)
          this.selectIndex = 0;
        else
          this.selectIndex = this.selectIndex - 1;
      }
    
      next() {
        if (this.selectIndex >= 3)
          this.selectIndex = 3;
        else
          this.selectIndex = this.selectIndex + 1;
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
