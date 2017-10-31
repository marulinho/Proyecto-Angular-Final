import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { RestBaseService } from '../../tools/rest.tools';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ABMSensorFincaService extends RestBaseService {

    private crearSensorUrl = "/crearSensor/";
    private mostrarTipoMedicionesUrl="/mostrarTipoMedicion/";
    private mostrarSensoresFincaUrl="/mostrarSensoresFinca/";
    private modificarSensorFincaUrl="/modificarSensor/";
    private deshabilitarSensorFincaUrl="/deshabilitarSensor/";
    private buscarSensorIdUrl = "/buscarSensorId/";

    constructor(private http: Http) { super(); }

    crearSensor(idTipoMedicion: number, modeloSensor: string, idFinca: number): Promise<any> {
        const data = {
            'idTipoMedicion': idTipoMedicion,
            'modeloSensor': modeloSensor,
            'idFinca': idFinca
        };

        return this.http.post(ABMSensorFincaService.serverUrl + this.crearSensorUrl, JSON.stringify(data), this.getRestHeader())
            .toPromise()
            .then(response => {
                return response.json() as any;
            })
            .catch(this.handleError);
    }

    buscarTipoMediciones(): Promise<TipoMediciones> { 
        return this.http.get(ABMSensorFincaService.serverUrl + this.mostrarTipoMedicionesUrl, this.getRestHeader())
        .toPromise()
        .then(response => {return response.json() as TipoMediciones;})
        .catch(this.handleError);
    }

    mostrarSensoresFinca(idFinca:number):Promise<Sensor>{
        const data = {
            'idFinca': idFinca
        };

        return this.http.post(ABMSensorFincaService.serverUrl + this.mostrarSensoresFincaUrl, JSON.stringify(data), this.getRestHeader())
            .toPromise()
            .then(response => {
                return response.json() as any;
            })
            .catch(this.handleError);
    }

    modificarSensor(idTipoMedicion: number, modeloSensor: string, idSensor: number,idFinca:number): Promise<any> {
        const data = {
            'idTipoMedicion': idTipoMedicion,
            'modeloSensor': modeloSensor,
            'idSensor': idSensor,
            'idFinca':idFinca
        };

        return this.http.post(ABMSensorFincaService.serverUrl + this.modificarSensorFincaUrl, JSON.stringify(data), this.getRestHeader())
            .toPromise()
            .then(response => {
                return response.json() as any;
            })
            .catch(this.handleError);
    }

    deshabilitarSensor(idSensor:number,idFinca:number){
        const data = {
            'idSensor': idSensor,
            'idFinca':idFinca
        };

        return this.http.post(ABMSensorFincaService.serverUrl + this.deshabilitarSensorFincaUrl, JSON.stringify(data), this.getRestHeader())
            .toPromise()
            .then(response => {
                return response.json() as any;
            })
            .catch(this.handleError);
    }

    buscarSensorId(idSensor:number,idFinca:number):Promise<Sensor>{
        const data = {
            'idSensor': idSensor,
            'idFinca':idFinca
        };

        return this.http.post(ABMSensorFincaService.serverUrl + this.buscarSensorIdUrl, JSON.stringify(data), this.getRestHeader())
            .toPromise()
            .then(response => {
                return response.json() as any;
            })
            .catch(this.handleError);    
    }
}

export interface TipoMediciones {
    resultado: boolean;
    datos_operacion;
    detalle_operacion;
}

export interface Sensor{
    resultado:boolean;
    datos_operacion;
    detalle_operacion;
}