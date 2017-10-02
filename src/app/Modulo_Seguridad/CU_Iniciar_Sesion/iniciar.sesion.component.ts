import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../app.service';
import { IniciarSesionService,Usuario } from './iniciar.sesion.service';
import { RegistrarUsuarioService } from '../CU_Registrar_Usuario/registrar.usuario.service';
import { RecuperarCuentaService } from '../CU_Recuperar_Cuenta/recuperar.cuenta.service';


@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar.sesion.component.html',
  styleUrls: [
    './iniciar.sesion.component.scss'
  ]
})
export class IniciarSesionComponent implements OnInit, OnDestroy {
 
  //ATRIBUTOS GENERALES
  errorMessage:string="";

  //ATRIBUTOS INICIAR SESION
  usuarioLogeado : Usuario;
  inicioSesion:boolean=false;
  iniciarSesionSeleccionado:boolean;

  //ATRIBUTOS REGISTRAR USUARIO
  registrarSeleccionado:boolean;
  selectIndex: number = 0;
  nombre:string;
  apellido:string;
  dni:number;
  cuit:number;
  direccion:string;
  fechaNacimiento;
  email:string;
  usuario:string;
  password1:string;
  password2:string;
  exitoRegistracion:boolean;

  //ATRIBUTOS RECUPERAR CUENTA
  recuperarSeleccionado:boolean;
  codigo:string;
  

  constructor(private appService: AppService, 
              private iniciarSesionService:IniciarSesionService,
              private router:Router,
              private registrarUsuario:RegistrarUsuarioService,
              private recuperarCuenta:RecuperarCuentaService){
    appService.getState().pageFullscreen = true;
  }
  
  ngOnInit() {
    this.iniciarSesionSeleccionado=true;
    this.registrarSeleccionado=false;
    this.recuperarSeleccionado=false;
    this.errorMessage="";
  }
  
  ngOnDestroy() {
    this.appService.getState().pageFullscreen = false;
  }

  //EMPIEZA INICIAR SESION
  
  apretarLogin(username:string, password:string){
    if(username.length==0 || password.length==0){
      this.errorMessage="Debe completar todos los campos";
    }
    else{
      this.iniciarSesionService.login(username,password)
      .then(
        response =>{
          this.errorMessage="";
          this.usuarioLogeado=response;
          this.inicioSesion=true;
          this.router.navigate(['/home/']);
        } 
      )
      .catch(error => this.errorMessage=error.error_description);
      
    }
    
  }

  getIniciarSesion(){
    return this.iniciarSesionSeleccionado;
  }

  //TERMINA INICIAR SESION

  //EMPIEZA REGISTRAR USUARIO

  apretarLinkRegistrar(){
    console.log("apretamos registrar");
    
    //CONFIGURACION DE LOS ELEMENTOS
    this.errorMessage="";
    this.selectIndex=0;
    this.nombre="";
    this.apellido="";
    this.dni=null;
    this.cuit=null;
    this.direccion="";
    this.fechaNacimiento=null;
    this.email="";
    this.usuario="";
    this.password1="";
    this.password2="";
    this.iniciarSesionSeleccionado=false;
    this.registrarSeleccionado=true;
    
  }

  getRegistrar(){
    return this.registrarSeleccionado;
  }

  prev() {
    if (this.selectIndex <= 0)
      this.selectIndex = 0;
    else
      this.selectIndex = this.selectIndex - 1;
  }

  next() {
    if (this.selectIndex >= 3)
      this.selectIndex = 3;
    else
      this.selectIndex = this.selectIndex + 1;
  }

  apretarSalir(){
    this.iniciarSesionSeleccionado=true;
    this.registrarSeleccionado=false;
    this.recuperarSeleccionado=false;
    this.errorMessage="";
  }

  apretarRegistrarUsuario(){

    if (this.password1 != this.password2) {
      this.errorMessage.concat("Las contrase&ntilde;as deben coincidir");
    }
    else {
      this.registrarUsuario.registrarUsuario(this.nombre, this.apellido, this.dni, this.cuit,
        this.fechaNacimiento, this.direccion, this.email, this.usuario, this.password1)
        .then(
          response=>{
            this.exitoRegistracion=response.resultado;
            if(this.exitoRegistracion==true){
              this.iniciarSesionSeleccionado=true;
              this.registrarSeleccionado=false;
              this.errorMessage="";
            } 
          })
        .catch(error => this.errorMessage = error.error_description);
    }
    
   
  }

  //TERMINA REGISTRAR USUARIO

  //EMPIEZA RECUPERAR CUENTA
  apretarLinkRecuperar(){
    console.log("apretamos recuperar cuenta");
    this.errorMessage="";
    this.selectIndex=0;
    this.email="";
    this.usuario="";
    this.codigo="";
    this.password1="";
    this.password2="";
    this.iniciarSesionSeleccionado=false;
    this.registrarSeleccionado=false;
    this.recuperarSeleccionado=true;

  }

  getRecuperar(){
    return this.recuperarSeleccionado;
  }

  apretarNext(){
    console.log("verificamos el email ");
    if(this.email.length==0){
      this.errorMessage="Debe completar todos los campos";
    }
    else{
      this.recuperarCuenta.recuperarCuenta(this.email)
      .then(
        response=>{
          this.usuario=response.usuario;
          this.errorMessage="";
          this.selectIndex += 1; 

        }
      )
      .catch(
        error=>{
          this.errorMessage=error.error_description;
        }
      );
    }
    
  }

  apretarRecuperarCuenta(){
    console.log("apretamos recuperar cuenta");
    if(this.password1.length==0 || this.password2.length==0){
      this.errorMessage="Debe completar todos los campos";
    }
    else{
      if(this.password1!=this.password2){
        this.errorMessage="Las contrase&ntilde;as deben coincidir";
      }
      else{
        this.recuperarCuenta.cambiarContraseniaRecuperarCuenta(this.usuario,this.codigo,this.password1)
        .then(
          response=>{
            console.log("cuenta recuperada");
            this.iniciarSesionSeleccionado=true;
            this.recuperarSeleccionado=false;
            this.registrarSeleccionado=false;
            
          }
        )
        .catch(
          error=>{
            this.errorMessage=error.error_description;
          }
        );
      }
    }

    
    
  }

  //TERMINA RECUPERAR CUENTA

 


}
