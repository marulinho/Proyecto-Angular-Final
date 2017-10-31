import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { RestBaseService } from '../../tools/rest.tools';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class GestionarSectorFincaService extends RestBaseService{
  private mostrarSectoresUrl = "/mostrarSectores/";
  private eliminarSectorUrl = "/eliminarSector/";
  private buscarSectorIdUrl="/buscarSectorId/";
  private modificarSectorUrl="/modificarSector/";


  constructor(private http: Http) {super();}

  buscarSectoresFinca(idFinca:number):Promise<Sector> {
    const data = {
      'idFinca':idFinca
    };
    return this.http.post(GestionarSectorFincaService.serverUrl + this.mostrarSectoresUrl, JSON.stringify(data), this.getRestHeader())
    .toPromise()
    .then(response => {return response.json() as Sector;})
    .catch(this.handleError);
  }

  buscarSectorId(idSector:number,idFinca:number):Promise<Sector> {
    const data = {
      'idSector':idSector,
      'idFinca':idFinca
    };
    return this.http.post(GestionarSectorFincaService.serverUrl + this.buscarSectorIdUrl, JSON.stringify(data), this.getRestHeader())
    .toPromise()
    .then(response => {return response.json() as Sector;})
    .catch(this.handleError);
  }

  modificarSector(id:number,nombre:string,descripcion:string,superficie:number,idFinca:number):Promise<any> {
    const data = {
      'idSector':id,
      'nombreSector':nombre,
      'descripcionSector':descripcion,
      'superficieSector':superficie,
      'idFinca':idFinca
    };
    return this.http.post(GestionarSectorFincaService.serverUrl + this.modificarSectorUrl, JSON.stringify(data), this.getRestHeader())
    .toPromise()
    .then(response => {return response.json() as any;})
    .catch(this.handleError);
  }

  eliminarSectorFinca(idSector:number, idFinca:number): Promise<any> {
    const data = {
      'idSector':idSector,
      'idFinca':idFinca
    };
      return this.http.post(GestionarSectorFincaService.serverUrl + this.eliminarSectorUrl,JSON.stringify(data),this.getRestHeader())
      .toPromise()
      .then(response => {
        return "";
      })
      .catch(this.handleError);
    
  }

 
  
}

export interface Sector {
  resultado:boolean;
  datos_operacion;
  detalle_operacion;
}


