import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { } from 'googlemaps';
import { MapsAPILoader } from 'angular2-google-maps/core';
import { AppService } from '../../app.service';
import { GestionarFincaService, Finca } from './gestionar.finca.service';
import { HomeFincaDetalleService } from '../Home_Finca_Detalle/home.finca.detalle.service';
import { ErroresSistema } from '../../Datos_Sistema/errores.sistema';

@Component({
    selector: 'app-gestionar.finca',
    templateUrl: './gestionar.finca.component.html',
    styleUrls: ['./gestionar.finca.component.css']

})

export class GestionarFincaComponent implements OnInit {

    idFinca: number=JSON.parse(localStorage.getItem('idFinca'));
    errorMessage = "";
    nombre: string;
    direccion: string;
    tamanio: number;

    erroresSistema = new ErroresSistema();

    permisoGestionarFinca = JSON.parse(localStorage.getItem('puedeGestionarFinca'));

    //UBICACION
    ubicacion: string;
    public latitude: number;
    public longitude: number;
    public searchControl: FormControl;
    public zoom: number;

    @ViewChild("search")
    public searchElementRef: ElementRef;

    constructor(private router: Router,
        private route: ActivatedRoute,
        private gestionarFincaService: GestionarFincaService,
        private homeFincaDetalleService: HomeFincaDetalleService,
        private mapsAPILoader: MapsAPILoader,
        private ngZone: NgZone,
        private appService: AppService) {
        this.appService.getState().topnavTitle = "Gestionar Finca";

    }

    ngOnInit() {
        this.homeFincaDetalleService.buscarFinca(this.idFinca)
            .then(
            response => {
                if (response.detalle_operacion == "No hay datos") {
                    this.errorMessage = "No se han podido obtener los datos necesarios para modificar la finca, intente más tarde.";
                }
                else {
                    this.nombre = response.datos_operacion['nombre'];
                    this.tamanio = response.datos_operacion['tamanio'];
                    this.direccion = response.datos_operacion['direccionLegal'];
                }
            }
            )
            .catch(
            error => {
                if (error.error_description == this.erroresSistema.getInicioSesion()) {
                    this.router.navigate(['/login/']);
                }
                else {
                    this.errorMessage = error.error_description;
                }
            }
            );

        //set google maps defaults
        this.zoom = 4;
        //this.latitude = -32.8969744;
        //this.longitude = -68.85284739999997;

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

    getPermisoGestionarFinca() {
        return this.permisoGestionarFinca;
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

    apretarModificarFinca() {
        if (this.nombre == "" || this.nombre == null ||
            this.ubicacion == "" || this.ubicacion == null ||
            this.direccion == "" || this.direccion == null ||
            this.tamanio == null) {
            this.errorMessage = "Debe completar todos los campos obligatorios (*).";
        }
        else {
            console.log("ubicacionEnviada: " + this.ubicacion);
            this.gestionarFincaService.modificarFinca(this.idFinca, this.nombre, this.direccion, this.ubicacion, this.tamanio)
                .then(
                response => {
                    this.router.navigate(['/homeFincaDetalle/']);
                }
                )
                .catch(
                error => {
                    if (error.error_description == this.erroresSistema.getInicioSesion()) {
                        this.router.navigate(['/login/']);
                    }
                    else {
                        this.errorMessage = error.error_description;
                    }
                }
                );
        }
    }

    apretarSalir() {
        this.router.navigate(['/homeFincaDetalle/']);
    }


}
