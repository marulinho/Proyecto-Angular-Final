import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../../app.service';
import { HomeFincaDetalleService,Finca } from './home.finca.detalle.service';
import { GestionarFincaService,FincaModificada } from '../CU_Gestionar_Finca/gestionar.finca.service';
import { DialogExampleComponent } from '../../shared/dialog/dialog-example/dialog-example.component';
import { MdDialog } from '@angular/material';
import { GestionarUsuarioFincaService, UsuarioNoEncargado } from '../CU_Gestionar_Usuario_Finca/gestionar.usuario.finca.service';

@Component({
    selector:'homeFincaDetalle',
    templateUrl: './home.finca.detalle.component.html',
    styleUrls:['./home.finca.detalle.component.css']
    
})

export class HomeFincaDetalleComponent implements OnInit{
    
    idFinca:number;
    position = 'above';    
    permisos = new Array;

    //ATRIBUTOS PERFIL FINCA
    errorMessagePerfilFinca="";
    perfilFinca: Finca;
    perfilFincaSeleccionada:Boolean;
    tooltipEditarFinca='Editar Finca';
    
    //ATRIBUTOS EDITAR FINCA
    errorMessageEditarFinca="";    
    editarFincaSeleccionada:Boolean;
    nombre:string;
    ubicacion:string;
    direccion:string;
    tamanio:number;
    
    //ATRIBUTOS ELIMINAR FINCA
    tooltipEliminarFinca='Eliminar Finca';
    selectedOption:string;

    //ATRIBUTOS USUARIO FINCA
    errorMessageUsuarioFinca:string;
    tooltipAgregarUsuario='Agregar Usuario';
    usuariosFincaSeleccionado:Boolean;
    usuarioFinca:UsuarioNoEncargado;

    
    constructor(private router:Router,
                private route:ActivatedRoute,
                private homeFincaDetalleService:HomeFincaDetalleService,
                private gestionarFincaService:GestionarFincaService,
                private gestionarUsuarioFincaService:GestionarUsuarioFincaService,
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
                        this.usuarioFinca=response.datos_operacion;
                        this.usuariosFincaSeleccionado=true;
                    }
                }
            )
            .catch(
                error=>{
                    this.errorMessageUsuarioFinca=error.error_description;
                }
            );
    }

    getPerfilFincaSeleccionada(){
        return this.perfilFincaSeleccionada;
    }
    
    getUsuariosFincaSeleccionado(){
        return this.usuariosFincaSeleccionado;
    }

    getEditarFinca(){
        return this.editarFincaSeleccionada;
    }

    apretarEditarIcono(){
        this.perfilFincaSeleccionada=false;
        this.editarFincaSeleccionada=true;
    }

    apretarModificarFinca(){
        if( this.nombre=="" || this.nombre==null ||
            this.ubicacion=="" || this.ubicacion==null ||
            this.direccion=="" || this.direccion==null ||
            this.tamanio==null){
                this.errorMessageEditarFinca="Debe completar todos los campos obligatorios (*).";
            }
        else{
            this.gestionarFincaService.modificarFinca(this.idFinca,this.nombre,this.direccion,this.ubicacion,this.tamanio)
                    .then(
                        response=>{

                        }
                    )
                    .catch(
                        error=>{
                            this.errorMessageEditarFinca=error.error_description;
                        }
                    );
        }
    }

    apretarAgregarIcono(){
        console.log("apretamos agregar usuario");
    }

    apretarSalir(){
        this.errorMessageEditarFinca="";
        this.editarFincaSeleccionada=false;
        this.perfilFincaSeleccionada=true;
    }

    apretarEliminarIcono(){
        this.openDialog();        
    }

    openDialog(){
        let dialogRef = this.dialog.open(DialogExampleComponent);
        dialogRef.componentInstance.title="Eliminar Finca";
        dialogRef.componentInstance.description="¿Desea eliminar la finca?";
        dialogRef.componentInstance.option1="Aceptar";
        dialogRef.componentInstance.option2="Cancelar";
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
            });
    }

   
}
