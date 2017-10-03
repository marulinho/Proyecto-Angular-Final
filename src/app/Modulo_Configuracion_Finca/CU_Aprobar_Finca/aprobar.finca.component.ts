import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AprobarFincaService } from './aprobar.finca.service';

@Component({
    selector:'aprobar-finca',
    templateUrl: './aprobar.finca.component.html',
    styleUrls:['./aprobar.finca.component.css']
    
})

export class AprobarFincaComponent implements OnInit{
    
    
    constructor(private router:Router,
                private route: ActivatedRoute,
                private aprobarFincaService:AprobarFincaService){

    }

    ngOnInit(){                             
        this.route.params.subscribe(params => {
            let idFinca = +params['idFinca'];
            console.log(idFinca);
            if (idFinca) {
              /*this.mascotasService.buscarMascota(id)
                .then(mascota => this.mascota = mascota)
                .catch(error => this.errorMessage = <any>error);*/
                console.log("idFinca: "+idFinca);
            }
          });
    }

    apretarAprobar(id:number){
        console.log("apretamos aprobar");
        this.aprobarFincaService.aprobarFinca(id);
        
    }
    
    apretarCancelar(id:number){
        console.log("apretamos cancelar");
        this.aprobarFincaService.noAprobarFinca(id);
    }
}
