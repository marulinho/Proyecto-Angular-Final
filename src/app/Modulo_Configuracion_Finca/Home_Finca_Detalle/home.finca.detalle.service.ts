import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { RestBaseService } from '../../tools/rest.tools';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HomeFincaDetalleService extends RestBaseService {
  private buscarFincaUrl = "/buscarFincaId/";
  private eliminarFincaUrl = "/eliminarFinca/";
  private devolverPermisosUrl = "/devolverPermisos/";



  constructor(private http: Http) { super(); }

  buscarFinca(id: number): Promise<Finca> {
    const data = {
      'idFinca': id
    };
    return this.http.post(HomeFincaDetalleService.serverUrl + this.buscarFincaUrl, JSON.stringify(data), this.getRestHeader())
      .toPromise()
      .then(response => { return response.json() as Finca; })
      .catch(this.handleError);
  }

  eliminarFinca(idFinca: number): Promise<any> {
    const data = {
      'idFinca': idFinca
    };
    return this.http.post(HomeFincaDetalleService.serverUrl + this.eliminarFincaUrl, JSON.stringify(data), this.getRestHeader())
      .toPromise()
      .then(response => {
        return "";
      })
      .catch(this.handleError);

  }

  devolverPermisos(idFinca: number): Promise<Permisos> {
    const data = {
      'idFinca': idFinca
    };
    return this.http.post(HomeFincaDetalleService.serverUrl + this.devolverPermisosUrl, JSON.stringify(data), this.getRestHeader())
      .toPromise()
      .then(response => { return response.json() as Permisos; })
      .catch(this.handleError);
  }

}

export interface Finca {
  resultado: boolean;
  datos_operacion;
  detalle_operacion;
}

export interface Permisos {
  resultado: boolean;
  datos_operacion;
  detalle_operacion;
}



