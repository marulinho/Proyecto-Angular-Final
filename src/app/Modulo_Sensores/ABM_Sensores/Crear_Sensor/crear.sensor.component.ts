import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../../../app.service';
import { DialogExampleComponent } from '../../shared/dialog/dialog-example/dialog-example.component';
import { MdDialog } from '@angular/material';
import { ABMSensorFincaService, TipoMediciones } from '../abm.sensores.service';
import { ErroresSistema } from '../../../Datos_Sistema/errores.sistema';

@Component({
    selector:'crear-sensor-finca',
    templateUrl: './crear.sensor.component.html',
    styleUrls:['./crear.sensor.component.css']
    
})

export class CrearSensorComponent implements OnInit{

    erroresSistema = new ErroresSistema();
    permisoCrearSensor = JSON.parse(localStorage.getItem('puedeGestionarSensores'));

    idFinca:number =JSON.parse(localStorage.getItem('idFinca'));
    perfilSensorSeleccionado:Boolean;
    errorMessageCrearSensor:string="";
    modeloSensor:string;
    mediciones:TipoMediciones;
    tipoMedicion:number;


    constructor(private router:Router,
                private route:ActivatedRoute,
                private abmSensorFincaService:ABMSensorFincaService,
                private appService:AppService,
                private dialog: MdDialog){

        appService.getState().topnavTitle="Crear Sensor";
 
    }

    ngOnInit(){
        this.abmSensorFincaService.buscarTipoMediciones()
        .then(
            response=>{
                if(response.detalle_operacion=="No hay datos"){
                    this.errorMessageCrearSensor="No hay tipos de mediciones habilitadas.";
                }
                else{
                    this.mediciones=response.datos_operacion;
                    this.perfilSensorSeleccionado=true;
                }
            }
        )
        .catch(
            error=>{
                if (error.error_description == this.erroresSistema.getInicioSesion()) {
                    this.router.navigate(['/login/']);
                }
                else{
                    this.errorMessageCrearSensor=error.error_description;
                }
            }
        );
    }

    getPermisoCrearSensor(){
        return this.permisoCrearSensor;
    }

    getPerfilSensorSeleccionado(){
        return this.perfilSensorSeleccionado;
    }

    apretarCrearSensor(){
        if( this.modeloSensor=="" || this.modeloSensor==null || this.tipoMedicion==null){
            this.errorMessageCrearSensor="Debe completar todos los campos obligatorios (*).";
        }
        else{
            this.abmSensorFincaService.crearSensor(this.tipoMedicion,this.modeloSensor,this.idFinca)
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
                            this.errorMessageCrearSensor=error.error_description;
                        }
                    }
                );
        }
        
    }

    apretarSalir(){
        this.router.navigate(['/homeFincaDetalle/']);
    }


}
