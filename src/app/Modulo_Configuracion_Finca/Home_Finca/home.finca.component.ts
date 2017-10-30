import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Ng2SmartTableModule,LocalDataSource } from 'ng2-smart-table';
import { HomeFincaService, Finca } from './home.finca.service';
import { AppService } from '../../app.service';
import { ErroresSistema } from '../../Datos_Sistema/errores.sistema';


@Component({
    selector:'homeFinca',
    templateUrl: './home.finca.component.html',
    styleUrls:['./home.finca.component.css']
    
})

export class HomeFincaComponent implements OnInit{
    
    position = 'above';
    tooltipCrearFinca='Crear Finca';
    tooltipVer="Ver Finca";

    erroresSistema= new ErroresSistema();

    //ATRIBUTOS LLAMADA FINCAS USUARIO
    fincasUsuario=[];
    fincasUsuarioSeleccionado:Boolean;
    rolesUnicos=new Array;
    errorMessageFincasUsuario:string;
    //source: LocalDataSource;
    fincasSinRolEncargado=[];
    /*settings = {
        actions:{
              columnTitle:'Acción',
              add:false,
              delete:false,
              edit:false
          }, 

        columns: {
          nombreFinca: {
            title: 'Nombre',
            filter: false,
            width:'37%'
          },
          nombreRol: {
            title: 'Rol',
            filter: false,
            width:'36%'
          },
          idFinca: {
            title: 'Ubicación',
            filter: false,
          },
          acciones:{
            title:'Acción',
            filter:false,
            type:'html',
            valuePrepareFunction: (value=10)=>{
                console.log("vvalor: "+value);
                return '<a href="http://localhost:4200/#/homeFincaDetalle/${idFinca}"><img src="assets/icons/ver.png"></a>'
            }
          }
        }
      };
    */

    //ATRIBUTOS LLAMADA FINCAS ENCARGADO
    fincasEncargado=[];
    fincasEncargadoSeleccionado:Boolean;
    errorMessageFincasEncargado:string;
    idFincasEncargado=[];

    //ATRIBUTOS FINCAS PENDIENTES
    errorMessageFincasPendientes:string="";
    fincasPendientesAprobacion=[];   
    fincasPendientesSeleccionado:Boolean;

    //ATRIBUTOS FINCA DESHABILITADAS
    errorMessageFincasDeshabilitadas:string="";
    fincasDeshabilitadas=[];   
    idFincasDeshabilitadas=[];
    tooltipHabilitarFinca='Habilitar Finca';
    fincasDeshabilitadasSeleccionado:Boolean;
    
    
    constructor(private router:Router,
                private homeFincaService:HomeFincaService,
                private appService:AppService ){
                    
           appService.getState().topnavTitle = 'Home Finca';
                    

    }

    ngOnInit(){

        this.homeFincaService.obtenerFincasUsuario()
            .then(
                    response=>{
                        if(response.detalle_operacion=="No hay datos"){
                            this.errorMessageFincasUsuario="No existen fincas asociadas al usuario con el rol especificado.";
                            this.errorMessageFincasEncargado="No existen fincas asociadas al usuario con el rol especificado.";
                            this.errorMessageFincasDeshabilitadas="No existen fincas asociadas al usuario con el estado especificado.";
                            this.errorMessageFincasPendientes="No existen fincas asociadas al usuario con el estado especificado.";
                        }
                        else{
                            this.fincasUsuario=response.datos_operacion;
                            //this.source = new LocalDataSource(this.fincasUsuario);                            
                            this.obtenerFincasNoEncargado();                            
                        }
                    }
                )
            .catch(
                error=>{
                    if(error.error_description==this.erroresSistema.getInicioSesion()){
                        this.router.navigate(['/login/']);
                    }
                    else{
                        this.errorMessageFincasUsuario=error.error_description;
                    }
                }
            );
    }

    /*onSearch(query: string = '') {
        if(query==""){
          this.source = new LocalDataSource(this.fincasUsuario);
        }
        else{
          this.source.setFilter([
            {
              field: 'nombreFinca',
              search: query,
            },
            {
              field: 'nombreRol',
              search: query,
            },
            {
              field: 'idFinca',
              search: query,
            }
          ],false);
        }
   
    }*/

    getFincasEncargado(){
        return this.fincasEncargadoSeleccionado;
    }

    getFincasUsuario(){
        return this.fincasUsuarioSeleccionado;
    }

    getFincasPendientes(){
        return this.fincasPendientesSeleccionado;
    }

    getFincasDeshabilitadas(){
        return this.fincasDeshabilitadasSeleccionado;
    }

    apretarNuevaFincaIcono(){
        this.router.navigate(['/crearFinca/']);
    }

    obtenerFincasNoEncargado(){
        let fincas=this.fincasUsuario;
        let longitud=Object.keys(fincas).length;
        console.log("logitud "+longitud);

        for(var i=0;i<longitud;i++){
            let estadoActual= fincas[i]['estadoFinca'];
            let rolActual= fincas[i]['nombreRol'];
            let idFinca=fincas[i]['idFinca'];
            let ubicacion=[];

            if(estadoActual=="habilitado"){
                if(rolActual=="encargado"){
                    ubicacion=fincas[i]['ubicacion'].split(";");
                    fincas[i]['ubicacion']=ubicacion;
                    this.fincasEncargado.push(fincas[i]);
                }
                else{
                    ubicacion=fincas[i]['ubicacion'].split(";");
                    fincas[i]['ubicacion']=ubicacion;
                    this.fincasSinRolEncargado.push(fincas[i]);
                }
            }
            else{
                if(estadoActual=="deshabilitado"){
                    if(this.idFincasDeshabilitadas.includes(idFinca)){
                        //no hago nada
                    }
                    else{
                        ubicacion=fincas[i]['ubicacion'].split(";");
                        fincas[i]['ubicacion']=ubicacion;
                        this.idFincasDeshabilitadas.push(idFinca);
                        this.fincasDeshabilitadas.push(fincas[i]);
                    }
                    
                }
                else{
                    if(estadoActual=="pendiente_aprobacion"){
                        ubicacion=fincas[i]['ubicacion'].split(";");
                        fincas[i]['ubicacion']=ubicacion;
                        this.fincasPendientesAprobacion.push(fincas[i]);
                    }
                }
            }
        }
        //HABILITACION DE LA TABLA FINCAS ENCARGADO
        if(this.fincasEncargado.length==0){
            this.errorMessageFincasEncargado="No existen fincas asociadas al usuario con el rol especificado.";
        }
        else{
            this.fincasEncargadoSeleccionado=true;            
        }

        //HABILITACION DE LA TABLA FINCAS USUARIOS
        if(this.fincasSinRolEncargado.length==0){
            this.errorMessageFincasUsuario="No existen fincas asociadas al usuario con el rol especificado.";
        }
        else{
            this.fincasUsuarioSeleccionado=true;
        }

        //HABILITACION DE LA TABLA FINCAS PENDIENTES
        if(this.fincasPendientesAprobacion.length==0){
            this.errorMessageFincasPendientes="No existen fincas asociadas al usuario con el estado especificado.";
        }
        else{
            this.fincasPendientesSeleccionado=true;    
        }

        //HABILITACION DE LA TABLA FINCAS DESHABILITADAS
        if(this.fincasDeshabilitadas.length==0){
            this.errorMessageFincasDeshabilitadas="No existen fincas asociadas al usuario con el estado especificado.";
        }
        else{
            this.fincasDeshabilitadasSeleccionado=true;
        }
    }

    apretarHabilitarFinca(idFinca:number){
        this.homeFincaService.habilitarFinca(idFinca)
            .then(
                response=>{
                    this.refresh();
                }
            )
            .catch(
                error=>{
                    this.errorMessageFincasDeshabilitadas=error.error_description;
                }
            );
    }

    apretarIconoVerFinca(idFinca:number,idUsuarioFinca:number){
        localStorage.setItem('idFinca',JSON.stringify(idFinca));
        localStorage.setItem('idUsuarioFinca',JSON.stringify(idUsuarioFinca));
        this.router.navigate(['/homeFincaDetalle/'+idFinca]);
    }

    refresh(): void {
        window.location.reload();
    }
}


