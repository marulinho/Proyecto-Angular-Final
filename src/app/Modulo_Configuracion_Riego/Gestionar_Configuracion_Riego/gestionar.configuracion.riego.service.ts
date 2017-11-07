import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { RestBaseService } from '../../tools/rest.tools';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class GestionarConfiguracionRiegoService extends RestBaseService {

    private obtenerConfiguracionRiegoMecanismoFincaSectorUrl = "/obtenerConfiguracionesRiegoMecanismoRiegoFincaSector/";
    private crearConfiguracionRiegoAutomaticoUrl = "/crearConfiguracionRiegoAutomaticoMecanismoRiegoFincaSector/";
    private crearConfiguracionRiegoManualUrl = "/crearConfiguracionRiegoManualMecanismoRiegoFincaSector/";
    private agregarCriterioInicialConfiguracionRiegoUrl= "/agregarCriterioInicialConfiguracionRiegoMecanismoRiegoFincaSector/";
    private agregarCriterioFinalConfiguracionRiegoUrl= "/agregarCriterioFinalConfiguracionRiegoMecanismoRiegoFincaSector/";
    private obtenerCriterioInicialConfiguracionRiegoUrl= "/obtenerCriteriosInicialesConfiguracionRiegoMecanismoRiegoFincaSector/";
    private obtenerCriterioFinalConfiguracionRiegoUrl= "/obtenerCriteriosFinalesConfiguracionRiegoMecanismoRiegoFincaSector/";
    private cambiarEstadoConfiguracionRiegoFincaSectorUrl="/cambiarEstadoConfiguracionRiegoMecanismoRiegoFincaSector/";
    private modificarConfiguracionRiegoMecanismoRiegoFincaSectorUrl="/modificarConfiguracionRiegoMecanismoRiegoFincaSector/";
    private eliminarConfiguracionRiegoMecanismoRiegoFincaSectorUrl="/eliminarConfiguracionRiegoMecanismoRiegoFincaSector/";
    private eliminarCriterioConfiguracionRiegoMecanismoRiegoFincaSectorUrl="/eliminarCriterioConfiguracionRiegoMecanismoRiegoFincaSector/";
    private modificarCriterioConfiguracionRiegoMecanismoRiegoFincaSectorUrl="/modificarCriterioConfiguracionRiegoMecanismoRiegoFincaSector/";

    constructor(private http: Http) { super(); }

    obtenerConfiguracionesRiegoFincaMecanismoSector(idFinca: number, idMecanismoRiegoFincaSector: number): Promise<ConfiguracionRiego> {
        const data = {
            'idFinca': idFinca,
            'idMecanismoRiegoFincaSector': idMecanismoRiegoFincaSector
        };
        return this.http.post(GestionarConfiguracionRiegoService.serverUrl + this.obtenerConfiguracionRiegoMecanismoFincaSectorUrl, JSON.stringify(data), this.getRestHeader())
            .toPromise()
            .then(response => { return response.json() as ConfiguracionRiego; })
            .catch(this.handleError);
    }

    crearConfiguracionRiegoAutomaticoFincaSector(idFinca: number, idMecanismoRiegoFincaSector: number, nombreConfiguracionRiego: string,
        descripcionConfiguracionRiego: string, duracionMaximaConfiguracionRiego: number): Promise<any> {
        const data = {
            'idFinca': idFinca,
            'idMecanismoRiegoFincaSector': idMecanismoRiegoFincaSector,
            'nombreConfiguracionRiego': nombreConfiguracionRiego,
            'descripcionConfiguracionRiego': descripcionConfiguracionRiego,
            'duracionMaximaConfiguracionRiego': duracionMaximaConfiguracionRiego

        };
        return this.http.post(GestionarConfiguracionRiegoService.serverUrl + this.crearConfiguracionRiegoAutomaticoUrl, JSON.stringify(data), this.getRestHeader())
            .toPromise()
            .then(response => { return response.json() as any; })
            .catch(this.handleError);
    }

    crearConfiguracionRiegoManualFincaSector(idFinca: number, idMecanismoRiegoFincaSector: number, nombreConfiguracionRiego: string,
        descripcionConfiguracionRiego: string, duracionMaximaConfiguracionRiego: number): Promise<any> {
        const data = {
            'idFinca': idFinca,
            'idMecanismoRiegoFincaSector': idMecanismoRiegoFincaSector,
            'nombreConfiguracionRiego': nombreConfiguracionRiego,
            'descripcionConfiguracionRiego': descripcionConfiguracionRiego,
            'duracionMaximaConfiguracionRiego': duracionMaximaConfiguracionRiego

        };
        return this.http.post(GestionarConfiguracionRiegoService.serverUrl + this.crearConfiguracionRiegoManualUrl, JSON.stringify(data), this.getRestHeader())
            .toPromise()
            .then(response => { return response.json() as any; })
            .catch(this.handleError);
    }

    agregarCriterioInicialRiegoFinca(idFinca: number, idMecanismoRiegoFincaSector: number, idConfiguracionRiego: number,
        tipoCriterioRiego: string, nombreCriterioRiego: string, descripcionCriterioRiego:string,
        idTipoMedicion:number, valorMedicionCriterioRiego:number,
        horaInicioCriterioRiego:string, diaInicioCriterioRiego:number,operador:string): Promise<any> {
        const data = {
            'idFinca': idFinca,
            'idMecanismoRiegoFincaSector': idMecanismoRiegoFincaSector,
            'idConfiguracionRiego': idConfiguracionRiego,
            'tipoCriterioRiego': tipoCriterioRiego,
            'nombreCriterioRiego': nombreCriterioRiego,
            'descripcionCriterioRiego':descripcionCriterioRiego,
            'idTipoMedicion':idTipoMedicion,
            'valorMedicionCriterioRiego':valorMedicionCriterioRiego,
            'horaInicioCriterioRiego':horaInicioCriterioRiego,
            'diaInicioCriterioRiego':diaInicioCriterioRiego,
            'operador':operador

        };
        return this.http.post(GestionarConfiguracionRiegoService.serverUrl + this.agregarCriterioInicialConfiguracionRiegoUrl, JSON.stringify(data), this.getRestHeader())
            .toPromise()
            .then(response => { return response.json() as any; })
            .catch(this.handleError);
    }

    agregarCriterioFinalRiegoFinca(idFinca: number, idMecanismoRiegoFincaSector: number, idConfiguracionRiego: number,
        tipoCriterioRiego: string, nombreCriterioRiego: string, descripcionCriterioRiego:string,
        idTipoMedicion:number, valorMedicionCriterioRiego:number, volumenAguaCriterioRiego:number,
        horaInicioCriterioRiego:string, diaInicioCriterioRiego:number,operador:string): Promise<any> {
        const data = {
            'idFinca': idFinca,
            'idMecanismoRiegoFincaSector': idMecanismoRiegoFincaSector,
            'idConfiguracionRiego': idConfiguracionRiego,
            'tipoCriterioRiego': tipoCriterioRiego,
            'nombreCriterioRiego': nombreCriterioRiego,
            'descripcionCriterioRiego':descripcionCriterioRiego,
            'idTipoMedicion':idTipoMedicion,
            'valorMedicionCriterioRiego':valorMedicionCriterioRiego,
            'volumenAguaCriterioRiego':volumenAguaCriterioRiego,
            'horaInicioCriterioRiego':horaInicioCriterioRiego,
            'diaInicioCriterioRiego':diaInicioCriterioRiego,
            'operador':operador

        };
        return this.http.post(GestionarConfiguracionRiegoService.serverUrl + this.agregarCriterioFinalConfiguracionRiegoUrl, JSON.stringify(data), this.getRestHeader())
            .toPromise()
            .then(response => { return response.json() as any; })
            .catch(this.handleError);
    }

    obtenerCriterioInicialRiegoFinca(idFinca: number, idMecanismoRiegoFincaSector: number, idConfiguracionRiego: number): Promise<CriterioRiego> {
        const data = {
            'idFinca': idFinca,
            'idMecanismoRiegoFincaSector': idMecanismoRiegoFincaSector,
            'idConfiguracionRiego': idConfiguracionRiego

        };
        return this.http.post(GestionarConfiguracionRiegoService.serverUrl + this.obtenerCriterioInicialConfiguracionRiegoUrl, JSON.stringify(data), this.getRestHeader())
            .toPromise()
            .then(response => { return response.json() as CriterioRiego; })
            .catch(this.handleError);
    }

    obtenerCriterioFinalRiegoFinca(idFinca: number, idMecanismoRiegoFincaSector: number, idConfiguracionRiego: number): Promise<CriterioRiego> {
        const data = {
            'idFinca': idFinca,
            'idMecanismoRiegoFincaSector': idMecanismoRiegoFincaSector,
            'idConfiguracionRiego': idConfiguracionRiego

        };
        return this.http.post(GestionarConfiguracionRiegoService.serverUrl + this.obtenerCriterioFinalConfiguracionRiegoUrl, JSON.stringify(data), this.getRestHeader())
            .toPromise()
            .then(response => { return response.json() as CriterioRiego; })
            .catch(this.handleError);
    }

    cambiarEstadoConfiguracionRiego(idFinca: number, idMecanismoRiegoFincaSector: number, idConfiguracionRiego: number): Promise<any> {
        const data = {
            'idFinca': idFinca,
            'idMecanismoRiegoFincaSector': idMecanismoRiegoFincaSector,
            'idConfiguracionRiego': idConfiguracionRiego

        };
        return this.http.post(GestionarConfiguracionRiegoService.serverUrl + this.cambiarEstadoConfiguracionRiegoFincaSectorUrl, JSON.stringify(data), this.getRestHeader())
            .toPromise()
            .then(response => { return response.json() as any; })
            .catch(this.handleError);
    }

    modificarConfiguracionRiego(idFinca: number, idMecanismoRiegoFincaSector: number, idConfiguracionRiego: number,
        nombreConfiguracionRiego:string, descripcionConfiguracionRiego:string, duracionMaximaConfiguracionRiego:number): Promise<any> {
        const data = {
            'idFinca': idFinca,
            'idMecanismoRiegoFincaSector': idMecanismoRiegoFincaSector,
            'idConfiguracionRiego': idConfiguracionRiego,
            'nombreConfiguracionRiego':nombreConfiguracionRiego,
            'descripcionConfiguracionRiego':descripcionConfiguracionRiego,
            'duracionMaximaConfiguracionRiego':duracionMaximaConfiguracionRiego

        };
        return this.http.post(GestionarConfiguracionRiegoService.serverUrl + this.modificarConfiguracionRiegoMecanismoRiegoFincaSectorUrl, JSON.stringify(data), this.getRestHeader())
            .toPromise()
            .then(response => { return response.json() as any; })
            .catch(this.handleError);
    }

    eliminarConfiguracionRiego(idFinca: number, idMecanismoRiegoFincaSector: number, idConfiguracionRiego: number): Promise<any> {
        const data = {
            'idFinca': idFinca,
            'idMecanismoRiegoFincaSector': idMecanismoRiegoFincaSector,
            'idConfiguracionRiego': idConfiguracionRiego,

        };
        return this.http.post(GestionarConfiguracionRiegoService.serverUrl + this.eliminarConfiguracionRiegoMecanismoRiegoFincaSectorUrl, JSON.stringify(data), this.getRestHeader())
            .toPromise()
            .then(response => { return response.json() as any; })
            .catch(this.handleError);
    }

    eliminarCriterioConfiguracionRiego(idFinca: number, idMecanismoRiegoFincaSector: number, 
        idConfiguracionRiego: number, idCriterioRiego:number): Promise<Boolean> {
        const data = {
            'idFinca': idFinca,
            'idMecanismoRiegoFincaSector': idMecanismoRiegoFincaSector,
            'idConfiguracionRiego': idConfiguracionRiego,
            'idCriterioRiego':idCriterioRiego

        };
        return this.http.post(GestionarConfiguracionRiegoService.serverUrl + this.eliminarCriterioConfiguracionRiegoMecanismoRiegoFincaSectorUrl, JSON.stringify(data), this.getRestHeader())
            .toPromise()
            .then(response => { return response.json() as Boolean; })
            .catch(this.handleError);
    }

    modificarCriterioConfiguracionRiego(idFinca: number, idMecanismoRiegoFincaSector: number, idConfiguracionRiego: number,
        tipoCriterioRiego:string, idCriterioRiego:number, nombreCriterioRiego:string, descripcionCriterioRiego:string,
        idTipoMedicion:number, valorMedicionCriterioRiego:number, volumenAguaCriterioRiego:number, horaInicioCriterioRiego:string,
        numeroDiaInicioCriterioRiego:number,operador:string): Promise<any> {
        const data = {
            'idFinca': idFinca,
            'idMecanismoRiegoFincaSector': idMecanismoRiegoFincaSector,
            'idConfiguracionRiego': idConfiguracionRiego,
            'tipoCriterioRiego':tipoCriterioRiego,
            'idCriterioRiego':idCriterioRiego,
            'nombreCriterioRiego':nombreCriterioRiego,
            'descripcionCriterioRiego':descripcionCriterioRiego,
            'idTipoMedicion':idTipoMedicion,
            'valorMedicionCriterioRiego':valorMedicionCriterioRiego,
            'volumenAguaCriterioRiego':volumenAguaCriterioRiego,
            'horaInicioCriterioRiego':horaInicioCriterioRiego,
            'diaInicioCriterioRiego':numeroDiaInicioCriterioRiego,
            'operador':operador

        };
        return this.http.post(GestionarConfiguracionRiegoService.serverUrl + this.modificarCriterioConfiguracionRiegoMecanismoRiegoFincaSectorUrl, JSON.stringify(data), this.getRestHeader())
            .toPromise()
            .then(response => { return response.json() as any; })
            .catch(this.handleError);
    }
}

export interface ConfiguracionRiego {
    resultado: boolean;
    datos_operacion;
    detalle_operacion;
}

export interface CriterioRiego {
    resultado: boolean;
    datos_operacion;
    detalle_operacion;
}

