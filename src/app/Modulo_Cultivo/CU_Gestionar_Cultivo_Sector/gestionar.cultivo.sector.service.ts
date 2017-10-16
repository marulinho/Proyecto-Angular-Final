import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { RestBaseService } from '../../tools/rest.tools';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class GestionarCultivoSectorService extends RestBaseService{
  private modificarCultivoSectorUrl = "/modificarCultivoSector/";
  private deshabilitarCultivoSectorUrl = "/deshabilitarCultivoSector/";
  private mostrarCultivoSectorUrl="/mostrarCultivoSector/";


  constructor(private http: Http) {super();}

  modificarCultivoSector(idCultivo:number,descripcionCultivo:string,nombreCultivo:string,fechaPlantacion:string):Promise<any> {
    const data = {
      'idCultivo':idCultivo,
      'descripcionCultivo':descripcionCultivo,
      'nombreCultivo':nombreCultivo,
      'fechaPlantacion':fechaPlantacion
    };
    return this.http.post(GestionarCultivoSectorService.serverUrl + this.modificarCultivoSectorUrl, JSON.stringify(data), this.getRestHeader())
    .toPromise()
    .then(response => {return response.json() as any;})
    .catch(this.handleError);
  }

  deshabilitarCultivoSector(idCultivo:number):Promise<any> {
    const data = {
      'idCultivo':idCultivo
    };
    return this.http.post(GestionarCultivoSectorService.serverUrl + this.deshabilitarCultivoSectorUrl, JSON.stringify(data), this.getRestHeader())
    .toPromise()
    .then(response => {return response.json() as any;})
    .catch(this.handleError);
  }
  
  mostrarCultivoSector(idSector:number):Promise<Cultivo>{
    const data = {
        'idSector':idSector
      };
      return this.http.post(GestionarCultivoSectorService.serverUrl + this.mostrarCultivoSectorUrl, JSON.stringify(data), this.getRestHeader())
      .toPromise()
      .then(response => {return response.json() as Cultivo;})
      .catch(this.handleError);
  }
  
}

export interface Cultivo {
  resultado:boolean;
  datos_operacion;
  detalle_operacion;
}


