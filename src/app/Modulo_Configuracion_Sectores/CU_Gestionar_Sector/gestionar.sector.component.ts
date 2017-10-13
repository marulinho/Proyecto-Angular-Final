import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../../app.service';
import { GestionarSectorFincaService, Sector } from './gestionar.sector.service';
import { DialogExampleComponent } from '../../shared/dialog/dialog-example/dialog-example.component';
import { MdDialog } from '@angular/material';


@Component({
    selector:'gestionarSectorFinca',
    templateUrl: './gestionar.sector.component.html',
    styleUrls:['./gestionar.sector.component.css']
    
})

export class GestionarSectorFincaComponent implements OnInit{
    
    idSector:number;
    errorMessageGestionarSectorFinca="";
    
    
    constructor(private router:Router,
                private route:ActivatedRoute,
                private gestionarSectorFincaService:GestionarSectorFincaService,
                private appService:AppService,
                private dialog: MdDialog){

        appService.getState().topnavTitle="Sectores Finca";
        this.route.params.subscribe(params => {
            this.idSector = +params['idSector'];
            console.log("idSector: "+this.idSector);

        });

    }

    ngOnInit(){}

   
}
