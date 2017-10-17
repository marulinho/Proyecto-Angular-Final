import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { RestBaseService } from '../../tools/rest.tools';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AsignarComponenteSensorSectorService extends RestBaseService{
    
    private asignarComponenteSensorSectorUrl = "/asignarComponenteSensor/";
    private desasignarComponenteSensorSectorUrl="/desasignarComponenteSensor/";
    private mostrarComponenteSensorSectorUrl="/mostrarComponenteSensorSector/";
    private mostrarComponentesSensorFincaNoAsignadosUrl ="/mostrarComponentesSensorFincaNoAsignados/";
    
    constructor(private http: Http) { super(); }

    asignarComponenteSector(idFinca: number, idComponenteSensor: number, idSector: number): Promise<any> {
        const data = {
            'idFinca': idFinca,
            'idComponenteSensor': idComponenteSensor,
            'idSector': idSector
        };

        return this.http.post(AsignarComponenteSensorSectorService.serverUrl + this.asignarComponenteSensorSectorUrl, JSON.stringify(data), this.getRestHeader())
            .toPromise()
            .then(response => {
                return response.json() as any;
            })
            .catch(this.handleError);
    }

    desasignarComponenteSector(idFinca: number, idComponenteSensor: number, idSector: number): Promise<any> {
        const data = {
            'idFinca': idFinca,
            'idComponenteSensor': idComponenteSensor,
            'idSector': idSector
        };

        return this.http.post(AsignarComponenteSensorSectorService.serverUrl + this.desasignarComponenteSensorSectorUrl, JSON.stringify(data), this.getRestHeader())
            .toPromise()
            .then(response => {
                return response.json() as any;
            })
            .catch(this.handleError);
    }

    buscarComponenteSector(idSector: number): Promise<ComponenteSensor> {
        const data = {
            'idSector': idSector
        };

        return this.http.post(AsignarComponenteSensorSectorService.serverUrl + this.mostrarComponenteSensorSectorUrl, JSON.stringify(data), this.getRestHeader())
            .toPromise()
            .then(response => {
                return response.json() as ComponenteSensor;
            })
            .catch(this.handleError);
    }

    buscarComponenteFincaNoAsignados(idFinca: number): Promise<ComponenteSensor> {
        const data = {
            'idFinca': idFinca
        };

        return this.http.post(AsignarComponenteSensorSectorService.serverUrl + this.mostrarComponentesSensorFincaNoAsignadosUrl, JSON.stringify(data), this.getRestHeader())
            .toPromise()
            .then(response => {
                return response.json() as ComponenteSensor;
            })
            .catch(this.handleError);
    }

 }

 export interface ComponenteSensor {
    resultado: boolean;
    datos_operacion;
    detalle_operacion;
}


