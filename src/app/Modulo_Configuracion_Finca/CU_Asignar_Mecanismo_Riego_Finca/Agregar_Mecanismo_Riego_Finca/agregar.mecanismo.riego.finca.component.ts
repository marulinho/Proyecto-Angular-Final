import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from '../../../app.service';
import { AsignarMecanismoRiegoFincaService, MecanismoRiego } from '../asignar.mecanismo.riego.finca.service';
import { ErroresSistema } from '../../../Datos_Sistema/errores.sistema';

@Component({
    selector:'agregar-mecanismo-finca',
    templateUrl: './agregar.mecanismo.riego.finca.component.html',
    styleUrls:['./agregar.mecanismo.riego.finca.component.css']
    
})

export class AgregarMecanismoRiegoFincaComponent implements OnInit{
    
    idFinca:number=JSON.parse(localStorage.getItem('idFinca'));
    permisoAsignarMecanismoFinca=JSON.parse(localStorage.getItem('puedeAsignarMecRiegoAFinca'));
    
    erroresSistema = new ErroresSistema();

    //ATRIBUTOS PERFIL AGREGAR MECANISMO
    tooltipAgregarMecanismo='Agregar Mecanismo.';
    position='above';
    errorMessagePerfilMecanismo="";
    mecanismosRiego:MecanismoRiego;
    perfilMecanismoRiegoSeleccionado:Boolean=true;
    mecanismoRiegoSeleccionado:Boolean;

    //ATRIBUTOS AGREGAR MECANISMO
    agregarMecanismoFinca:Boolean;
    errorMessageAgregarMecanismoFinca="";
    nombreMecanismo:string;
    ip:string;
    

    constructor(private router: Router,
                private route:ActivatedRoute,
                private asginarMecanismoRiegoFincaService: AsignarMecanismoRiegoFincaService,
                private appService: AppService) {
            this.appService.getState().topnavTitle="Mecanismos de Riego";

    }

    ngOnInit(){
        this.asginarMecanismoRiegoFincaService.mostrarMecanismoRiegoNuevosFinca(this.idFinca)
        .then(
            response=>{
                if(response.detalle_operacion=="No hay datos"){
                    this.errorMessagePerfilMecanismo="No existen mecanismos que se puedan agregar a la finca.";
                }
                else{
                    this.mecanismosRiego=response.datos_operacion;
                    this.mecanismoRiegoSeleccionado=true;
                }
            }
        )
        .catch(
            error=>{
                if(error.error_description==this.erroresSistema.getInicioSesion()){
                    this.router.navigate(['/login/']);
                }
                else{
                    this.errorMessagePerfilMecanismo=error.error_description;
                }
            }
        );
    }

    getPermisoAsignarMecanismoFinca(){
        return this.permisoAsignarMecanismoFinca;
    }
    getperfilMecanismoRiegoSeleccionado(){
        return this.perfilMecanismoRiegoSeleccionado;
    }

    getMecanismoRiegoSeleccionado(){
      return this.mecanismoRiegoSeleccionado;
    }

    getAgregarMecanismoFinca(){
        return this.agregarMecanismoFinca;
    }

    apretarAgregarIcono(mecanismo:string){
        this.nombreMecanismo=mecanismo;
        this.agregarMecanismoFinca=true;
        this.perfilMecanismoRiegoSeleccionado=false;
    }
    
    apretarAgregarMecanismo(){
        if(this.ip=="" || this.ip==null){
            this.errorMessageAgregarMecanismoFinca="Debe completar todos los campos obligatorios (*).";
        }
        else{
            this.asginarMecanismoRiegoFincaService.agregarMecanismoRiegoFinca(this.idFinca,this.nombreMecanismo,this.ip)
                .then(
                    response=>{
                        this.router.navigate(['/homeFincaDetalle/']);
                    }
                )
                .catch(
                    error=>{
                        if(error.error_description==this.erroresSistema.getInicioSesion()){
                            this.router.navigate(['/login/']);
                        }
                        else{
                            this.errorMessageAgregarMecanismoFinca=error.error_description;
                        }
                    }
                );
        }
        
    }
    
    apretarSalir(){
        this.agregarMecanismoFinca=false;
        this.perfilMecanismoRiegoSeleccionado=true;
        this.mecanismoRiegoSeleccionado=true;
    }
}

  