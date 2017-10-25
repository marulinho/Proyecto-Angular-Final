import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { RestBaseService } from '../../tools/rest.tools';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AsignarMecanismoRiegoSectorService extends RestBaseService{
  private mostrarMecanismoRiegoSectorUrl = "/mostrarMecanismoRiegoSector/";
  private asignarMecanismoASectorUrl = "/asignarMecanismoASector/";
  private deshabilitarMecanismoRiegoSectorUrl="/deshabilitarMecanismoRiegoSector/";

  constructor(private http: Http) {super();}

  mostrarMecanismos(idSector:number):Promise<MecanismoRiego> {
    const data = {
      'idSector':idSector
    };
    return this.http.post(AsignarMecanismoRiegoSectorService.serverUrl + this.mostrarMecanismoRiegoSectorUrl, JSON.stringify(data), this.getRestHeader())
    .toPromise()
    .then(response => {return response.json() as MecanismoRiego;})
    .catch(this.handleError);
  }

  deshabilitarMecanismoSector(idMecanismoRiegoFincaSector:number,idFinca:number):Promise<any> {
    const data = {
      'idMecanismoRiegoFincaSector':idMecanismoRiegoFincaSector,
      'idFinca':idFinca
    };
    return this.http.post(AsignarMecanismoRiegoSectorService.serverUrl + this.deshabilitarMecanismoRiegoSectorUrl, JSON.stringify(data), this.getRestHeader())
    .toPromise()
    .then(response => {return response.json() as any;})
    .catch(this.handleError);
  }

  asignarMecanismoSector(idSector:number,idMecanismoRiegoFinca:number,caudalMecanismoRiego:number,presionMecanismoRiego:number,idFinca:number): Promise<any> {
    const data = {
      'idSector': idSector,
      'idMecanismoRiegoFinca': idMecanismoRiegoFinca,
      'caudalMecanismoRiego':caudalMecanismoRiego,
      'presionMecanismoRiego':presionMecanismoRiego,
      'idFinca':idFinca
    };

    return this.http.put(AsignarMecanismoRiegoSectorService.serverUrl +this.asignarMecanismoASectorUrl, JSON.stringify(data), this.getRestHeader())
      .toPromise()
      .then(response => {
        return response.json() as any;
      })
      .catch(this.handleError);
  }
 

 
  
}

export interface MecanismoRiego {
  resultado:boolean;
  datos_operacion;
  detalle_operacion;
}


