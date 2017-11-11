import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../../../app.service';
import { DialogExampleComponent } from '../../shared/dialog/dialog-example/dialog-example.component';
import { MdDialog } from '@angular/material';
import { ABMSensorFincaService, TipoMediciones } from '../abm.sensores.service';
import { ErroresSistema } from '../../../Datos_Sistema/errores.sistema';

@Component({
    selector:'modificar-sensor-finca',
    templateUrl: './modificar.sensor.component.html',
    styleUrls:['./modificar.sensor.component.css']
    
})

export class ModificarSensorComponent implements OnInit{

    erroresSistema = new ErroresSistema();
    permisoGestionarSensor = JSON.parse(localStorage.getItem('puedeGestionarSensores'));

    idFinca:number=JSON.parse(localStorage.getItem('idFinca'));
    idSensor:number = JSON.parse(localStorage.getItem('idSensor'));
    perfilSensorSeleccionado:Boolean;
    errorMessageModificarSensor:string="";
    modeloSensor:string;
    mediciones:TipoMediciones;
    medicionActual:string;
    tipoMedicion:number;


    constructor(private router:Router,
                private route:ActivatedRoute,
                private abmSensorFincaService:ABMSensorFincaService,
                private appService:AppService,
                private dialog: MdDialog){

        appService.getState().topnavTitle="Modificar Sensor";


    }

    ngOnInit(){
        this.abmSensorFincaService.buscarSensorId(this.idSensor,this.idFinca)
            .then(
                response=>{
                    if(response.detalle_operacion=="No hay datos"){
                        this.errorMessageModificarSensor="No se ha podido encontrar el sensor, intente más tarde.";
                    }
                    else{
                        this.modeloSensor= response['datos_operacion']['modelo'];
                        this.medicionActual=response['datos_operacion']['tipoMedicion'];
                    }
                }
            )
            .catch(
                error=>{
                    if (error.error_description == this.erroresSistema.getInicioSesion()) {
                        this.router.navigate(['/login/']);
                    }
                    else{
                        this.errorMessageModificarSensor=error.error_description;
                    }
                }
            )
        this.abmSensorFincaService.buscarTipoMediciones()
            .then(
                response=>{
                    if(response.detalle_operacion=="No hay datos"){
                        this.errorMessageModificarSensor="No hay tipos de mediciones habilitadas.";
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
                        this.errorMessageModificarSensor=error.error_description;
                    }
                }
            );
    }

    getPermisoGestionarSensor(){
        return this.permisoGestionarSensor;
    }

    getPerfilSensorSeleccionado(){
        return this.perfilSensorSeleccionado;
    }

    apretarModificarSensor(){
        if( this.modeloSensor=="" || this.modeloSensor==null || this.tipoMedicion==null){
            this.errorMessageModificarSensor="Debe completar todos los campos obligatorios (*).";
        }
        else{
            this.abmSensorFincaService.modificarSensor(this.tipoMedicion,this.modeloSensor,this.idSensor,this.idFinca)
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
                            this.errorMessageModificarSensor=error.error_description;
                        }
                    }
                );
        }
        
    }

    apretarSalir(){
        this.router.navigate(['/homeFincaDetalle/']);
    }


}
