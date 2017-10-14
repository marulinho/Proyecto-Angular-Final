import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from '../../app.service';
import { GestionarUsuarioFincaService, Usuario,Roles } from './gestionar.usuario.finca.service';

@Component({
    selector:'gestionar-usuario-finca',
    templateUrl: './gestionar.usuario.finca.component.html',
    styleUrls:['./gestionar.usuario.finca.component.css']
    
})

export class GestionarUsuarioFincaComponent implements OnInit{
    
    idFinca:number;
    
    //ATRIBUTOS PERFIL AGREGAR USUARIO
    tooltipAgregarUsuario='Agregar Usuario';
    position='above';
    errorMessageUsuariosFinca="";
    usuariosNoFinca:Usuario;
    usuariosNoFincaSeleccionado:Boolean;
    perfilUsuariosNoFinca:Boolean=true;

    //ATRIBUTOS AGREGAR USUARIO 
    agregarUsuariosFinca:Boolean;
    selectIndex:number=0;
    errorMessageAgregarUsuarioNoFinca="";
    rolSeleccionado: string;  
    usuario:string;  
    roles:Roles;
      
    

    constructor(private router: Router,
                private route:ActivatedRoute,
                private gestionarUsuarioFincaService: GestionarUsuarioFincaService,
                private appService: AppService) {
            this.appService.getState().topnavTitle="Usuarios";
            this.route.params.subscribe(params => {
                
                this.idFinca = +params['idFinca'];
                if (this.idFinca) {
                  console.log("idFinca: "+this.idFinca);
                    this.gestionarUsuarioFincaService.buscarUsuarioNoFinca(this.idFinca)
                    .then(
                        response=>{
                            if(response.detalle_operacion=="No hay datos"){
                                this.errorMessageUsuariosFinca="No existen usuarios que se puedan agregar a la finca.";
                            }
                            else{
                                this.usuariosNoFinca=response.datos_operacion;
                                this.usuariosNoFincaSeleccionado=true;
                            }
                        }
                    )
                    .catch(
                        error=>{
                            this.errorMessageUsuariosFinca=error.error_description;
                        }
                    );
                }
            });
    }

    ngOnInit(){
      this.gestionarUsuarioFincaService.buscarRoles()
          .then(
            response=>{
              if(response.detalle_operacion=="No hay datos"){
                this.errorMessageAgregarUsuarioNoFinca="No hay roles disponibles para asignar.";
              }
              else{
                this.roles=response.datos_operacion;
              }
              
            }
          )
  
    }

    getPerfilUsuariosNoFinca(){
      return this.perfilUsuariosNoFinca;
    }
   
    getUsuariosNoFinca(){
      return this.usuariosNoFincaSeleccionado;
    }
  
    getAgregarUsuariosFinca(){
      return this.agregarUsuariosFinca;
    }

    apretarAgregarIcono(usuario:string){
      this.usuario=usuario;
      console.log("usuario recibido: "+this.usuario);
      this.selectIndex=0;
      this.rolSeleccionado="";
      this.agregarUsuariosFinca=true;
      this.perfilUsuariosNoFinca=false;
    }
    
    apretarNextAgregar(){
      if(this.rolSeleccionado==null || this.rolSeleccionado==""){
        this.errorMessageAgregarUsuarioNoFinca="Debe completar todos los campos obligatorios(*).";
      }
      else{
        this.errorMessageAgregarUsuarioNoFinca="";
        this.selectIndex+=1;
      }
    }
    apretarAgregarUsuario(){
      this.gestionarUsuarioFincaService.agregarUsuarioFinca(this.usuario,this.idFinca,this.rolSeleccionado)
          .then(
            response=>{
              this.router.navigate(['/homeFincaDetalle/'+this.idFinca]);
            }
          )
          .catch(
            error=>{
              this.errorMessageAgregarUsuarioNoFinca=error.error_description;
            }
          );
    }

    apretarSalir(){
      this.agregarUsuariosFinca=false;
      this.perfilUsuariosNoFinca=true;
    }
}

  