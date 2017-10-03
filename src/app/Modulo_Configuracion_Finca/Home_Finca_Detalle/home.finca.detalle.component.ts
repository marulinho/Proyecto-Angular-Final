import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HomeFincaDetalleService,Finca } from './home.finca.detalle.service';
import { GestionarFincaService,FincaModificada } from '../CU_Gestionar_Finca/gestionar.finca.service';
import { AprobarFincaService } from '../CU_Aprobar_Finca/aprobar.finca.service';

@Component({
    selector:'homeFincaDetalle',
    templateUrl: './home.finca.detalle.component.html',
    styleUrls:['./home.finca.detalle.component.css']
    
})

export class HomeFincaDetalleComponent implements OnInit{
    fincaEncontrada:Finca;
    fincaModificada:FincaModificada;
    editar:Boolean;
    idFinca;
    fincaEliminada:any;
    fincaAprobada:any;

    
    constructor(private router:Router,
                private route:ActivatedRoute,
                private homeFincaDetalleService:HomeFincaDetalleService,
                private gestionarFincaService:GestionarFincaService,
                private aprobarFincaService:AprobarFincaService){
        this.route.params.subscribe(params => {
        this.idFinca = +params['idFinca'];
        console.log("idFinca: "+this.idFinca);
        if (this.idFinca) {
            this.homeFincaDetalleService.buscarFinca(this.idFinca)
            .then(
                finca => this.fincaEncontrada = finca
            );
        }

        });

    }

    ngOnInit(){
        this.editar=false;
    
    }

    apretarEditarFinca(){
        this.editar=true;
    }
 
    apretarModificarFinca(nombre:string,direccion:string,ubicacion:string,tamanio:number){
        this.editar=false;
        this.gestionarFincaService.modificarFinca(this.idFinca,nombre,direccion,ubicacion,tamanio)
        .then(
            response=>this.fincaModificada=response
        )
        /*this.homeFincaDetalleService.modificarFinca(nombre,direccion,ubicacion,tamanio)
                                    .then(response=this.fincaModificada=response);*/
    }
    apretarCancelarModificacionFinca(){
        this.editar=false;
    }

    apretarAceptarModificarModal(){
        this.router.navigate(['/homeFinca/']);
    }

    apretarEliminarFincaModal(){
        console.log("idFinca: "+this.idFinca);
        this.homeFincaDetalleService.eliminarFinca(this.idFinca)
        .then(
            response=>this.fincaEliminada=response
        )
        .then(
            response=>this.router.navigate(['/homeFinca/'])
        );
        
    }

    apretarAdministrarUsuario(){
        console.log("fincaEncontrada:"+this.fincaEncontrada.idFinca );
        this.router.navigate(['/gestionarUsuariosFinca/+this.fincaEncontrada.idFinca']);
        //deberia pasar el id de la finca 
    }

    apretarAceptarAprobarModal(){
        this.aprobarFincaService.aprobarFinca(this.idFinca)
        .then(
            response=>this.router.navigate(['/homeFinca/'])
        );
    }
}
