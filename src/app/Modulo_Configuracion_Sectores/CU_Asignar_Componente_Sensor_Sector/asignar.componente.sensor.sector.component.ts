import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DialogExampleComponent } from '../../shared/dialog/dialog-example/dialog-example.component';
import { MdDialog } from '@angular/material';
import { AppService } from '../../../app/app.service';
import { AsignarComponenteSensorSectorService, ComponenteSensor } from './asignar.componente.sensor.sector.service';
import { ErroresSistema } from '../../Datos_Sistema/errores.sistema';

@Component({
    selector:'asignar-componente-sensor-sector',
    templateUrl: './asignar.componente.sensor.sector.component.html',
    styleUrls:['./asignar.componente.sensor.sector.component.css']
    
})

export class AsignarComponenteSensorSectorComponent implements OnInit{
    
    idFinca:number=JSON.parse(localStorage.getItem('idFinca'));
    idSector:number=JSON.parse(localStorage.getItem('idSector'));
    tooltipAsignarComponenteSector='Asignar Componente.';
    position='above';
    componentesSensor:ComponenteSensor;
    perfilAsignarComponenteSensorSector:Boolean;
    errorMessageAsingarComponenteSensor="";

    erroresSistema = new ErroresSistema();
    permisoAsignarComponenteSensor = JSON.parse(localStorage.getItem('puedeAsignarComponenteSensor'));

    constructor(private router:Router,
                private route:ActivatedRoute,
                private asignarComponenteSensorSectorService:AsignarComponenteSensorSectorService,
                private appService:AppService,
                private dialog: MdDialog){

        appService.getState().topnavTitle="Asignar Componente Sensor";


    }

    ngOnInit(){
        this.asignarComponenteSensorSectorService.buscarComponenteFincaNoAsignados(this.idFinca)
            .then(
                response=>{
                    if(response.detalle_operacion=="No hay datos"){
                        this.errorMessageAsingarComponenteSensor="No hay componentes disponibles para asignar.";
                    }
                    else{
                        this.componentesSensor=response.datos_operacion;
                        this.perfilAsignarComponenteSensorSector=true;
                    }
                }
            )
            .catch(
                error=>{
                    if (error.error_description == this.erroresSistema.getInicioSesion()) {
                        this.router.navigate(['/login/']);
                    }
                    else{
                        this.errorMessageAsingarComponenteSensor=error.error_description;
                    }
                }
            );
    }

    getPermisoAsignarComponenteSensor(){
        return this.permisoAsignarComponenteSensor;
    }

    getPerfilAsignarComponenteSensorSector(){
        return this.perfilAsignarComponenteSensorSector;
    }

    apretarIconoAsignarComponente(idComponenteSensor:number){
        this.asignarComponenteSensorSectorService.asignarComponenteSector(this.idFinca,idComponenteSensor,this.idSector)
            .then(
                response=>{
                    this.router.navigate(['/homeSector/']);
                }
            )
            .catch(
                error=>{
                    if (error.error_description == this.erroresSistema.getInicioSesion()) {
                        this.router.navigate(['/login/']);
                    }
                    else{
                        this.errorMessageAsingarComponenteSensor=error.error_description;
                    }
                }
            );
    }
}
