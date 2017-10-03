import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { RestBaseService } from '../../tools/rest.tools';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HomeFincaService extends RestBaseService{
  private fincasPendientesUrl = '/obtenerFincasEstadoPendiente/';
  private fincasUsuarioUrl = '/obtenerFincasPorUsuario/';
  private fincasEncargadoUrl = '/mostrarFincasEncargado/';


  constructor(private http: Http) {super();}

  obtenerFincasPendientes():Promise<Finca[]> {
    return this.http.get(HomeFincaService.serverUrl + this.fincasPendientesUrl, this.getRestHeader())
    .toPromise()
    .then(response => {return response.json() as Finca[];})
    .catch(this.handleError);
  }
  
  obtenerFincasUsuario():Promise<FincaUsuario[]>{
    return this.http.get(HomeFincaService.serverUrl + this.fincasUsuarioUrl, this.getRestHeader())
    .toPromise()
    .then(response => {return response.json() as FincaUsuario[];})
    .catch(this.handleError);
  }

  obtenerFincasEncargado():Promise<Finca[]>{
    return this.http.get(HomeFincaService.serverUrl + this.fincasEncargadoUrl, this.getRestHeader())
    .toPromise()
    .then(response => {return response.json() as Finca[];})
    .catch(this.handleError);
  }



}

export interface Finca {
  nombre:string;
  ubicacion:string;
  tamanio: number;
  direccionLegal:string;
  
}

export interface FincaUsuario {
  nombreFinca:string;
  nombreRol:string;
  idFinca:number;
  
}


