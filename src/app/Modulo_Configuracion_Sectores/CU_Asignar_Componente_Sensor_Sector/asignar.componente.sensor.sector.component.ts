import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DialogExampleComponent } from '../../shared/dialog/dialog-example/dialog-example.component';
import { MdDialog } from '@angular/material';
import { AppService } from '../../../app/app.service';
import { AsignarComponenteSensorSectorService, ComponenteSensor } from './asignar.componente.sensor.sector.service';

@Component({
    selector:'asignar-componente-sensor-sector',
    templateUrl: './asignar.componente.sensor.sector.component.html',
    styleUrls:['./asignar.componente.sensor.sector.component.css']
    
})

export class AsignarComponenteSensorSectorComponent implements OnInit{
    
    idFinca:number;
    idSector:number;
    tooltipAsignarComponenteSector='Asignar Componente';
    position='above';
    componentesSensor:ComponenteSensor;
    perfilAsignarComponenteSensorSector:Boolean;
    errorMessageAsingarComponenteSensor="";

    
    constructor(private router:Router,
                private route:ActivatedRoute,
                private asignarComponenteSensorSectorService:AsignarComponenteSensorSectorService,
                private appService:AppService,
                private dialog: MdDialog){

        appService.getState().topnavTitle="Asignar Componente Sensor";
        this.route.params.subscribe(params => {
            this.idSector = +params['idSector'];
            this.idFinca=+params['idFinca'];

        });

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
                    this.errorMessageAsingarComponenteSensor=error.error_description;
                }
            );
    }

    getPerfilAsignarComponenteSensorSector(){
        return this.perfilAsignarComponenteSensorSector;
    }

    apretarIconoAsignarComponente(idComponenteSensor:number){
        this.asignarComponenteSensorSectorService.asignarComponenteSector(this.idFinca,idComponenteSensor,this.idSector)
            .then(
                response=>{
                    this.router.navigate(['/homeSector/'+this.idSector+"/"+this.idFinca]);
                }
            )
            .catch(
                error=>{
                    this.errorMessageAsingarComponenteSensor=error.error_description;
                }
            );
    }
}