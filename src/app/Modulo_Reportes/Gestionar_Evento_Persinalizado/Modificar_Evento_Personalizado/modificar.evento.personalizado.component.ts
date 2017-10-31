import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DialogExampleComponent } from '../../shared/dialog/dialog-example/dialog-example.component';
import { MdDialog } from '@angular/material';
import { AppService } from '../../../app.service';
import { GestionarEventoPersonalizadoService, TipoMedicionClimatica } from '../../Gestionar_Evento_Persinalizado/gestionar.evento.personalizado.service';
import { ErroresSistema } from '../../../Datos_Sistema/errores.sistema';

@Component({
    selector:'modificar-evento-personalizado-component',
    templateUrl: './modificar.evento.personalizado.component.html',
    styleUrls:['./modificar.evento.personalizado.component.css']
    
})

export class ModificarEventoPersonalizadoComponent implements OnInit{
    
    erroresSistema = new ErroresSistema();
    permisoGestionarEventoPersonalizado = JSON.parse(localStorage.getItem('puedeGestionarEventoPersonalizado'));

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
        /*this.gestionarEventoPersonalizadoService.buscarConfiguracionesEventosPersonalizados(this.idUsuarioFinca,this.idFinca,this.idSector)
        .then(
            response=>{
                if(response.detalle_operacion=="No hay datos"){
                    this.errorMessageModificarEvento="No se ha podido obtener el evento, intente nuevamente.";
                }
                else{
                    this.nombre=response.datos_operacion['dto_evento_lista']['nombre'];
                    this.descripcion=response.datos_operacion['dto_evento_lista']['descripcion'];
                    this.notificacionActivada=response.datos_operacion['dto_evento_lista']['notificacion_activada'];
                    this.configuracionActivada=response.datos_operacion['dto_evento_lista']['activado'];
                    this.valorMinimoInterno=response.datos_operacion['lista_mediciones_internas']['valor_minimo'];
                    this.valorMaximoInterno=response.datos_operacion['lista_mediciones_internas']['valor_maximo'];
                    this.valorMinimoExterno=response.datos_operacion['lista_mediciones_externas']['valor_minimo'];
                    this.valorMaximoExterno=response.datos_operacion['lista_mediciones_externas']['valor_maximo'];

                }
            }
        )
        */
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
                    if (error.error_description == this.erroresSistema.getInicioSesion()) {
                        this.router.navigate(['/login/']);
                    }
                    else{
                        this.errorMessageModificarEvento=error.error_description;
                    }
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
                    if (error.error_description == this.erroresSistema.getInicioSesion()) {
                        this.router.navigate(['/login/']);
                    }
                    else{
                        this.errorMessageModificarEvento=error.error_description;
                    }
                }
            );
    }

    getPermisoGestionarEventoPersonalizado(){
        return this.permisoGestionarEventoPersonalizado;
    }

    apretarNextModificar(){

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
                        this.router.navigate(['/homeConfiguracionRiego/']);
                    }
                )
                .catch(
                    error=>{
                        if (error.error_description == this.erroresSistema.getInicioSesion()) {
                            this.router.navigate(['/login/']);
                        }
                        else{
                            this.errorMessageModificarEvento=error.error_description;
                        }
                    }
                );
    }


    apretarSalir(){
        this.router.navigate(['/homeConfiguracionRiego/']);        
    }
}