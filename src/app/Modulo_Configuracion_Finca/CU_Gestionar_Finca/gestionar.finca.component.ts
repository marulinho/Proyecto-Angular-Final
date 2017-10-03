import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GestionarFincaService, FincaModificada } from './gestionar.finca.service';

@Component({
    selector:'app-gestionar.finca',
    templateUrl: './gestionar.finca.component.html',
    styleUrls:['./gestionar.finca.component.css']
    
})

export class GestionarFincaComponent implements OnInit{
    
    constructor(private router:Router,
                private gestionarFincaService:GestionarFincaService){

    }

    ngOnInit(){
        
    }
    
    
    
}
