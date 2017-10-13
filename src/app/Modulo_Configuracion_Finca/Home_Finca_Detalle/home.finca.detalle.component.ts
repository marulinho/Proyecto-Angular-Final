import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../../app.service';
import { DialogExampleComponent } from '../../shared/dialog/dialog-example/dialog-example.component';
import { MdDialog } from '@angular/material';
import { HomeFincaDetalleService } from './home.finca.detalle.service';
import { GestionarFincaService,Finca } from '../CU_Gestionar_Finca/gestionar.finca.service';
import { GestionarUsuarioFincaService, UsuarioNoEncargado } from '../CU_Gestionar_Usuario_Finca/gestionar.usuario.finca.service';
import { GestionarUsuarioFincaComponent } from '../CU_Gestionar_Usuario_Finca/gestionar.usuario.finca.component';
import { GestionarSectorFincaService, Sector } from'../../Modulo_Configuracion_Sectores/CU_Gestionar_Sector/gestionar.sector.service';
import { GestionarProveedorInformacionService, ProveedorInformacion } from '../../Modulo_Obtencion_Informacion_Externa/CU_Gestionar_Proveedor_Informacion/gestionar.proveedor.service';

@Component({
    selector:'homeFincaDetalle',
    templateUrl: './home.finca.detalle.component.html',
    styleUrls:['./home.finca.detalle.component.css']
    
})

export class HomeFincaDetalleComponent implements OnInit{
    //ATRIBUTOS GENERALES
        idFinca:number;
        position = 'above';    
        permisos = new Array;
        title:string="";
        description:string="";
        option1:string="";
        option2:string="";

    //ATRIBUTOS PERFIL FINCA
        errorMessagePerfilFinca="";
        perfilFinca: Finca;
        perfilFincaSeleccionada:Boolean;
        tooltipEditarFinca='Editar Finca';
        
    //ATRIBUTOS ELIMINAR FINCA
        tooltipEliminarFinca='Eliminar Finca';
        selectedOption:string;

    //ATRIBUTOS USUARIO FINCA
        idUsuarioFinca:number;
        errorMessageUsuarioFinca:string;
        tooltipAgregarUsuario='Agregar Usuario';
        tooltipEditarUsuario='Editar Usuario';
        tooltipEliminarUsuario='Eliminar Usuario';    
        usuariosFincaSeleccionado:Boolean;
        usuariosFinca:UsuarioNoEncargado;

    //ATRIBUTOS SECTORES FINCA
        errorMessageSectoresFinca="";
        tooltipVerSector='Ver Sector';
        tooltipAgregarSector='Agregar Sector';
        tooltipEditarSector='Editar Sector';
        tooltipEliminarSector='Eliminar Sector';    
        sectoresFincaSeleccionado:Boolean;
        sectoresFinca:Sector;
        idSector:number;
    
    //ATRIBUTOS PROVEEDORES
        proveedores:ProveedorInformacion;
        errorMessageProveedor="";
        nombreProveedor:string;
        proveedorInformacionSeleccionado:Boolean;
        tooltipEditarProveedor='Editar Proveedor';
        tooltipEliminarProveedor='Eliminar Proveedor';    
        tooltipCambiarProveedor='Cambiar Proveedor';
        
    
    constructor(private router:Router,
                private route:ActivatedRoute,
                private homeFincaDetalleService:HomeFincaDetalleService,
                private gestionarFincaService:GestionarFincaService,
                private gestionarUsuarioFincaService:GestionarUsuarioFincaService,
                private gestionarSectorFincaService:GestionarSectorFincaService,
                private gestionarProveedorInformacionService:GestionarProveedorInformacionService,
                private appService:AppService,
                private dialog: MdDialog){

        appService.getState().topnavTitle="Home Finca Detalle";
        this.route.params.subscribe(params => {
            this.idFinca = +params['idFinca'];
            console.log("idFinca: "+this.idFinca);
            if (this.idFinca) {
                this.homeFincaDetalleService.buscarFinca(this.idFinca)
                .then(
                    response=>{
                        this.perfilFincaSeleccionada=true;
                        this.perfilFinca=response.datos_operacion;
                    }
                )
                .catch(
                    error=>{
                        this.errorMessagePerfilFinca=error.error_description;
                    }
                );
            }
        });

    }

    ngOnInit(){
        /*this.homeFincaDetalleService.devolverPermisos(this.idFinca)
            .then(
                response=>{

                }
            )
            .catch(
                error=>{
                    this.errorMessagePerfilFinca=error.error_description;
                }
            );*/
        this.gestionarUsuarioFincaService.buscarUsuariosNoEncargado(this.idFinca)
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
                    this.errorMessageUsuarioFinca=error.error_description;
                }
            );

        this.gestionarSectorFincaService.buscarSectoresFinca(this.idFinca)
            .then(
                response=>{
                    if(response.detalle_operacion=="No hay datos"){
                        this.errorMessageSectoresFinca="No hay sectores asociados a la finca seleccionada.";
                        this.sectoresFincaSeleccionado=false;
                    }
                    else{
                        this.sectoresFinca=response.datos_operacion;
                        this.sectoresFincaSeleccionado=true;
                    }
                }
            )
            .catch(
                error=>{
                    this.errorMessageSectoresFinca=error.error_description;
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
                    this.errorMessageProveedor=error.error_description;
                }
            )
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

    apretarEditarUsuarioIcono(){
        console.log("apretamos editar usuario finca");
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
                            this.gestionarUsuarioFincaService.eliminarUsuarioFinca(this.idUsuarioFinca)
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
                            this.gestionarSectorFincaService.eliminarSectorFinca(this.idSector)
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
    
    refresh(): void {
        window.location.reload();
    }
}
