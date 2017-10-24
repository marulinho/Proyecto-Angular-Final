import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { } from 'googlemaps';
import { MapsAPILoader } from 'angular2-google-maps/core';
import { AppService } from '../../app.service';
import { GestionarFincaService, Finca } from './gestionar.finca.service';

@Component({
    selector:'app-gestionar.finca',
    templateUrl: './gestionar.finca.component.html',
    styleUrls:['./gestionar.finca.component.css']
    
})

export class GestionarFincaComponent implements OnInit{
    
    idFinca:number;
    errorMessage="";
    nombre:string;
    direccion:string;
    tamanio:number;

    //UBICACION
    ubicacion: string;
    public latitude: number;
    public longitude: number;
    public searchControl: FormControl;
    public zoom: number;

    @ViewChild("search")
    public searchElementRef: ElementRef;

    constructor(private router:Router,
                private route:ActivatedRoute,
                private gestionarFincaService:GestionarFincaService,
                private mapsAPILoader: MapsAPILoader,
                private ngZone: NgZone,
                private appService:AppService){
        this.appService.getState().topnavTitle="Gestionar Finca";
        this.route.params.subscribe(params => {
            this.idFinca = +params['idFinca'];
            console.log("idFinca: "+this.idFinca);
        });
    }

    ngOnInit(){

        
        //set google maps defaults
        this.zoom = 4;
        this.latitude = -32.8969744;
        this.longitude = -68.85284739999997;

        //create search FormControl
        this.searchControl = new FormControl();

        //set current position
        this.setCurrentPosition();

        //load Places Autocomplete
        this.mapsAPILoader.load().then(() => {
            let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
                types: ["address"]
            });
            autocomplete.addListener("place_changed", () => {
                this.ngZone.run(() => {
                    //get the place result
                    let place: google.maps.places.PlaceResult = autocomplete.getPlace();

                    //verify result
                    if (place.geometry === undefined || place.geometry === null) {
                        return;
                    }

                    //set latitude, longitude and zoom
                    this.latitude = place.geometry.location.lat();
                    this.longitude = place.geometry.location.lng();
                    this.zoom = 12;
                });
            });
        });
        
    }

    
    private setCurrentPosition() {
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition((position) => {
            this.latitude = position.coords.latitude;
            this.longitude = position.coords.longitude;
            this.zoom = 12;
            this.ubicacion = this.latitude+";"+this.longitude;
          });
        }
    }
    
    apretarModificarFinca(){
        if( this.nombre=="" || this.nombre==null ||
            this.ubicacion=="" || this.ubicacion==null ||
            this.direccion=="" || this.direccion==null ||
            this.tamanio==null){
                this.errorMessage="Debe completar todos los campos obligatorios (*).";
            }
        else{
            this.gestionarFincaService.modificarFinca(this.idFinca,this.nombre,this.direccion,this.ubicacion,this.tamanio)
                    .then(
                        response=>{
                            this.router.navigate(['/homeFincaDetalle/'+this.idFinca]);
                        }
                    )
                    .catch(
                        error=>{
                            this.errorMessage=error.error_description;
                        }
                    );
        }
    }

    apretarSalir(){
        this.router.navigate(['/homeFincaDetalle/'+this.idFinca]);
    }
    
    
}
