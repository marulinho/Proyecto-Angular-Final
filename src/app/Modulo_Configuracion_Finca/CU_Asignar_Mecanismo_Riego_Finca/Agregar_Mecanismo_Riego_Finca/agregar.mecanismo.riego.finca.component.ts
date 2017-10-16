import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from '../../../app.service';
import { AsignarMecanismoRiegoFincaService, MecanismoRiego } from '../asignar.mecanismo.riego.finca.service';

@Component({
    selector:'agregar-mecanismo-finca',
    templateUrl: './agregar.mecanismo.riego.finca.component.html',
    styleUrls:['./agregar.mecanismo.riego.finca.component.css']
    
})

export class AgregarMecanismoRiegoFincaComponent implements OnInit{
    
    idFinca:number;
    
    //ATRIBUTOS PERFIL AGREGAR MECANISMO
    tooltipAgregarMecanismo='Agregar Mecanismo';
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
            this.route.params.subscribe(params => {
                
                this.idFinca = +params['idFinca'];
                if (this.idFinca) {
                  console.log("idFinca: "+this.idFinca);
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
                            this.errorMessagePerfilMecanismo=error.error_description;
                        }
                    );
                }
            });
    }

    ngOnInit(){}

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
                        this.router.navigate(['/homeFincaDetalle/'+this.idFinca]);
                    }
                )
                .catch(
                    error=>{
                        this.errorMessageAgregarMecanismoFinca=error.error_description;
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

  