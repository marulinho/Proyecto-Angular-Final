import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SolicitarCreacionFincaService, Finca, ProveedorInformacion } from './solicitar.creacion.finca.service';
import { LoginComponent } from '../../Modulo_Seguridad/CU_Iniciar_Sesion/login.component';

@Component({
    selector:'app-solicitar.creacion.finca',
    templateUrl: './solicitar.creacion.finca.component.html',
    styleUrls:['./solicitar.creacion.finca.component.css']
    
})

export class SolicitarCreacionFincaComponent implements OnInit{
    fincaCreada: Finca;
    proveedoresInformacion:ProveedorInformacion[];
    divDatosProveedor:Boolean;
    divDatosFinca:Boolean;
    constructor(private router:Router,
                private solicitarCreacionFincaService:SolicitarCreacionFincaService){

    }

    ngOnInit(){
        this.divDatosFinca=true;
        this.divDatosProveedor=false;
        this.solicitarCreacionFincaService.obtenerProveedores()
                                          .then(response => this.proveedoresInformacion=response);
    }
    
    apretarSolicitar(nombre:string, direccionLegal:string,ubicacion:string,tamanio:number){
        console.log("estamos aca");
        console.log("nombre: "+nombre);
        console.log("direccionLegal: "+direccionLegal);
        console.log("ubicacion: "+direccionLegal);
        console.log("tamanio: "+direccionLegal);
        //this.router.navigate(['/home']);)

        this.solicitarCreacionFincaService.solicitarCreacion(nombre,direccionLegal,ubicacion,tamanio)
                                            .then(response => this.fincaCreada=response);
        this.divDatosFinca=false;
        this.divDatosProveedor=true;
    }

    apretarCancelar(){
        console.log("estamos aca");
        this.router.navigate(['/homeFinca/']);
    }

    apretarSeleccionar(proveedor:string){
        console.log(proveedor);
        let finca=this.fincaCreada.idFinca;
        this.solicitarCreacionFincaService.seleccionarProveedor(proveedor,finca)
        this.divDatosFinca=false;
        this.divDatosProveedor=false;
                                          
    }

    apretarAceptar(){
        this.router.navigate(['/homeFinca/']);
    }


    
}
