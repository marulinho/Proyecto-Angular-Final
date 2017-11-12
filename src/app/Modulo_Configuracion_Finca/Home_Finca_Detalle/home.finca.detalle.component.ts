import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../../app.service';
import { DialogExampleComponent } from '../../shared/dialog/dialog-example/dialog-example.component';
import { MdDialog } from '@angular/material';
import { HomeFincaDetalleService } from './home.finca.detalle.service';
import { GestionarFincaService,Finca } from '../CU_Gestionar_Finca/gestionar.finca.service';
import { GestionarUsuarioFincaService, Usuario, Roles } from '../CU_Gestionar_Usuario_Finca/gestionar.usuario.finca.service';
import { GestionarUsuarioFincaComponent } from '../CU_Gestionar_Usuario_Finca/gestionar.usuario.finca.component';
import { GestionarSectorFincaService, Sector } from'../../Modulo_Configuracion_Sectores/CU_Gestionar_Sector/gestionar.sector.service';
import { GestionarProveedorInformacionService, ProveedorInformacion } from '../../Modulo_Obtencion_Informacion_Externa/CU_Gestionar_Proveedor_Informacion/gestionar.proveedor.service';
import { AsignarMecanismoRiegoFincaService , MecanismoRiego } from '../CU_Asignar_Mecanismo_Riego_Finca/asignar.mecanismo.riego.finca.service';
import { ABMSensorFincaService, Sensor } from '../../Modulo_Sensores/ABM_Sensores/abm.sensores.service';
import { GestionarComponenteSensorService, ComponenteSensor } from '../../Modulo_Sensores/ABM_Componente_Sensor/gestionar.componente.sensor.service';
import { ErroresSistema } from '../../Datos_Sistema/errores.sistema';
import { PermisosSistema } from '../../Datos_Sistema/permisos.sistema';


@Component({
    selector:'homeFincaDetalle',
    templateUrl: './home.finca.detalle.component.html',
    styleUrls:['./home.finca.detalle.component.css']
    
})

export class HomeFincaDetalleComponent implements OnInit{
    //ATRIBUTOS GENERALES
        idFinca:number=JSON.parse(localStorage.getItem('idFinca'));
        position = 'above';    
        title:string="";
        description:string="";
        option1:string="";
        option2:string="";
        erroresSistema = new ErroresSistema();
        cargarTodo:Boolean=false;

    //ATRIBUTOS PERFIL FINCA
        errorMessagePerfilFinca="";
        perfilFinca: Finca;
        perfilFincaSeleccionada:Boolean;
        tamanioOcupado:number;
        tamanioDisponible:number;
        tamanio: number;
        ubicacion=[];
        tooltipEditarFinca='Editar Finca.';
        tooltipAtras = 'Volver HomeFinca.';
        permisoGestionarFinca;
    //ATRIBUTOS ELIMINAR FINCA
        tooltipEliminarFinca='Eliminar Finca.';
        selectedOption:string;

    //ATRIBUTOS USUARIO FINCA
        idUsuarioFinca:number;
        errorMessageUsuarioFinca:string;
        tooltipAgregarUsuario='Agregar Usuario.';
        tooltipEditarUsuario='Editar Usuario.';
        tooltipEliminarUsuario='Eliminar Usuario.';    
        usuariosFincaSeleccionado:Boolean;
        modificarUsuarioFincaSeleccionado:Boolean;
        usuariosFinca:Usuario;
        roles:Roles;
        nombreRol:string;
        permisoGestionarUsuario;

    //ATRIBUTOS SECTORES FINCA
        errorMessageSectoresFinca="";
        tooltipVerSector='Ver Sector.';
        tooltipAgregarSector='Agregar Sector.';    
        sectoresFincaSeleccionado:Boolean;
        sectoresFinca:Sector;
        idSector:number;
        permisoGestionarSector;
        permisoCrearSector;
    
    //ATRIBUTOS PROVEEDORES
        proveedores:ProveedorInformacion;
        errorMessageProveedor="";
        nombreProveedor:string;
        proveedorInformacionSeleccionado:Boolean;
        tooltipEditarProveedor='Editar Proveedor.';
        tooltipEliminarProveedor='Eliminar Proveedor.';    
        tooltipCambiarProveedor='Cambiar Proveedor.';
        permisoConfigurarObtencionInformacion;
    
    //ATRIBUTOS MECANISMOS RIEGO FINCA
        mecanismosRiegoFinca:MecanismoRiego;
        errorMessageMecanismosRiegoFinca="";
        mecanismosRiegoFincaSeleccionado:Boolean;
        tooltipAgregarMecanismo='Agregar Mecanismo.';
        tooltipHabilitarMecanismo='Habilitar Mecanismo.';
        tooltipDeshabilitarMecanismo='Deshabilitar Mecanismo.';
        permisoAsignarMecanismoFinca;

    //ATRIBUTOS SENSORES FINCA
        errorMessageSensoresFinca:string="";
        perfilSensoresFincaSeleccionado:Boolean;
        sensoresFinca:Sensor;
        tooltipAgregarSensor='Agregar Sensor.';
        tooltipDeshabilitarSensor='Deshabilitar Sensor.';
        tooltipModificarSensor='Modificar Sensor.';
        permisoGestionarSensores;

    //ATRIBUTOS COMPONENTE SENSOR FINCA
        errorMessageComponentSensorFinca:string="";
        perfilComponenteSensorSeleccionado:Boolean;
        componenteSensores:ComponenteSensor;
        tooltipAgregarComponenteSensor='Crear Componente Sensor.';
        tooltipVerComponenteSensor='Ver Componente Sensor.';
        tooltipHabilitarComponenteSensor='Ver Componente Sensor.';
        permisoGestionarComponenteSensor;
        permisoCrearComponenteSensor;

    constructor(private router:Router,
                private route:ActivatedRoute,
                private homeFincaDetalleService:HomeFincaDetalleService,
                private gestionarFincaService:GestionarFincaService,
                private gestionarUsuarioFincaService:GestionarUsuarioFincaService,
                private gestionarSectorFincaService:GestionarSectorFincaService,
                private gestionarProveedorInformacionService:GestionarProveedorInformacionService,
                private asignarMecanismoRiegoFincaService: AsignarMecanismoRiegoFincaService,
                private abmSensorFincaService:ABMSensorFincaService,
                private gestionarComponenteSensorService: GestionarComponenteSensorService,
                private appService:AppService,
                private dialog: MdDialog){

        appService.getState().topnavTitle="Home Finca Detalle";


    }

    ngOnInit(){
        this.homeFincaDetalleService.devolverPermisos(this.idFinca)
            .then(
                response=>{
                    let permisos = new PermisosSistema(response.datos_operacion);
                    
                    this.permisoGestionarFinca=JSON.parse(localStorage.getItem('puedeGestionarFinca'));
                    this.permisoGestionarUsuario=JSON.parse(localStorage.getItem('puedeGestionarUsuariosFinca'));
                    this.permisoGestionarSector=JSON.parse(localStorage.getItem('puedeGestionarSector'));
                    this.permisoCrearSector=JSON.parse(localStorage.getItem('puedeCrearSector'));
                    this.permisoConfigurarObtencionInformacion=JSON.parse(localStorage.getItem('puedeConfigurarObtencionInfoExterna'));
                    this.permisoAsignarMecanismoFinca=JSON.parse(localStorage.getItem('puedeAsignarMecRiegoAFinca'));
                    this.permisoGestionarSensores=JSON.parse(localStorage.getItem('puedeGestionarSensores'));
                    this.permisoGestionarComponenteSensor=JSON.parse(localStorage.getItem('puedeGestionarComponenteSensor'));
                    this.permisoCrearComponenteSensor=JSON.parse(localStorage.getItem('puedeCrearComponenteSensor'));
                    
                }
            )
            .catch(
                error=>{
                    if(error.error_description==this.erroresSistema.getInicioSesion()){
                        this.router.navigate(['/login/']);
                    }
                    else{
                        this.errorMessagePerfilFinca=error.error_description;
                    }
                    
                }
            );
        this.homeFincaDetalleService.buscarFinca(this.idFinca)
            .then(
                response=>{
                    this.perfilFinca=response.datos_operacion;
                    this.ubicacion=this.perfilFinca['ubicacion'].split(";");
                    this.tamanio = this.perfilFinca['tamanio'];
                    this.perfilFincaSeleccionada=true;
                }
            )
            .catch(
                error=>{
                    if(error.error_description==this.erroresSistema.getInicioSesion()){
                        this.router.navigate(['/login/']);
                    }
                    else{
                        this.errorMessagePerfilFinca=error.error_description;
                    }
                }
            );
        this.gestionarUsuarioFincaService.buscarUsuarioFinca(this.idFinca)
            .then(
                response=>{
                    if(response.detalle_operacion=="No hay datos"){
                        this.errorMessageUsuarioFinca="No hay usuarios asociados a la finca seleccionada.";
                        this.usuariosFincaSeleccionado=false;
                    }
                    else{
                        this.usuariosFinca=response.datos_operacion;
                        this.usuariosFincaSeleccionado=true;
                    }
                }
            )
            .catch(
                error=>{
                    if(error.error_description==this.erroresSistema.getInicioSesion()){
                        this.router.navigate(['/login/']);
                    }
                    else{
                        this.errorMessageUsuarioFinca=error.error_description;
                    }
                }
            );

        this.gestionarSectorFincaService.buscarSectoresFinca(this.idFinca)
            .then(
                response=>{
                    if(response.detalle_operacion=="No hay datos"){
                        this.errorMessageSectoresFinca="No hay sectores asociados a la finca seleccionada.";
                        this.sectoresFincaSeleccionado=false;
                        this.tamanioOcupado = 0;
                        this.tamanioDisponible = this.tamanio;
                        localStorage.setItem('tamanioDisponible',JSON.stringify(this.tamanioDisponible));
                    }
                    else{
                        this.sectoresFinca=response.datos_operacion;
                        let longitud = response.datos_operacion.length;
                        this.sectoresFincaSeleccionado=true;
                        this.determinarTamanios(longitud);
                        

                    }
                }
            )
            .catch(
                error=>{
                    if(error.error_description==this.erroresSistema.getInicioSesion()){
                        this.router.navigate(['/login/']);
                    }
                    else{
                        this.errorMessageSectoresFinca=error.error_description;
                    }
                }
            );

        this.gestionarProveedorInformacionService.obtenerProveedores(this.idFinca)
            .then(
                response=>{
                    if(response.detalle_operacion=="No hay datos"){
                        this.errorMessageProveedor="No hay proveedores asociados a la finca seleccionada.";
                    }
                    else{
                        this.proveedores=response.datos_operacion;
                        this.errorMessageProveedor="";
                        this.nombreProveedor=this.proveedores['nombreProveedor'];
                        this.proveedorInformacionSeleccionado=true;
                    }
                    
                }
            )
            .catch(
                error=>{
                    if(error.error_description==this.erroresSistema.getInicioSesion()){
                        this.router.navigate(['/login/']);
                    }
                    else{
                        this.errorMessageProveedor=error.error_description;
                    }
                }
            );
        
        this.asignarMecanismoRiegoFincaService.mostrarMecanismoRiegoFinca(this.idFinca)
            .then(
                response=>{
                    if(response.detalle_operacion=="No hay datos"){
                        this.errorMessageMecanismosRiegoFinca="No hay mecanismos de riego asociados a la finca.";
                    }
                    else{
                        this.mecanismosRiegoFinca=response.datos_operacion;
                        this.mecanismosRiegoFincaSeleccionado=true;
                    }
                }
            )
            .catch(
                error=>{
                    if(error.error_description==this.erroresSistema.getInicioSesion()){
                        this.router.navigate(['/login/']);
                    }
                    else{
                        this.errorMessageMecanismosRiegoFinca=error.error_description;
                    }
                }
            );
        
        this.abmSensorFincaService.mostrarSensoresFinca(this.idFinca)
            .then(
                response=>{
                    if(response.detalle_operacion=="No hay datos"){
                        this.errorMessageSensoresFinca="No hay sensores asociados a la finca.";
                    }
                    else{
                        this.sensoresFinca=response.datos_operacion;
                        this.perfilSensoresFincaSeleccionado=true;
                    }
                }
            )
            .catch(
                error=>{
                    if(error.error_description==this.erroresSistema.getInicioSesion()){
                        this.router.navigate(['/login/']);
                    }
                    else{
                        this.errorMessageSectoresFinca=error.error_description;
                    }
                }
            );

        this.gestionarComponenteSensorService.buscarComponente(this.idFinca)
            .then(
                response=>{
                    if(response.detalle_operacion=="No hay datos"){
                        this.errorMessageComponentSensorFinca="No hay componentes sensores asociados a la finca.";
                    }
                    else{
                        this.componenteSensores=response.datos_operacion;
                        this.perfilComponenteSensorSeleccionado=true;
                    }
                }
            )
            .catch(
                error=>{
                    if(error.error_description==this.erroresSistema.getInicioSesion()){
                        this.router.navigate(['/login/']);
                    }
                    else{
                        this.errorMessageComponentSensorFinca=error.error_description;
                    }
                }
            );
        this.cargarTodo=true;
    }
    getCargarTodo(){
        return this.cargarTodo;
    }

    getPermisosGestionarFinca(){
        return this.permisoGestionarFinca;
    }
    getPermisoGestionarUsuario(){
        return this.permisoGestionarUsuario;
    }
    getPermisoGestionarSector(){
        return this.permisoGestionarSector;
    }
    getPermisoCrearSector(){
        return this.permisoCrearSector;
    }
    getPermisoConfigurarObtencionInformacion(){
        return this.permisoConfigurarObtencionInformacion;
    }
    getPermisoAsignarMecanismoFinca(){
        return this.permisoAsignarMecanismoFinca;
    }
    getPermisoGestionarSensores(){
        return this.permisoGestionarSensores;
    }
    getPermisoGestionarComponenteSensor(){
        return this.permisoGestionarComponenteSensor;
    }
    getPermisoCrearComponenteSensor(){
        return this.permisoCrearComponenteSensor;
    }

    getPerfilFincaSeleccionada(){
        return this.perfilFincaSeleccionada;
    }
    
    getUsuariosFincaSeleccionado(){
        return this.usuariosFincaSeleccionado;
    }
    
    getSectoresFincaSeleccionado(){
        return this.sectoresFincaSeleccionado;
    }

    getProveedorInformacionSeleccionado(){
        return this.proveedorInformacionSeleccionado;
    }

    getMecanismoRiegoFincaSeleccionado(){
        return this.mecanismosRiegoFincaSeleccionado;
    }

    getModificarUsuarioFincaSeleccionado(){
        return this.modificarUsuarioFincaSeleccionado;
    }

    getPerfilSensoresFincaSeleccionado(){
        return this.perfilSensoresFincaSeleccionado;
    }

    getPerfilComponenteSensorSeleccionado(){
        return this.perfilComponenteSensorSeleccionado;
    }

    determinarTamanios(longitud){
        let tamanioOcupado = 0;
        for(var i = 0; i<longitud;i++){
            tamanioOcupado = tamanioOcupado + this.sectoresFinca[i]["superficieSector"];
        }
        this.tamanioOcupado = tamanioOcupado;
        console.log(this.tamanioOcupado);
        if(this.tamanioOcupado == null ){
            this.tamanioOcupado=0;
        }
        this.tamanioDisponible = this.perfilFinca["tamanio"] - this.tamanioOcupado;
        console.log(this.tamanioDisponible  );
        if(this.tamanioDisponible == null || this.tamanioDisponible <0){
            this.tamanioDisponible=0;
        }
        
        console.log(tamanioOcupado);
        console.log(this.tamanioDisponible);
        localStorage.setItem('tamanioDisponible',JSON.stringify(this.tamanioDisponible));
    }
    
    apretarEliminarFincaIcono(){
        this.title="Eliminar Finca";
        this.description="¿Desea eliminar la finca?";
        this.option1="Aceptar";
        this.option2="Cancelar";
        this.openDialogEliminarFinca();        
    }

    apretarEliminarUsuarioIcono(id:number){
        this.idUsuarioFinca=id;
        console.log("apretamos eliminar usuario finca");
        this.title="Eliminar Usuario Finca";
        this.description="¿Desea eliminar al usuario de la finca?";
        this.option1="Aceptar";
        this.option2="Cancelar";
        this.openDialogEliminarUsuarioFinca();     
    }

    apretarEditarUsuarioFincaIcono(id:number){
        this.idUsuarioFinca=id;
        this.gestionarUsuarioFincaService.buscarRoles()
            .then(
                response=>{
                        this.roles=response.datos_operacion;
                        this.perfilFincaSeleccionada=false;
                        this.modificarUsuarioFincaSeleccionado=true;
                }
            )
            .catch(
                error=>{
                    this.errorMessageUsuarioFinca=error.error_description;
                }
            );
    }

    apretarCambiarRol(){
        if(this.nombreRol=="" || this.nombreRol==null){
            this.errorMessageUsuarioFinca="Debe completar todos los campos obligatorios (*).";
        }
        else{
            this.gestionarUsuarioFincaService.modificarRolUsuario(this.idUsuarioFinca,this.idFinca,this.nombreRol)
                .then(
                    response=>{
                        this.errorMessageUsuarioFinca="";
                        this.refresh();
                    }
                )
                .catch(
                    error=>{
                        this.errorMessageUsuarioFinca=error.error_description;
                    }
                );
        }
    }

    apretarSalir(){
        this.perfilFincaSeleccionada=true;
    }

    apretarEliminarSectorIcono(idSector:number){
        this.idSector=idSector;
        this.title="Eliminar Sector";
        this.description="¿Desea eliminar el sector de la finca?";
        this.option1="Aceptar";
        this.option2="Cancelar";
        this.openDialogEliminarSectorFinca()
    }

    apretarEliminarProveedorIcono(){
        this.title="Eliminar Proveedor";
        this.description="¿Desea eliminar el proveedor de la finca?";
        this.option1="Aceptar";
        this.option2="Cancelar";
        this.openDialogEliminarProveedorInformacion();
    }

    apretarIconoDeshabilitarMecanismo(idMecanismoFinca:number){
        this.title="Deshabilitar Mecanismo de Riego";
        this.description="¿Desea deshabilitar el mecanismo?";
        this.option1="Aceptar";
        this.option2="Cancelar";
        this.openDialogDeshabilitarMecanismo(idMecanismoFinca); 
    }

    apretarIconoHabilitarMecanismo(idMecanismoFinca:number){
        this.title="Habilitar Mecanismo de Riego";
        this.description="¿Desea habilitar el mecanismo?";
        this.option1="Aceptar";
        this.option2="Cancelar";
        this.openDialogHabilitarMecanismo(idMecanismoFinca); 
    }

    apretarIconoHabilitarComponenteSensor(idComponenteSensor:number){
        this.title="Habilitar Componente Sensor";
        this.description="¿Desea habilitar el componente sensor?";
        this.option1="Aceptar";
        this.option2="Cancelar";
        this.openDialogHabilitarComponenteSensor(idComponenteSensor); 
    }

    apretarDeshabilitarSensorFinca(idSensor:number){
        this.title="Deshabilitar Sensor";
        this.description="¿Desea deshabilitar el sensor de la finca?";
        this.option1="Aceptar";
        this.option2="Cancelar";
        this.openDialoDeshabilitarSensorFinca(idSensor);
    }

    openDialogDeshabilitarMecanismo(idMecanismoFinca:number){
        let dialogRef = this.dialog.open(DialogExampleComponent);
        dialogRef.componentInstance.title=this.title;
        dialogRef.componentInstance.description=this.description;
        dialogRef.componentInstance.option1=this.option1;
        dialogRef.componentInstance.option2=this.option2;
        dialogRef.afterClosed().subscribe(
            result => {
                        this.selectedOption = result;
                        if(this.selectedOption==="Aceptar"){
                            this.asignarMecanismoRiegoFincaService.deshabilitarMecanismoFinca(this.idFinca,idMecanismoFinca)
                                .then(
                                    response=>{
                                        this.refresh();
                                    }
                                )
                                .catch(
                                    error=>{
                                        this.errorMessageMecanismosRiegoFinca=error.error_description;
                                    }
                                )
                        }
                        this.title="";
                        this.description="";
                        this.option1="";
                        this.option2="";
            });
    }

    openDialoDeshabilitarSensorFinca(idSensor:number){
        let dialogRef = this.dialog.open(DialogExampleComponent);
        dialogRef.componentInstance.title=this.title;
        dialogRef.componentInstance.description=this.description;
        dialogRef.componentInstance.option1=this.option1;
        dialogRef.componentInstance.option2=this.option2;
        dialogRef.afterClosed().subscribe(
            result => {
                        this.selectedOption = result;
                        if(this.selectedOption==="Aceptar"){
                            this.abmSensorFincaService.deshabilitarSensor(idSensor,this.idFinca)
                            .then(
                                response=>{
                                    this.refresh();
                                }
                            )
                            .catch(
                                error=>{
                                    this.errorMessageSensoresFinca=error.error_description;
                                }
                            );
                        }
                        this.title="";
                        this.description="";
                        this.option1="";
                        this.option2="";
            });
    }

    openDialogHabilitarComponenteSensor(idComponenteSensor:number){
        let dialogRef = this.dialog.open(DialogExampleComponent);
        dialogRef.componentInstance.title=this.title;
        dialogRef.componentInstance.description=this.description;
        dialogRef.componentInstance.option1=this.option1;
        dialogRef.componentInstance.option2=this.option2;
        dialogRef.afterClosed().subscribe(
            result => {
                        this.selectedOption = result;
                        if(this.selectedOption==="Aceptar"){
                            this.gestionarComponenteSensorService.habilitarComponenteSensor(this.idFinca,idComponenteSensor)
                            .then(
                                response=>{
                                    this.refresh();
                                }
                            )
                            .catch(
                                error=>{
                                    this.errorMessageComponentSensorFinca=error.error_description;
                                }
                            );
                        }
                        this.title="";
                        this.description="";
                        this.option1="";
                        this.option2="";
            });
    }

    openDialogHabilitarMecanismo(idMecanismoFinca:number){
        let dialogRef = this.dialog.open(DialogExampleComponent);
        dialogRef.componentInstance.title=this.title;
        dialogRef.componentInstance.description=this.description;
        dialogRef.componentInstance.option1=this.option1;
        dialogRef.componentInstance.option2=this.option2;
        dialogRef.afterClosed().subscribe(
            result => {
                        this.selectedOption = result;
                        if(this.selectedOption==="Aceptar"){
                            this.asignarMecanismoRiegoFincaService.habilitarMecanismoFinca(this.idFinca,idMecanismoFinca)
                                .then(
                                    response=>{
                                        this.refresh();
                                    }
                                )
                                .catch(
                                    error=>{
                                        this.errorMessageMecanismosRiegoFinca=error.error_description;
                                    }
                                )
                        }
                        this.title="";
                        this.description="";
                        this.option1="";
                        this.option2="";
            });
    }
    
    openDialogEliminarFinca(){
        let dialogRef = this.dialog.open(DialogExampleComponent);
        dialogRef.componentInstance.title=this.title;
        dialogRef.componentInstance.description=this.description;
        dialogRef.componentInstance.option1=this.option1;
        dialogRef.componentInstance.option2=this.option2;
        dialogRef.afterClosed().subscribe(
            result => {
                        this.selectedOption = result;
                        if(this.selectedOption==="Aceptar"){
                            this.homeFincaDetalleService.eliminarFinca(this.idFinca)
                                .then(
                                    response=>{
                                        this.router.navigate(['/homeFinca/']);
                                    }
                                )
                                .catch(
                                    error=>{
                                        this.errorMessagePerfilFinca=error.error_description;
                                    }
                                )
                        }
                        this.title="";
                        this.description="";
                        this.option1="";
                        this.option2="";
            });
    }

    openDialogEliminarUsuarioFinca(){
        let dialogRef = this.dialog.open(DialogExampleComponent);
        dialogRef.componentInstance.title=this.title;
        dialogRef.componentInstance.description=this.description;
        dialogRef.componentInstance.option1=this.option1;
        dialogRef.componentInstance.option2=this.option2;
        dialogRef.afterClosed().subscribe(
            result => {
                        this.selectedOption = result;
                        if(this.selectedOption==="Aceptar"){
                            this.gestionarUsuarioFincaService.eliminarUsuarioFinca(this.idUsuarioFinca,this.idFinca)
                                .then(
                                    response=>{
                                        this.errorMessageUsuarioFinca="";
                                        this.refresh();
                                    }
                                )
                                .catch(
                                    error=>{
                                        this.errorMessagePerfilFinca=error.error_description;
                                    }
                                )
                        }
                        this.title="";
                        this.description="";
                        this.option1="";
                        this.option2="";
            });
    }

    openDialogEliminarSectorFinca(){
        let dialogRef = this.dialog.open(DialogExampleComponent);
        dialogRef.componentInstance.title=this.title;
        dialogRef.componentInstance.description=this.description;
        dialogRef.componentInstance.option1=this.option1;
        dialogRef.componentInstance.option2=this.option2;
        dialogRef.afterClosed().subscribe(
            result => {
                        this.selectedOption = result;
                        if(this.selectedOption==="Aceptar"){
                            this.gestionarSectorFincaService.eliminarSectorFinca(this.idSector,this.idFinca)
                                .then(
                                    response=>{
                                        this.refresh();
                                    }
                                )
                                .catch(
                                    error=>{
                                        this.errorMessagePerfilFinca=error.error_description;
                                    }
                                )
                        }
                        this.title="";
                        this.description="";
                        this.option1="";
                        this.option2="";
            });
    }

    openDialogEliminarProveedorInformacion(){
        let dialogRef = this.dialog.open(DialogExampleComponent);
        dialogRef.componentInstance.title=this.title;
        dialogRef.componentInstance.description=this.description;
        dialogRef.componentInstance.option1=this.option1;
        dialogRef.componentInstance.option2=this.option2;
        dialogRef.afterClosed().subscribe(
            result => {
                        this.selectedOption = result;
                        if(this.selectedOption==="Aceptar"){
                            this.gestionarProveedorInformacionService.deshabilitarProveedor(this.idFinca,this.nombreProveedor)
                                .then(
                                    response=>{
                                        this.refresh();
                                    }
                                )
                                .catch(
                                    error=>{
                                        this.errorMessageProveedor=error.error_description;
                                    }
                                )
                        }
                        this.title="";
                        this.description="";
                        this.option1="";
                        this.option2="";
            });
    }
    
    apretarVerSector(idSector:number){
        localStorage.setItem('idSector',JSON.stringify(idSector));
        this.router.navigate(['/homeSector/']);
    }
    
    apretarModificarSensor(idSensor:number){
        localStorage.setItem('idSensor',JSON.stringify(idSensor));
        this.router.navigate(['/modificarSensorFinca/']);
    }

    verComponenteSensor(idComponenteSensor:number){
        localStorage.setItem('idComponenteSensor',JSON.stringify(idComponenteSensor));
        this.router.navigate(['/homeComponenteSensorFinca/'])
    }
    refresh(): void {
        window.location.reload();
    }
    apretarAtras(){
        this.router.navigate(['/homeFinca/']);
    }
}