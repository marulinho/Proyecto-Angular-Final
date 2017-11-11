import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { RestBaseService } from '../../tools/rest.tools';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class GestionarProveedorInformacionService extends RestBaseService{
  private modificarProveedorUrl = '/modificarProveedorFinca/';
  private obtenerTodosProvUrl = '/buscarProveedoresInformacion/';  
  private obtenerProvFincaUrl = '/obtenerProveedorFinca/';
  private deshabilitarProvUrl ='/deshabilitarProveedorFinca/';
  private cambiarProvUrl= '/cambiarProveedorFinca/';
  private buscarProveedorNombreUrl = "/buscarProveedorNombre/";

  
  constructor(private http: Http) {super();}


  obtenerProveedores(idFinca:number):Promise<ProveedorInformacion>{
    const data = {
      'idFinca': idFinca,
    };

    return this.http.post(GestionarProveedorInformacionService.serverUrl +this.obtenerProvFincaUrl, JSON.stringify(data), this.getRestHeader())
      .toPromise()
      .then(response => {
        return response.json() as ProveedorInformacion;
      })
      .catch(this.handleError);
  }

  obtenerTodosProveedores():Promise<ProveedorInformacion>{
    return this.http.get(GestionarProveedorInformacionService.serverUrl + this.obtenerTodosProvUrl, this.getRestHeader())
    .toPromise()
    .then(response => {return response.json() as ProveedorInformacion;})
    .catch(this.handleError);
  }

  buscarProveedorNombre(nombreProveedor):Promise<ProveedorInformacion>{
    const data = {
      //'idFinca': idFinca,
      'nombreProveedor':nombreProveedor
    };

    return this.http.post(GestionarProveedorInformacionService.serverUrl +this.buscarProveedorNombreUrl, JSON.stringify(data), this.getRestHeader())
      .toPromise()
      .then(response => {
        return response.json() as ProveedorInformacion;
      })
      .catch(this.handleError);
  
  }

  modificarProveedor(idFinca:number,nombreProveedor:string,frecuencia:number):Promise<any>{
    const data = {
        'idFinca': idFinca,
        'nombreProveedor': nombreProveedor,
        'frecuencia':frecuencia
      };
  
      return this.http.post(GestionarProveedorInformacionService.serverUrl +this.modificarProveedorUrl, JSON.stringify(data), this.getRestHeader())
        .toPromise()
        .then(response => {
          return response.json() as any;
        })
        .catch(this.handleError);
  }

  deshabilitarProveedor(idFinca:number,nombreProveedor:string):Promise<any>{
    const data = {
        'idFinca': idFinca,
        'nombreProveedor': nombreProveedor
      };
  
      return this.http.post(GestionarProveedorInformacionService.serverUrl +this.deshabilitarProvUrl, JSON.stringify(data), this.getRestHeader())
        .toPromise()
        .then(response => {
          return response.json() as any;
        })
        .catch(this.handleError);
  }

  cambiarProveedor(idFinca:number,nombreProveedor:string,frecuencia:number):Promise<any>{
    const data = {
        'idFinca': idFinca,
        'nombreProveedor': nombreProveedor,
        'frecuencia':frecuencia
      };
  
      return this.http.post(GestionarProveedorInformacionService.serverUrl +this.cambiarProvUrl, JSON.stringify(data), this.getRestHeader())
        .toPromise()
        .then(response => {
          return response.json() as any;
        })
        .catch(this.handleError);
  }
  
}

export interface ProveedorInformacion {
  resultado:boolean;
  datos_operacion;
  detalle_operacion;
}




