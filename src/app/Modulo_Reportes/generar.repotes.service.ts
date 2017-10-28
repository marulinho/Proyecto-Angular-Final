import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { RestBaseService } from '../tools/rest.tools';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class GenerarReportesService extends RestBaseService {

    private obtenerEstadoActualSectorUrl = "/obtenerEstadoActualSector/";
    private obtenerInformeRiegoEjecucionSectorUrl = "/obtenerInformeRiegoEjecucionSector/";
    private obtenerInformeHistoricoSectorUrl = "/obtenerInformeHistoricoSector/";
    private obtenerInformeRiegoHistoricoSectorUrl = "/obtenerInformeRiegoHistoricoSector/";
    private obtenerInformeEventosPersonalizadosUrl="/obtenerInformeEventosPersonalizados/";
    private obtenerInformaHistoricoHeladasUrl="/obtenerInformeHistoricoHeladas/";
    private obtenerInformaMedicionCruzadaUrl="/obtenerInformeCruzadoRiegoMediciones/";

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

    obtenerInformeHistoricoSector(idSector: number, idFinca:number, fechaInicioSector:string, fechaFinSector:string): Promise<HistoricoSector> {
        const data = {
            'idSector': idSector,
            'idFinca':idFinca,
            'fechaInicioSector':fechaInicioSector,
            'fechaFinSector':fechaFinSector
        };
        return this.http.post(GenerarReportesService.serverUrl + this.obtenerInformeHistoricoSectorUrl, JSON.stringify(data), this.getRestHeader())
            .toPromise()
            .then(response => { return response.json() as HistoricoSector; })
            .catch(this.handleError);
    }

    obtenerInformeRiegosHistoricoSector(idSector: number, idFinca:number, fechaInicioSector:string, fechaFinSector:string): Promise<RiegoSector> {
        const data = {
            'idSector': idSector,
            'idFinca':idFinca,
            'fechaInicioSector':fechaInicioSector,
            'fechaFinSector':fechaFinSector
        };
        return this.http.post(GenerarReportesService.serverUrl + this.obtenerInformeRiegoHistoricoSectorUrl, JSON.stringify(data), this.getRestHeader())
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

    obtenerInformeHeladasHistorico(idFinca:number,idSector: number,fechaInicioSector:string,fechaFinSector:string): Promise<Helada> {
        const data = {
            'idFinca': idFinca,
            'idSector':idSector,
            'fechaInicioSector':fechaInicioSector,
            'fechaFinSector':fechaFinSector
        };
        return this.http.post(GenerarReportesService.serverUrl + this.obtenerInformaHistoricoHeladasUrl, JSON.stringify(data), this.getRestHeader())
            .toPromise()
            .then(response => { return response.json() as InformeEvento; })
            .catch(this.handleError);
    }

    obtenerInformeMedicionCruzada(idFinca:number,idSector: number,fechaInicioSector:string,fechaFinSector:string): Promise<MedicionCruzada> {
        const data = {
            'idFinca': idFinca,
            'idSector':idSector,
            'fechaInicioSector':fechaInicioSector,
            'fechaFinSector':fechaFinSector
        };
        return this.http.post(GenerarReportesService.serverUrl + this.obtenerInformaMedicionCruzadaUrl, JSON.stringify(data), this.getRestHeader())
            .toPromise()
            .then(response => { return response.json() as MedicionCruzada; })
            .catch(this.handleError);
    }

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

export interface HistoricoSector {
    resultado: boolean;
    datos_operacion;
    detalle_operacion;
}

export interface InformeEvento {
    resultado: boolean;
    datos_operacion;
    detalle_operacion;
}

export interface Helada{
    resultado: boolean;
    datos_operacion;
    detalle_operacion;
}

export interface MedicionCruzada{
    resultado: boolean;
    datos_operacion;
    detalle_operacion;
}
