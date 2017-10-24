import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { RestBaseService } from '../tools/rest.tools';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class GenerarReportesService extends RestBaseService {

    private obtenerEstadoActualSectorUrl = "/obtenerEstadoActualSector/";
    private obtenerInformeRiegoEjecucionSectorUrl = "/obtenerInformeRiegoEjecucionSector/";
    private obtenerInformeHistoricoSectorUrl = "/obtenerInformeHistoricoSector/";
    private obtenerInformeRiegoHistoricoSector = "/obtenerInformeRiegoHistoricoSector /";
    private obtenerInformeEventosPersonalizadosUrl="/obtenerInformeEventosPersonalizados/";
    private recibirMedicionUrl="/recibirMedicion/";


    constructor(private http: Http) { super(); }

    obtenerEstadoActualSector(idSector: number, idFinca:number): Promise<EstadoActualSector> {
        const data = {
            'idSector': idSector,
            'idFinca':idFinca
        };
        return this.http.post(GenerarReportesService.serverUrl + this.obtenerEstadoActualSectorUrl, JSON.stringify(data), this.getRestHeader())
            .toPromise()
            .then(response => { return response.json() as EstadoActualSector; })
            .catch(this.handleError);
    }

    obtenerInformeRiegoEjecucionSector(idSector: number,idFinca:number): Promise<RiegoSector> {
        const data = {
            'idSector': idSector,
            'idFinca':idFinca
        };
        return this.http.post(GenerarReportesService.serverUrl + this.obtenerInformeRiegoEjecucionSectorUrl, JSON.stringify(data), this.getRestHeader())
            .toPromise()
            .then(response => { return response.json() as RiegoSector; })
            .catch(this.handleError);
    }

    obtenerInformeComponentesHistoricoSector(idSector: number, idFinca:number, fechaInicioSector:string, fechaFinSector:string): Promise<ComponenteSector> {
        const data = {
            'idSector': idSector,
            'idFinca':idFinca,
            'fechaInicioSector':fechaInicioSector,
            'fechaFinSector':fechaFinSector
        };
        return this.http.post(GenerarReportesService.serverUrl + this.obtenerInformeHistoricoSectorUrl, JSON.stringify(data), this.getRestHeader())
            .toPromise()
            .then(response => { return response.json() as ComponenteSector; })
            .catch(this.handleError);
    }

    obtenerInformeRiegosHistoricoSector(idSector: number, idFinca:number, fechaInicioSector:string, fechaFinSector:string): Promise<RiegoSector> {
        const data = {
            'idSector': idSector,
            'idFinca':idFinca,
            'fechaInicioSector':fechaInicioSector,
            'fechaFinSector':fechaFinSector
        };
        return this.http.post(GenerarReportesService.serverUrl + this.obtenerInformeRiegoEjecucionSectorUrl, JSON.stringify(data), this.getRestHeader())
            .toPromise()
            .then(response => { return response.json() as RiegoSector; })
            .catch(this.handleError);
    }

    obtenerInformeEventosPersonalizados(idConfiguracionEvento: number,idFinca:number): Promise<InformeEvento> {
        const data = {
            'idConfiguracionEvento': idConfiguracionEvento,
            'idFinca':idFinca
        };
        return this.http.post(GenerarReportesService.serverUrl + this.obtenerInformeEventosPersonalizadosUrl, JSON.stringify(data), this.getRestHeader())
            .toPromise()
            .then(response => { return response.json() as InformeEvento; })
            .catch(this.handleError);
    }

    /*recibirMedicion(idConfiguracionEvento: number): Promise<InformeEvento> {
        const data = {
            'idConfiguracionEvento': idConfiguracionEvento
        };
        return this.http.post(GenerarReportesService.serverUrl + this.obtenerInformeEventosPersonalizadosUrl, JSON.stringify(data), this.getRestHeader())
            .toPromise()
            .then(response => { return response.json() as InformeEvento; })
            .catch(this.handleError);
    }*/
}

export interface EstadoActualSector {
    resultado: boolean;
    datos_operacion;
    detalle_operacion;
}

export interface RiegoSector {
    resultado: boolean;
    datos_operacion;
    detalle_operacion;
}

export interface ComponenteSector {
    resultado: boolean;
    datos_operacion;
    detalle_operacion;
}

export interface InformeEvento {
    resultado: boolean;
    datos_operacion;
    detalle_operacion;
}
