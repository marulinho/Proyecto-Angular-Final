import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { RestBaseService } from '../../tools/rest.tools';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AsignarSensorComponenteSensorService extends RestBaseService {

    private asignarSensorComponenteUrl = "/asignarSensorAComponenteSensor/";
    private desasignarSensorComponenteUrl="/desasignarSensorDeComponenteSensor/";
    private buscarSensoresNoAsignadosUrl="/buscarSensoresNoAsignados/";
    private buscarSensoresAsignadosUrl="/buscarSensoresComponente/";
    
    constructor(private http: Http) { super(); }

    asignarSensorComponente(idFinca: number, idComponenteSensor: number, idSensor: number): Promise<any> {
        const data = {
            'idFinca': idFinca,
            'idComponenteSensor': idComponenteSensor,
            'idSensor': idSensor
        };

        return this.http.post(AsignarSensorComponenteSensorService.serverUrl + this.asignarSensorComponenteUrl, JSON.stringify(data), this.getRestHeader())
            .toPromise()
            .then(response => {
                return response.json() as any;
            })
            .catch(this.handleError);
    }

    desasignarSensorComponente(idFinca: number, idComponenteSensor: number, idSensor: number): Promise<any> {
        const data = {
            'idFinca': idFinca,
            'idComponenteSensor': idComponenteSensor,
            'idSensor': idSensor
        };

        return this.http.post(AsignarSensorComponenteSensorService.serverUrl + this.desasignarSensorComponenteUrl, JSON.stringify(data), this.getRestHeader())
            .toPromise()
            .then(response => {
                return response.json() as any;
            })
            .catch(this.handleError);
    }

    buscarSensoresNoAsignados(idFinca: number): Promise<any> {
        const data = {
            'idFinca': idFinca
        };

        return this.http.post(AsignarSensorComponenteSensorService.serverUrl + this.buscarSensoresNoAsignadosUrl, JSON.stringify(data), this.getRestHeader())
            .toPromise()
            .then(response => {
                return response.json() as Sensor;
            })
            .catch(this.handleError);
    }

    buscarSensoresAsignadosComponente(idComponenteSensor:number):Promise<Sensor>{
        const data = {
            'idComponenteSensor': idComponenteSensor
        };

        return this.http.post(AsignarSensorComponenteSensorService.serverUrl + this.buscarSensoresAsignadosUrl, JSON.stringify(data), this.getRestHeader())
            .toPromise()
            .then(response => {
                return response.json() as Sensor;
            })
            .catch(this.handleError);
    }

 }

 export interface Sensor {
    resultado: boolean;
    datos_operacion;
    detalle_operacion;
}

