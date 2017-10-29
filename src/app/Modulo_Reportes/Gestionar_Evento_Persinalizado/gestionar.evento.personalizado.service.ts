import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { RestBaseService } from '../../tools/rest.tools';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class GestionarEventoPersonalizadoService extends RestBaseService {

    private buscarConfiguracionesEventosPersonalizadosUrl = "/buscarConfiguracionesEventosPersonalizados/";
    private buscarConfiguracionesEventosPersonalizadosSectorUrl = "/buscarConfiguracionesEventosPersonalizadosSector/";
    private mostrarConfiguracionEventoPersonalizadoUrl = "/mostrarConfiguracionEventoPersonalizado/";
    private mostrarTipoMedicionInternaFincaUrl = "/mostrarTipoMedicionInternaFinca/";
    private mostrarTipoMedicionClimaticaFincaUrl= "/mostrarTipoMedicionClimaticaFinca/";
    private crearConfiguracionEventoPersonalizadoUrl="/crearConfiguracionEventoPersonalizado/";
    private modificarConfiguracionEventoPersonalizadoUrl="/modificarConfiguracionEventoPersonalizado/";
    private desactivarConfiguracionEventoPersonalizadoUrl="/desactivarConfiguracionEventoPersonalizado/";
    private activarConfiguracionEventoPersonalizadoUrl ="/activarConfiguracionEventoPersonalizado/";

    constructor(private http: Http) { super(); }

    buscarConfiguracionesEventosPersonalizados(idUsuarioFinca: number, idFinca:number,idSector:number): Promise<ConfiguracionEvento> {
        const data = {
            'idUsuarioFinca': idUsuarioFinca,
            'idFinca':idFinca,
            'idSector':idSector
        };
        return this.http.post(GestionarEventoPersonalizadoService.serverUrl + this.buscarConfiguracionesEventosPersonalizadosUrl, JSON.stringify(data), this.getRestHeader())
            .toPromise()
            .then(response => { return response.json() as ConfiguracionEvento; })
            .catch(this.handleError);
    }

    buscarConfiguracionesEventosPersonalizadosSector(idUsuarioFinca: number, idFinca:number,idSector:number): Promise<ConfiguracionEvento> {
        const data = {
            'idUsuarioFinca': idUsuarioFinca,
            'idFinca':idFinca,
            'idSector':idSector
        };
        return this.http.post(GestionarEventoPersonalizadoService.serverUrl + this.buscarConfiguracionesEventosPersonalizadosSectorUrl, JSON.stringify(data), this.getRestHeader())
            .toPromise()
            .then(response => { return response.json() as ConfiguracionEvento; })
            .catch(this.handleError);
    }

    mostrarConfiguracionEventoPersonalizado(idFinca: number, idConfiguracionEvento: number): Promise<ConfiguracionEvento> {
        const data = {
            'idFinca': idFinca,
            'idConfiguracionEvento': idConfiguracionEvento
        };
        return this.http.post(GestionarEventoPersonalizadoService.serverUrl + this.mostrarConfiguracionEventoPersonalizadoUrl, JSON.stringify(data), this.getRestHeader())
            .toPromise()
            .then(response => { return response.json() as ConfiguracionEvento; })
            .catch(this.handleError);
    }

    mostrarTipoMedicionInternaFinca(idFinca: number): Promise<TipoMedicion> {
        const data = {
            'idFinca': idFinca
        };
        return this.http.post(GestionarEventoPersonalizadoService.serverUrl + this.mostrarTipoMedicionInternaFincaUrl, JSON.stringify(data), this.getRestHeader())
            .toPromise()
            .then(response => { return response.json() as TipoMedicion; })
            .catch(this.handleError);
    }

    mostrarTipoMedicionClimaticaInternaFinca(idFinca: number): Promise<TipoMedicionClimatica> {
        const data = {
            'idFinca': idFinca
        };
        return this.http.post(GestionarEventoPersonalizadoService.serverUrl + this.mostrarTipoMedicionClimaticaFincaUrl, JSON.stringify(data), this.getRestHeader())
            .toPromise()
            .then(response => { return response.json() as TipoMedicionClimatica; })
            .catch(this.handleError);
    }

    crearConfiguracionEventoPersonalizado(configuracionMedicionInterna, configuracionMedicionExterna, idUsuarioFinca:number,
        nombreConfiguracionEvento:string, descripcionConfiguracionEvento:string, notificacionActivada:boolean,
        configuracionActivada:boolean, idSector:number,idFinca:number): Promise<any> {
        const data = {
            'configuracionMedicionInterna': configuracionMedicionInterna,
            'configuracionMedicionExterna':configuracionMedicionExterna,
            'idUsuarioFinca':idUsuarioFinca,
            'nombreConfiguracionEvento':nombreConfiguracionEvento,
            'descripcionConfiguracionEvento':descripcionConfiguracionEvento,
            'notificacionActivada':notificacionActivada,
            'configuracionActivada':configuracionActivada,
            'idSector':idSector,
            'idFinca':idFinca

        };
        return this.http.post(GestionarEventoPersonalizadoService.serverUrl + this.crearConfiguracionEventoPersonalizadoUrl, JSON.stringify(data), this.getRestHeader())
            .toPromise()
            .then(response => { return response.json() as any; })
            .catch(this.handleError);
    }

    modificarConfiguracionEventoPersonalizado(idConfiguracionEvento:number, configuracionMedicionInterna, configuracionMedicionExterna,
        idUsuarioFinca:number, nombreConfiguracionEvento:string, descripcionConfiguracionEvento:string, notificacionActivada:boolean,
        configuracionActivada:boolean, idSector:number,idFinca:number): Promise<any> {
        const data = {
            'idConfiguracionEvento':idConfiguracionEvento,
            'configuracionMedicionInterna': configuracionMedicionInterna,
            'configuracionMedicionExterna':configuracionMedicionExterna,
            'idUsuarioFinca':idUsuarioFinca,
            'nombreConfiguracionEvento':nombreConfiguracionEvento,
            'descripcionConfiguracionEvento':descripcionConfiguracionEvento,
            'notificacionActivada':notificacionActivada,
            'configuracionActivada':configuracionActivada,
            'idSector':idSector,
            'idFinca':idFinca

        };
        return this.http.post(GestionarEventoPersonalizadoService.serverUrl + this.modificarConfiguracionEventoPersonalizadoUrl, JSON.stringify(data), this.getRestHeader())
            .toPromise()
            .then(response => { return response.json() as any; })
            .catch(this.handleError);
    }

    desactivarConfiguracionEventoPersonalizado(idConfiguracionEvento:number,idFinca:number): Promise<any> {
        const data = {
            'idConfiguracionEvento':idConfiguracionEvento,
            'idFinca':idFinca
        };
        return this.http.post(GestionarEventoPersonalizadoService.serverUrl + this.desactivarConfiguracionEventoPersonalizadoUrl, JSON.stringify(data), this.getRestHeader())
            .toPromise()
            .then(response => { return response.json() as any; })
            .catch(this.handleError);
    }

    activarConfiguracionEventoPersonalizado(idConfiguracionEvento:number,idFinca:number): Promise<any> {
        const data = {
            'idConfiguracionEvento':idConfiguracionEvento,
            'idFinca':idFinca
        };
        return this.http.post(GestionarEventoPersonalizadoService.serverUrl + this.activarConfiguracionEventoPersonalizadoUrl, JSON.stringify(data), this.getRestHeader())
            .toPromise()
            .then(response => { return response.json() as any; })
            .catch(this.handleError);
    }
}

export interface ConfiguracionEvento {
    resultado: boolean;
    datos_operacion;
    detalle_operacion;
}

export interface TipoMedicion {
    resultado: boolean;
    datos_operacion;
    detalle_operacion;
}

export interface TipoMedicionClimatica {
    resultado: boolean;
    datos_operacion;
    detalle_operacion;
}

