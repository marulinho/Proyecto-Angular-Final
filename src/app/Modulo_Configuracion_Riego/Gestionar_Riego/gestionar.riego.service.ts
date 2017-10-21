import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { RestBaseService } from '../../tools/rest.tools';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class GestionarRiegoService extends RestBaseService {

    private obtenerRiegoEnEjecucionMecanismoRiegoFincaSectorUrl = "/obtenerRiegoEnEjecucionMecanismoRiegoFincaSector/";
    private iniciarRiegoManualmenteUrl = "/iniciarRiegoManualmente/";
    private pausarRiegoManualmenteUrl = "/pausarRiegoManualmente/";
    private cancelarRiegoManualmenteUrl= "/cancelarRiegoManualmente/";

    constructor(private http: Http) { super(); }

    obtenerRiegoEnEjecucion(idFinca: number, idMecanismoRiegoFincaSector: number): Promise<Riego> {
        const data = {
            'idFinca': idFinca,
            'idMecanismoRiegoFincaSector': idMecanismoRiegoFincaSector
        };
        return this.http.post(GestionarRiegoService.serverUrl + this.obtenerRiegoEnEjecucionMecanismoRiegoFincaSectorUrl, JSON.stringify(data), this.getRestHeader())
            .toPromise()
            .then(response => { return response.json() as Riego; })
            .catch(this.handleError);
    }

    iniciarRiegoManualmente(idFinca: number, idMecanismoRiegoFincaSector: number): Promise<any> {
        const data = {
            'idFinca': idFinca,
            'idMecanismoRiegoFincaSector': idMecanismoRiegoFincaSector
        };
        return this.http.post(GestionarRiegoService.serverUrl + this.iniciarRiegoManualmenteUrl, JSON.stringify(data), this.getRestHeader())
            .toPromise()
            .then(response => { return response.json() as any; })
            .catch(this.handleError);
    }

    pausarRiegoManualmente(idFinca: number, idMecanismoRiegoFincaSector: number): Promise<any> {
        const data = {
            'idFinca': idFinca,
            'idMecanismoRiegoFincaSector': idMecanismoRiegoFincaSector
        };
        return this.http.post(GestionarRiegoService.serverUrl + this.pausarRiegoManualmenteUrl, JSON.stringify(data), this.getRestHeader())
            .toPromise()
            .then(response => { return response.json() as any; })
            .catch(this.handleError);
    }

    cancelarRiegoManualmente(idFinca: number, idMecanismoRiegoFincaSector: number): Promise<any> {
        const data = {
            'idFinca': idFinca,
            'idMecanismoRiegoFincaSector': idMecanismoRiegoFincaSector
        };
        return this.http.post(GestionarRiegoService.serverUrl + this.cancelarRiegoManualmenteUrl, JSON.stringify(data), this.getRestHeader())
            .toPromise()
            .then(response => { return response.json() as any; })
            .catch(this.handleError);
    }


}

export interface Riego {
    resultado: boolean;
    datos_operacion;
    detalle_operacion;
}

