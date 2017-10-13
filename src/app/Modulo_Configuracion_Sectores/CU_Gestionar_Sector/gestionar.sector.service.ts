import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { RestBaseService } from '../../tools/rest.tools';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class GestionarSectorFincaService extends RestBaseService{
  private mostrarSectoresUrl = "/mostrarSectores/";
  private eliminarSectorUrl = "/eliminarSector/";

  constructor(private http: Http) {super();}

  buscarSectoresFinca(id:number):Promise<Sector> {
    const data = {
      'idFinca':id
    };
    return this.http.post(GestionarSectorFincaService.serverUrl + this.mostrarSectoresUrl, JSON.stringify(data), this.getRestHeader())
    .toPromise()
    .then(response => {return response.json() as Sector;})
    .catch(this.handleError);
  }

  eliminarSectorFinca(idSector:number): Promise<any> {
    const data = {
      'idSector':idSector
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


