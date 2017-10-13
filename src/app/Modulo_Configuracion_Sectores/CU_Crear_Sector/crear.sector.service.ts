import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { RestBaseService } from '../../tools/rest.tools';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CrearSectorFincaService extends RestBaseService{
  private crearSectorFincaUrl = "/crearSector/";

  constructor(private http: Http) {super();}

  crearSector(id:number,nombre:string,numero:number,descripcion:string,superficie:number):Promise<Sector> {
    const data = {
      'idFinca':id,
      'numeroSector':numero,
      'nombreSector':nombre,
      'descripcionSector':descripcion,
      'superficieSector':superficie
    };
    return this.http.put(CrearSectorFincaService.serverUrl + this.crearSectorFincaUrl, JSON.stringify(data), this.getRestHeader())
    .toPromise()
    .then(response => {return response.json() as Sector;})
    .catch(this.handleError);
  }
  
}

export interface Sector {
  resultado:boolean;
  datos_operacion;
  detalle_operacion;
}





