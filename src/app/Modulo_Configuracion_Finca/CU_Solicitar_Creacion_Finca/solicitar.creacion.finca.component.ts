import { Component, OnInit, ViewChild, NgZone, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { } from 'googlemaps';
import { MapsAPILoader } from 'angular2-google-maps/core';
import { SolicitarCreacionFincaService, FincaCreada } from './solicitar.creacion.finca.service';
import { GestionarProveedorInformacionService, ProveedorInformacion } from '../../Modulo_Obtencion_Informacion_Externa/CU_Gestionar_Proveedor_Informacion/gestionar.proveedor.service';
import { ErroresSistema } from '../../Datos_Sistema/errores.sistema';
import { AppService } from '../../app.service';

@Component({
    selector: 'app-solicitar.creacion.finca',
    templateUrl: './solicitar.creacion.finca.component.html',
    styleUrls:['./solicitar.creacion.finca.component.css']

})

export class SolicitarCreacionFincaComponent implements OnInit {

    errorMessage: string = "";
    selectIndex: number = 0;
    proveedoresInformacion = new Array;
    proveedor: string;
    nombre: string;
    direccion: string;
    tamanio: number;
    frecuencia: number;
    frecuenciaMaxima: number;

    erroresSistema = new ErroresSistema();
    //UBICACION
    ubicacion:string;
    public latitude: number;
    public longitude: number;
    public searchControl: FormControl;
    public zoom: number;

    @ViewChild("search")
    public searchElementRef: ElementRef;

    constructor(private router: Router,
        private solicitarCreacionFincaService: SolicitarCreacionFincaService,
        private gestionarProveedorInformacionService:GestionarProveedorInformacionService,
        private mapsAPILoader: MapsAPILoader,
        private ngZone: NgZone,
        private appService:AppService) {
            
            this.appService.getState().topnavTitle = "Crear Finca";

    }

    ngOnInit() {
        this.solicitarCreacionFincaService.obtenerProveedores()
            .then(
                response => {
                    this.llenarProveedores(response);
                }
            )
            .catch(
                error => {
                    if(error.error_description==this.erroresSistema.getInicioSesion()){
                        this.router.navigate(['/login/']);
                    }
                    else{
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

    llenarProveedores(response) {
        let longitud = Object.keys(response.datos_operacion).length;
        for (var i = 0; i < longitud; i++) {
            let valor = response['datos_operacion'][i]['nombreProveedor'];
            this.proveedoresInformacion.push(valor);
        }
    }

    apretarNextCrear() {
        if (this.selectIndex == 0) {
            if (this.nombre == "" || this.nombre == null ||
                this.direccion == "" || this.direccion == null ||
                this.tamanio == null || this.ubicacion=="" || this.ubicacion==null) {
                this.errorMessage = "Debe completar todos los campos obligatorios (*)";
            }
            else {
                console.log("ubicacion: "+this.ubicacion);
                this.errorMessage = "";
                this.selectIndex += 1;
            }
        }
        else {
            if (this.selectIndex == 1) {
                if (this.proveedor == "" || this.proveedor == null || this.frecuencia == null) {
                    this.errorMessage = "Debe completar todos los campos obligatorios (*).";
                }
                else {
                    this.errorMessage = "";
                    this.selectIndex += 1;
                }
            }
        }
    }

    apretarSalir() {
        this.router.navigate(['/homeFinca/']);
    }

    apretarCrearFinca() {
        this.solicitarCreacionFincaService.solicitarCreacion(this.nombre, this.direccion, this.ubicacion, this.tamanio, this.frecuencia, this.proveedor)
            .then(
            response => {
                this.router.navigate(['/homeFinca/']);
            }
            )
            .catch(
                error => {
                    if(error.error_description==this.erroresSistema.getInicioSesion()){
                        this.router.navigate(['/login/']);
                    }
                    else{
                        this.errorMessage = error.error_description;
                    }
                }
            );
    }

    obtenerProveedorInformacion(){
        this.gestionarProveedorInformacionService.buscarProveedorNombre(this.proveedor)
            .then(
                response=>{
                    if(response.detalle_operacion == "No hay datos"){
                        this.errorMessage = "No se ha podido obtener la información del proveedor, intente de nuevo.";
                    }
                    else{
                        this.frecuenciaMaxima = response.datos_operacion['frecuenciaMaxPosible'];
                    }
                }
            )
            .catch(
                error=>{
                    this.errorMessage = error.error_description;
                }
            );
    }
}
