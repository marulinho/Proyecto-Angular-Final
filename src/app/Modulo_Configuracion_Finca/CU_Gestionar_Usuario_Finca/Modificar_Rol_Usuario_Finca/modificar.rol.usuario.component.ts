import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from '../../../app.service';
import { GestionarUsuarioFincaService, Usuario,Roles } from './gestionar.usuario.finca.service';

@Component({
    selector:'modificar-rol-usuario',
    templateUrl: './modificar.rol.usuario.component.html',
    styleUrls:['./modificar.rol.usuario.component.css']
    
})

export class ModificarRolUsuarioComponent implements OnInit{
    @Input() idFinca:number;
    idFincaUsuarioFinca:number;
    
    constructor(private router: Router,
                private route:ActivatedRoute,
                private appService: AppService) {
            this.appService.getState().topnavTitle="Usuarios";
            this.route.params.subscribe(params => {
                this.idFincaUsuarioFinca = +params['idUsuarioFinca'];
                
            });
    }

    ngOnInit(){

  
    }

    
}

  