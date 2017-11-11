import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../../../app.service';
import { GestionarProveedorInformacionService, ProveedorInformacion } from'../gestionar.proveedor.service';
import { ErroresSistema } from '../../../Datos_Sistema/errores.sistema';

@Component({
    selector:'cambiar-proveedor-informacion',
    templateUrl: './cambiar.proveedor.component.html',
    styleUrls:['./cambiar.proveedor.component.css']
    
})

export class CambiarProveedorInformacionComponent implements OnInit{
    
    erroresSistema = new ErroresSistema();
    permisoConfigurarProveedor=JSON.parse(localStorage.getItem('puedeConfigurarObtencionInfoExterna'));

    idFinca:number = JSON.parse(localStorage.getItem('idFinca'));
    proveedoresInformacion:ProveedorInformacion;
    errorMessage="";
    proveedorSeleccionado:Boolean;
    frecuencia:number;
    nombreProveedor:string;
    frecuenciaProveedor:number;

    
    constructor(private router:Router,
                private route:ActivatedRoute,
                private gestionarProveedorInformacionService:GestionarProveedorInformacionService,
                private appService:AppService){

        appService.getState().topnavTitle="Cambiar Proveedor Información";

    }

    ngOnInit(){
        this.gestionarProveedorInformacionService.obtenerTodosProveedores()
        .then(
            response=>{
                this.proveedoresInformacion=response.datos_operacion;
                this.proveedorSeleccionado=true;
            }
        )
        .catch(
            error=>{
                if (error.error_description == this.erroresSistema.getInicioSesion()) {
                    this.router.navigate(['/login/']);
                }
                else{
                    this.errorMessage=error.error_description;
                }
            }
        );
    }

    getPermisoConfigurarProveedor(){
        return this.permisoConfigurarProveedor;
    }

   getProveedorSeleccionado(){
       return this.proveedorSeleccionado;
   }

   apretarCambiarProveedor(){
       if(this.frecuencia==null || this.nombreProveedor=="" || this.nombreProveedor==null){
           this.errorMessage="Debe completar todos los campos obligatorios (*).";
       }
       else{
           if(this.frecuencia<0){
               this.errorMessage="No puede ingresar valores menores que cero.";
           }
           else{
                if(this.frecuencia>this.frecuenciaProveedor){
                    this.errorMessage="La frecuencia debe ser menor o igual que la frecuencia máxima soportada por el proveedor.";
                }
                else{
                    this.gestionarProveedorInformacionService.cambiarProveedor(this.idFinca,this.nombreProveedor,this.frecuencia)
                    .then(
                        response=>{
                            this.router.navigate(['/homeFincaDetalle/']);
                        }
                    )
                    .catch(
                        error=>{
                            if (error.error_description == this.erroresSistema.getInicioSesion()) {
                                this.router.navigate(['/login/']);
                            }
                            else{
                                this.errorMessage=error.error_description;
                            }
                        }
                    );
                }
           }
        }
    } 

   apretarProveedor(){
       this.gestionarProveedorInformacionService.buscarProveedorNombre(this.nombreProveedor)
            .then(
                response=>{
                    if(response.detalle_operacion=="No hay datos"){
                        this.errorMessage="No se ha podido obtener la información necesaria del proveedor, intente de nuevo.";
                    }
                    else{
                        this.frecuenciaProveedor=response.datos_operacion['frecuenciaMaxPosible']
                    }
                }
            )
            .catch(
                error=>{
                    if (error.error_description == this.erroresSistema.getInicioSesion()) {
                        this.router.navigate(['/login/']);
                    }
                    else{
                        this.errorMessage=error.error_description;
                    }
                }
            )
   }

   apretarSalir(){
        this.router.navigate(['/homeFincaDetalle/']);
   } 
   
   
}
