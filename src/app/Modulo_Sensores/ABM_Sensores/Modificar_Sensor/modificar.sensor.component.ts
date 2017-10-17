import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../../../app.service';
import { DialogExampleComponent } from '../../shared/dialog/dialog-example/dialog-example.component';
import { MdDialog } from '@angular/material';
import { ABMSensorFincaService, TipoMediciones } from '../abm.sensores.service';

@Component({
    selector:'modificar-sensor-finca',
    templateUrl: './modificar.sensor.component.html',
    styleUrls:['./modificar.sensor.component.css']
    
})

export class ModificarSensorComponent implements OnInit{

    idFinca:number;
    idSensor:number;
    perfilSensorSeleccionado:Boolean;
    errorMessageModificarSensor:string="";
    modeloSensor:string;
    mediciones:TipoMediciones;
    tipoMedicion:number;


    constructor(private router:Router,
                private route:ActivatedRoute,
                private abmSensorFincaService:ABMSensorFincaService,
                private appService:AppService,
                private dialog: MdDialog){

        appService.getState().topnavTitle="Modificar Sensor";
        this.route.params.subscribe(params => {
            this.idFinca = +params['idFinca'];
            this.idSensor = +params['idSensor'];
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
                        this.errorMessageModificarSensor=error.error_description;
                    }
                );
        });

    }

    ngOnInit(){}

    getPerfilSensorSeleccionado(){
        return this.perfilSensorSeleccionado;
    }

    apretarModificarSensor(){
        if( this.modeloSensor=="" || this.modeloSensor==null || this.tipoMedicion==null){
            this.errorMessageModificarSensor="Debe completar todos los campos obligatorios (*).";
        }
        else{
            this.abmSensorFincaService.modificarSensor(this.tipoMedicion,this.modeloSensor,this.idSensor)
                .then(
                    response=>{
                        this.router.navigate(['/homeFincaDetalle/'+this.idFinca]);
                    }
                )
                .catch(
                    error=>{
                        this.errorMessageModificarSensor=error.error_description;
                    }
                );
        }
        
    }

    apretarSalir(){
        this.router.navigate(['/homeFincaDetalle/'+this.idFinca]);
    }


}
