import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { RestBaseService } from '../../tools/rest.tools';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class GestionarComponenteSensorService extends RestBaseService {

    private crearComponenterUrl = "/crearComponenteSensor/";
    private modificarComponenteUrl="/modificarComponenteSensor/";
    private buscarComponenteUrl = "/mostrarComponentesSensorFinca/";
    private buscarComponenteIDUrl = "/buscarComponenteSensorPorId/";
    private deshabilitarComponenteUrl="/deshabilitarComponenteSensor/";
    private habilitarComponenteUrl="/habilitarComponenteSensor/";
    

    constructor(private http: Http) { super(); }

    crearComponente(idFinca: number, modeloComponente: string, descripcionComponente: string, cantMaximaSensores:number): Promise<any> {
        const data = {
            'idFinca': idFinca,
            'modeloComponente': modeloComponente,
            'descripcionComponente': descripcionComponente,
            'cantidadMaximaSensores':cantMaximaSensores
        };

        return this.http.post(GestionarComponenteSensorService.serverUrl + this.crearComponenterUrl, JSON.stringify(data), this.getRestHeader())
            .toPromise()
            .then(response => {
                return response.json() as any;
            })
            .catch(this.handleError);
    }

    modificarComponente(idFinca: number, idComponenteSensor:number,modeloComponente: string, descripcionComponente: string, cantMaximaSensores:number): Promise<any> {
        const data = {
            'idFinca': idFinca,
            'idComponenteSensor':idComponenteSensor,
            'modeloComponente': modeloComponente,
            'descripcionComponente': descripcionComponente,
            'cantidadMaximaSensores':cantMaximaSensores
        };

        return this.http.post(GestionarComponenteSensorService.serverUrl + this.modificarComponenteUrl, JSON.stringify(data), this.getRestHeader())
            .toPromise()
            .then(response => {
                return response.json() as any;
            })
            .catch(this.handleError);
    }

    buscarComponente(idFinca: number): Promise<ComponenteSensor> {
        const data = {
            'idFinca': idFinca
        };

        return this.http.post(GestionarComponenteSensorService.serverUrl + this.buscarComponenteUrl, JSON.stringify(data), this.getRestHeader())
            .toPromise()
            .then(response => {
                return response.json() as ComponenteSensor;
            })
            .catch(this.handleError);
    }

    deshabilitarComponenteSensor(idFinca:number,idComponenteSensor:number){
        const data = {
            'idFinca': idFinca,
            'idComponenteSensor':idComponenteSensor
        };

        return this.http.post(GestionarComponenteSensorService.serverUrl + this.deshabilitarComponenteUrl, JSON.stringify(data), this.getRestHeader())
            .toPromise()
            .then(response => {
                return response.json() as any;
            })
            .catch(this.handleError);
    }

    habilitarComponenteSensor(idFinca:number,idComponenteSensor:number){
        const data = {
            'idFinca': idFinca,
            'idComponenteSensor':idComponenteSensor
        };

        return this.http.post(GestionarComponenteSensorService.serverUrl + this.habilitarComponenteUrl, JSON.stringify(data), this.getRestHeader())
            .toPromise()
            .then(response => {
                return response.json() as any;
            })
            .catch(this.handleError);
    }

    buscarComponenteSensorId(idComponenteSensor:number):Promise<ComponenteSensor>{
        const data = {
            'idComponenteSensor': idComponenteSensor
        };

        return this.http.post(GestionarComponenteSensorService.serverUrl + this.buscarComponenteIDUrl, JSON.stringify(data), this.getRestHeader())
            .toPromise()
            .then(response => {
                return response.json() as ComponenteSensor;
            })
            .catch(this.handleError);
    }
    
  
}

export interface ComponenteSensor{
    resultado:boolean;
    datos_operacion;
    detalle_operacion;
}