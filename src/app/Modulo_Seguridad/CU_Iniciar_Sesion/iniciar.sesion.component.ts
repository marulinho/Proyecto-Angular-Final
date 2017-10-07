import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../app.service';
import { IniciarSesionService,Usuario } from './iniciar.sesion.service';
import { RegistrarUsuarioService } from '../CU_Registrar_Usuario/registrar.usuario.service';
import { RecuperarCuentaService,ResultadoRecuperacion } from '../CU_Recuperar_Cuenta/recuperar.cuenta.service';


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
  domicilio:string;
  fechaNacimiento;
  email:string;
  usuario:string;
  password1:string;
  password2:string;
  exitoRegistracion:boolean;

  //ATRIBUTOS RECUPERAR CUENTA
  recuperarSeleccionado:boolean;
  codigo:string;
  usuarioRecuperado:ResultadoRecuperacion;
  

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
          this.usuarioLogeado=response.datos_operacion;
          this.inicioSesion=true;
          this.router.navigate(['/dashboard/']);
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
    this.domicilio="";
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

  apretarRegistrarUsuario() {
    this.registrarUsuario.registrarUsuario(this.nombre, this.apellido, this.dni, this.cuit,
      this.fechaNacimiento, this.domicilio, this.email, this.usuario, this.password1)
      .then(
      response => {
          this.iniciarSesionSeleccionado = true;
          this.registrarSeleccionado = false;
          this.errorMessage = "";
        }
      )
      .catch(
        error => {
          this.errorMessage = error.error_description;
        }
      );
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

  apretarNextRecuperar(){
      console.log("verificamos el email ");
      if(this.email.length==0){
        this.errorMessage="Debe completar todos los campos (*).";
      }
      else{
        this.recuperarCuenta.recuperarCuenta(this.email)
        .then(
          response=>{
            this.usuarioRecuperado=response.detalle_operacion;
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

  apretarNextRegistrar(){
    if(this.selectIndex==0){
      if(this.nombre=="" || this.nombre==null ||
        this.apellido=="" || this.apellido==null ||
        this.email=="" || this.email==null ||
        this.dni==null || this.cuit==null ||
        this.fechaNacimiento==null ||
        this.domicilio=="" || this.domicilio==null){
          this.errorMessage="Debe completar todos los campos obligatorios (*)."
        }
      else{
        this.selectIndex= this.selectIndex + 1;
        this.errorMessage="";
      }
    }
    else{
      if(this.selectIndex==1){
        if(this.usuario=="" || this.usuario==null ||
          this.password1=="" || this.password1==null ||
          this.password2==""  || this.password2==null){
            this.errorMessage="Debe completar todos los campos obligatorios (*).";
        }
        else{
          if (this.password1 != this.password2) {
            this.errorMessage=("Las contraseñas deben coincidir.");
          }
          else{
            this.errorMessage="";
            this.selectIndex= this.selectIndex+1;
          }
        }
     }
    }
}
    
  apretarRecuperarCuenta(){
    console.log("apretamos recuperar cuenta");
    if(this.password1.length==0 || this.password2.length==0){
      this.errorMessage="Debe completar todos los campos";
    }
    else{
      if(this.password1!=this.password2){
        this.errorMessage="Las contraseñas deben coincidir";
      }
      else{
        this.recuperarCuenta.cambiarContraseniaRecuperarCuenta(this.usuario,this.codigo,this.password1)
        .then(
          response=>{
            console.log("cuenta recuperada");
            this.errorMessage="";
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
 



