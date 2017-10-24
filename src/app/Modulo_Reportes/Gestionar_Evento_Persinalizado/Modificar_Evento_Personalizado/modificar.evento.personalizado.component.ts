import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DialogExampleComponent } from '../../shared/dialog/dialog-example/dialog-example.component';
import { MdDialog } from '@angular/material';
import { AppService } from '../../../app.service';
import { GestionarEventoPersonalizadoService, TipoMedicionClimatica } from '../../Gestionar_Evento_Persinalizado/gestionar.evento.personalizado.service';

@Component({
    selector:'modificar-evento-personalizado-component',
    templateUrl: './modificar.evento.personalizado.component.html',
    styleUrls:['./modificar.evento.personalizado.component.css']
    
})

export class ModificarEventoPersonalizadoComponent implements OnInit{
    
    errorMessageModificarEvento="";
    idFinca:number=JSON.parse(localStorage.getItem('idFinca'));
    idUsuarioFinca:number=JSON.parse(localStorage.getItem("idUsuarioFinca"));
    idSector:number=JSON.parse(localStorage.getItem("idSector"));
    idConfiguracionEvento:number=JSON.parse(localStorage.getItem('idConfiguracionEvento'));
    selectIndex:number=0;

    tiposMedicionInterna:TipoMedicionClimatica;
    tiposMecicionExterna:TipoMedicionClimatica;
    
    nombre:string;
    descripcion:string;
    notificacionActivada:boolean=false;
    configuracionActivada:boolean=false;;

    valorMaximoInterno:number;
    valorMinimoInterno:number;
    tipoInterna:number;

    valorMaximoExterno:number;
    valorMinimoExterno:number;
    tipoExterna:number;

    configuracionInterna;
    configuracionExterna;

    constructor(private router:Router,
                private route:ActivatedRoute,
                private appService:AppService,
                private gestionarEventoPersonalizadoService:GestionarEventoPersonalizadoService,
                private dialog: MdDialog){

        appService.getState().topnavTitle="Modificar Evento Personalizado.";
    }

    ngOnInit(){
        console.log("evento Personalizado:"+ this.idConfiguracionEvento);
        this.gestionarEventoPersonalizadoService.mostrarTipoMedicionInternaFinca(this.idFinca)
            .then(
                response=>{
                    if(response.detalle_operacion=="No hay datos"){
                        this.errorMessageModificarEvento="No hay mediciones internas.";
                    }
                    else{
                        this.tiposMedicionInterna=response.datos_operacion;
                    }
                }
            )
            .catch(
                error=>{
                    this.errorMessageModificarEvento=error.error_description;
                }
            );
        
        this.gestionarEventoPersonalizadoService.mostrarTipoMedicionClimaticaInternaFinca(this.idFinca)
            .then(
                response=>{
                    if(response.detalle_operacion=="No hay datos"){
                        this.errorMessageModificarEvento="No hay mediciones internas.";
                    }
                    else{
                        this.tiposMecicionExterna=response.datos_operacion;
                    }
                }
            )
            .catch(
                error=>{
                    this.errorMessageModificarEvento=error.error_description;
                }
            );
    }

    apretarNextModificar(){
        console.log("nombre:" +this.nombre);
        console.log("descripcion:" +this.descripcion);
        console.log("tipoInterna:" +this.tipoInterna);
        console.log("MED MIN:" +this.valorMinimoInterno);
        console.log("MED MAX:" +this.valorMaximoInterno);
        console.log("tipo ext:" +this.tipoExterna);
        console.log("MED MIN:" +this.valorMinimoExterno);
        console.log("MED MAX:" +this.valorMaximoExterno);

        if(this.selectIndex==0){
            if( this.nombre=="" || this.nombre==null ||
                this.descripcion=="" || this.descripcion==null ||
                this.tipoInterna==null || this.valorMaximoInterno==null || this.valorMinimoInterno==null ||
                this.tipoExterna==null || this.valorMaximoExterno==null || this.valorMinimoExterno==null){
                    this.errorMessageModificarEvento="Debe completar todos los campos obligatorios (*).";
            }
            else{
                if(this.valorMaximoExterno<0 || this.valorMaximoInterno<0 || this.valorMinimoExterno<0 || this.valorMinimoInterno<0){
                    this.errorMessageModificarEvento="Los valores configurados no pueden ser negativos.";
                }
                else{
                    if(this.valorMinimoExterno>this.valorMaximoExterno){
                        this.errorMessageModificarEvento="El valor mínimo externo debe ser menor o igual que el valor máximo externo.";
                    }
                    else{
                        if(this.valorMinimoInterno>this.valorMaximoInterno){
                            this.errorMessageModificarEvento="El valor mínimo interno debe ser menor o igual que el valor máximo interno.";
                        }
                        else{
                            this.configuracionInterna=[{
                                'valorMaximo':this.valorMaximoInterno,
                                'valorMinimo':this.valorMinimoInterno,
                                'idTipoMedicion':this.tipoInterna
                            }];
                            this.configuracionExterna=[{
                                'valorMaximo':this.valorMaximoExterno,
                                'valorMinimo':this.valorMinimoExterno,
                                'idTipoMedicionClimatica':this.tipoExterna
                            }];
                            this.errorMessageModificarEvento="";
                            this.selectIndex+=1; 
                            }
                        }
                    }
                }
            }
        }

    apretarModificarConfiguracion(){
        this.gestionarEventoPersonalizadoService.modificarConfiguracionEventoPersonalizado(this.idConfiguracionEvento,this.configuracionInterna,
            this.configuracionExterna,this.idUsuarioFinca,this.nombre,this.descripcion,this.notificacionActivada,this.configuracionActivada,
            this.idSector,this.idFinca)
                .then(
                    response=>{
                        this.router.navigate(['/homeSector/'+this.idFinca+"/"+this.idSector]);
                    }
                )
                .catch(
                    error=>{
                        this.errorMessageModificarEvento=error.error_description;
                    }
                );
    }


    apretarSalir(){
        this.router.navigate(['/homeSector/'+this.idFinca+"/"+this.idSector]);        
    }
}