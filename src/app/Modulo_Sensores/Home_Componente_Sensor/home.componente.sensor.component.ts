import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogExampleComponent } from '../../shared/dialog/dialog-example/dialog-example.component';
import { MdDialog } from '@angular/material';
import { AppService } from '../../app.service';
import { GestionarComponenteSensorService, ComponenteSensor } from '../ABM_Componente_Sensor/gestionar.componente.sensor.service';
import { AsignarSensorComponenteSensorService, Sensor } from '../Asignar_Sensor_Componente_Sensor/asignar.sensor.componente.sensor.service';

@Component({
    selector:'home-componente-sensor',
    templateUrl: './home.componente.sensor.component.html',
    styleUrls:['./home.componente.sensor.component.css']
    
})

export class HomeComponenteSensorComponent implements OnInit{
    
    //ATRIBUTOS HOME COMPONENTE SENSOR
    title:string;
    description:string;
    option1:string;
    option2:string;
    selectedOption:string;
    idFinca:number;
    idComponenteSensor:number;
    errorMessageHomeComponente="";
    componenteSensor:ComponenteSensor;
    tooltipEditarComponente='Editar Componente Sensor';
    tooltipDeshabilitarComponente='Deshabilitar Componente Sensor';    
    perfilHomeComponenteSeleccionado:Boolean=true;
    perfilComponenteSeleccionado:Boolean;

    //ATRIBUTOS SENSORES
    errorMessageSensor="";
    perfilAgregarSensorSeleccionado:Boolean;
    tooltipAgregarSensor='Agregar Sensor';
    tooltipDesasignarSensor='Desasignar Sensor';
    position='above';
    sensores:Sensor;

    constructor(private router: Router,
                private route:ActivatedRoute,
                private gestionarComponenteSensorService:GestionarComponenteSensorService,
                private asignarSensorComponenteSensorService: AsignarSensorComponenteSensorService,
                private appService: AppService,
                private dialog: MdDialog) {
            
            this.appService.getState().topnavTitle="Home Componente Sensor";
            this.route.params.subscribe(params => {
                this.idFinca = +params['idFinca'];
                this.idComponenteSensor = +params['idComponenteSensor'];

                
            });
    }

    ngOnInit(){
        this.gestionarComponenteSensorService.buscarComponenteSensorId(this.idComponenteSensor)
            .then(
                response=>{
                    this.componenteSensor=response.datos_operacion;
                                     
                    this.perfilComponenteSeleccionado=true;
                }
            )
            .catch(
                error=>{
                    this.errorMessageHomeComponente=error.error_description;
                }
            );

        this.asignarSensorComponenteSensorService.buscarSensoresAsignadosComponente(this.idComponenteSensor)
            .then(
                response=>{
                    if(response.detalle_operacion=="No hay datos"){
                        this.errorMessageSensor="No hay sensores disponibles para el componente seleccionado.";
                    }
                    else{
                        this.sensores=response.datos_operacion;
                        this.perfilAgregarSensorSeleccionado=true;
                    }
                }
            )
            .catch(
                error=>{
                    this.errorMessageSensor=error.error_description;
                }
            );
    }

    getperfilHomeComponenteSeleccionado(){
        return this.perfilHomeComponenteSeleccionado;
    }

    getPerfilComponenteSeleccionado(){
        return this.perfilComponenteSeleccionado;
    }

    getPerfilSensorSeleccionado(){
        return this.perfilAgregarSensorSeleccionado;
    }

    apretarDeshabilitarComponenteSensor(idComponenteSensor:number){
        this.title="Deshabilitar Componente Sensor";
        this.description="¿Desea deshabilitar el componente sensor de la finca?";
        this.option1="Aceptar";
        this.option2="Cancelar";
        this.openDialoDeshabilitarComponenteSensor(idComponenteSensor);
    }

    apretarIconoDeshabilitarSensorComponente(idSensor:number){
        this.title="Desasignar Sensor";
        this.description="¿Desea desasignar el sensor del componente?";
        this.option1="Aceptar";
        this.option2="Cancelar";
        this.openDialoDesasignarSensorComponenteSensor(idSensor);
    }

    openDialoDeshabilitarComponenteSensor(idComponenteSensor:number){
        let dialogRef = this.dialog.open(DialogExampleComponent);
        dialogRef.componentInstance.title=this.title;
        dialogRef.componentInstance.description=this.description;
        dialogRef.componentInstance.option1=this.option1;
        dialogRef.componentInstance.option2=this.option2;
        dialogRef.afterClosed().subscribe(
            result => {
                        this.selectedOption = result;
                        if(this.selectedOption==="Aceptar"){
                            this.gestionarComponenteSensorService.deshabilitarComponenteSensor(this.idFinca,idComponenteSensor)
                            .then(
                                response=>{
                                    this.router.navigate(['/homeFincaDetalle/'+this.idFinca]);
                                }
                            )
                            .catch(
                                error=>{
                                    this.errorMessageHomeComponente=error.error_description;
                                }
                            );
                        }
                        this.title="";
                        this.description="";
                        this.option1="";
                        this.option2="";
            });
    }

    openDialoDesasignarSensorComponenteSensor(idSensor){
        let dialogRef = this.dialog.open(DialogExampleComponent);
        dialogRef.componentInstance.title=this.title;
        dialogRef.componentInstance.description=this.description;
        dialogRef.componentInstance.option1=this.option1;
        dialogRef.componentInstance.option2=this.option2;
        dialogRef.afterClosed().subscribe(
            result => {
                        this.selectedOption = result;
                        if(this.selectedOption==="Aceptar"){
                            this.asignarSensorComponenteSensorService.desasignarSensorComponente(this.idFinca,this.idComponenteSensor,idSensor)
                            .then(
                                response=>{
                                    this.refresh();
                                }
                            )
                            .catch(
                                error=>{
                                    this.errorMessageSensor=error.error_description;
                                }
                            );
                        }
                        this.title="";
                        this.description="";
                        this.option1="";
                        this.option2="";
            });
    }

    refresh(): void {
        window.location.reload();
    } 
}

  