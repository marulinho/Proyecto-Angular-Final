import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GestionarUsuarioFincaService, Usuario,UsuarioNoEncargado } from './gestionar.usuario.finca.service';

@Component({
    selector:'gestionar-usuario-finca',
    templateUrl: './gestionar.usuario.finca.component.html',
    styleUrls:['./gestionar.usuario.finca.component.css']
    
})

export class GestionarUsuarioFincaComponent implements OnInit{
    stakesFinca:Usuario[];
    idFinca:number;
    usuariosNoEncargado:UsuarioNoEncargado[];
    usuariosNoFinca:Usuario[];
    usuarioFinca:any;
    usuarioFincaEliminado:any;

    constructor(private router: Router,
                private route:ActivatedRoute,
                private gestionarUsuarioFincaService: GestionarUsuarioFincaService) {
        
            this.route.params.subscribe(params => {
            this.idFinca = +params['idFinca'];
            console.log("idFinca: " + this.idFinca);
            if (this.idFinca) {
                this.gestionarUsuarioFincaService.buscarUsuariosNoEncargado(this.idFinca)
                .then(
                    response => this.usuariosNoEncargado = response
                );
            }

        });

    }

    ngOnInit(){
        this.gestionarUsuarioFincaService.buscarUsuarioNoFinca(this.idFinca)
        .then(
            response=>this.usuariosNoFinca=response
        );
        this.gestionarUsuarioFincaService.buscarUsuariosNoEncargado(this.idFinca)
        .then(
            response=>this.usuariosNoEncargado=response
        );
  
    }


    apretarAgregarUsuario(usuario:string){
        this.gestionarUsuarioFincaService.agregarUsuarioFinca(usuario,this.idFinca)
        .then(
            response=>this.usuarioFinca=response
        );
    }
    eliminarUsuarioFinca(id:number){
        this.gestionarUsuarioFincaService.eliminarUsuarioFinca(id)
        .then(
            response=>this.usuarioFincaEliminado=response
        );
    }
    apretarEliminarUsuarioFinca(){
        this.router.navigate(['/homeFinca/']);
    }

    apretarAceptarUsuarioFinca(){
        this.router.navigate(['/homeFinca']);
    }

}
