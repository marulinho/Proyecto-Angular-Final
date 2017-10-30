import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../../../app.service';
import { GestionarProveedorInformacionService, ProveedorInformacion } from '../gestionar.proveedor.service';
import { ErroresSistema } from '../../../Datos_Sistema/errores.sistema';

@Component({
    selector: 'modificar-proveedor-informacion',
    templateUrl: './modificar.proveedor.component.html',
    styleUrls: ['./modificar.proveedor.component.css']

})

export class ModificarProveedorInformacionComponent implements OnInit {

    erroresSistema = new ErroresSistema();
    permisoConfigurarProveedor = JSON.parse(localStorage.getItem('puedeConfigurarObtencionInfoExterna'));

    idFinca: number;
    proveedor: ProveedorInformacion;
    errorMessage = "";
    proveedorSeleccionado: Boolean;
    frecuencia: number;
    nombreProveedor: string;


    constructor(private router: Router,
        private route: ActivatedRoute,
        private gestionarProveedorInformacionService: GestionarProveedorInformacionService,
        private appService: AppService) {

        appService.getState().topnavTitle = "Gestionar Proveedor Información";
        this.route.params.subscribe(params => {
            this.idFinca = +params['idFinca'];
            if (this.idFinca) {
                this.gestionarProveedorInformacionService.obtenerProveedores(this.idFinca)
                    .then(
                    response => {
                        this.proveedor = response.datos_operacion;
                        this.nombreProveedor = this.proveedor['nombreProveedor'];
                        this.proveedorSeleccionado = true;
                    }
                    )
                    .catch(
                    error => {
                        this.errorMessage = error.error_description;
                    }
                    );
            }
        });

    }

    ngOnInit() { }

    getPermisoConfigurarProveedor() {
        return this.permisoConfigurarProveedor;
    }

    getProveedorSeleccionado() {
        return this.proveedorSeleccionado;
    }

    apretarModificarProveedor() {
        if (this.frecuencia == null) {
            this.errorMessage = "Debe completar todos los campos obligatorios (*).";
        }
        else {
            this.gestionarProveedorInformacionService.modificarProveedor(this.idFinca, this.nombreProveedor, this.frecuencia)
                .then(
                response => {
                    this.router.navigate(['/homeFincaDetalle/' + this.idFinca]);
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
        this.router.navigate(['/homeFincaDetalle/' + this.idFinca]);
    }
}
