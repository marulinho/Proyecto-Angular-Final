import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogExampleComponent } from '../../shared/dialog/dialog-example/dialog-example.component';
import { MdDialog } from '@angular/material';
import { AppService } from '../../app.service';
import { AsignarSensorComponenteSensorService, Sensor } from '../Asignar_Sensor_Componente_Sensor/asignar.sensor.componente.sensor.service';
import { ErroresSistema } from '../../Datos_Sistema/errores.sistema';
 
@Component({
    selector:'asginar-sensor-componente-sensor',
    templateUrl: './asignar.sensor.componente.sensor.component.html',
    styleUrls:['./asignar.sensor.componente.sensor.component.css']
    
})

export class AsignarSensorComponenteSensorComponent implements OnInit{
    
    erroresSistema = new ErroresSistema();
    permisoAsignarSensor = JSON.parse(localStorage.getItem('puedeGestionarSensores'));

    //ATRIBUTOS SENSORES
    idFinca:number=JSON.parse(localStorage.getItem('idFinca'));
    idComponenteSensor:number=JSON.parse(localStorage.getItem('idComponenteSensor'));
    errorMessageAgregarSensorComponente="";
    perfilAgregarSensorSeleccionado:Boolean;
    tooltipAgregarSensor='Agregar Sensor.';
    tooltipDesasignarSensor='Desasignar Sensor.';
    position='above';
    sensores:Sensor;

    constructor(private router: Router,
                private route:ActivatedRoute,
                private asignarSensorComponenteSensorService: AsignarSensorComponenteSensorService,
                private appService: AppService,
                private dialog: MdDialog) {
            
            this.appService.getState().topnavTitle="Asignar Sensor Componente Sensor";

    }

    ngOnInit(){
        this.asignarSensorComponenteSensorService.buscarSensoresNoAsignados(this.idFinca)
            .then(
                response=>{
                    if(response.detalle_operacion=="No hay datos"){
                        this.errorMessageAgregarSensorComponente="No hay sensores disponibles para asignar.";
                    }
                    else{
                        this.sensores=response.datos_operacion;
                        this.perfilAgregarSensorSeleccionado=true;
                    }
                }
            )
            .catch(
                error=>{
                    if (error.error_description == this.erroresSistema.getInicioSesion()) {
                        this.router.navigate(['/login/']);
                    }
                    else{
                        this.errorMessageAgregarSensorComponente=error.error_description;
                    }
                }
            );
    }

    getPermisoAsignarSensor(){
        return this.permisoAsignarSensor;
    }

    getPerfilAgregarSensorSeleccionado(){
        return this.perfilAgregarSensorSeleccionado;
    }

    apretarIconoAsignarSensorComponente(idSensor:number){
        this.asignarSensorComponenteSensorService.asignarSensorComponente(this.idFinca,this.idComponenteSensor,idSensor)
            .then(
                response=>{
                    this.router.navigate(['/homeComponenteSensorFinca/']);
                }
            )
            .catch(
                error=>{
                    if (error.error_description == this.erroresSistema.getInicioSesion()) {
                        this.router.navigate(['/login/']);
                    }
                    else{
                        this.errorMessageAgregarSensorComponente=error.error_description;
                    }
                }
            );
    }
}

  