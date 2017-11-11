import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from '../../../app.service';
import { GestionarUsuarioFincaService, Usuario,Roles } from './gestionar.usuario.finca.service';
import { ErroresSistema } from '../../../Datos_Sistema/errores.sistema';

@Component({
    selector:'modificar-rol-usuario',
    templateUrl: './modificar.rol.usuario.component.html',
    styleUrls:['./modificar.rol.usuario.component.css']
    
})

export class ModificarRolUsuarioComponent implements OnInit{
    idFinca:number=JSON.parse(localStorage.getItem('idFinca'));
    idFincaUsuarioFinca:number;
    
    constructor(private router: Router,
                private route:ActivatedRoute,
                private appService: AppService) {
            this.appService.getState().topnavTitle="Usuarios";
    }

    ngOnInit(){

  
    }

    
}

  