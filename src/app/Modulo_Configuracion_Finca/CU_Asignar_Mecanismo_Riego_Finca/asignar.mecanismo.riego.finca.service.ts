import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { RestBaseService } from '../../tools/rest.tools';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AsignarMecanismoRiegoFincaService extends RestBaseService{
  
  private mostrarMecanismosUrl = "/mostrarMecanismosRiegoFinca/";
  private mostrarMecanismosNuevosUrl="/mostrarMecanismosNuevos/";
  private habilitarMecanismoUrl="/habilitarMecanismoRiegoFinca/";
  private deshabilitarMecanismoUrl="/deshabilitarMecanismoRiegoFinca/";
  private agregarMecanismoUrl="/agregarMecanismoRiegoFinca/";
 


  constructor(private http: Http) {super();}

  mostrarMecanismoRiegoFinca(idFinca:number):Promise<MecanismoRiego> {
    const data = {
      'idFinca':idFinca
    };
    return this.http.post(AsignarMecanismoRiegoFincaService.serverUrl + this.mostrarMecanismosUrl, JSON.stringify(data), this.getRestHeader())
    .toPromise()
    .then(response => {return response.json() as MecanismoRiego;})
    .catch(this.handleError);
  }

  mostrarMecanismoRiegoNuevosFinca(idFinca:number): Promise<any> {
    const data = {
        'idFinca':idFinca
      };
      return this.http.post(AsignarMecanismoRiegoFincaService.serverUrl + this.mostrarMecanismosNuevosUrl, JSON.stringify(data), this.getRestHeader())
      .toPromise()
      .then(response => {return response.json() as MecanismoRiego;})
      .catch(this.handleError);
    
  }
  
  habilitarMecanismoFinca(idFinca,idMecanismoRiegoFinca:number):Promise<any>{
    const data = {
        'idFinca':idFinca,
        'idMecanismoRiegoFinca':idMecanismoRiegoFinca
      };
      return this.http.post(AsignarMecanismoRiegoFincaService.serverUrl + this.habilitarMecanismoUrl, JSON.stringify(data), this.getRestHeader())
      .toPromise()
      .then(response => {return response.json() as MecanismoRiego;})
      .catch(this.handleError);
  }

  deshabilitarMecanismoFinca(idFinca,idMecanismoRiegoFinca:number):Promise<any>{
    const data = {
        'idFinca':idFinca,
        'idMecanismoRiegoFinca':idMecanismoRiegoFinca
      };
      return this.http.post(AsignarMecanismoRiegoFincaService.serverUrl + this.deshabilitarMecanismoUrl, JSON.stringify(data), this.getRestHeader())
      .toPromise()
      .then(response => {return response.json() as MecanismoRiego;})
      .catch(this.handleError);
  }

  agregarMecanismoRiegoFinca(idFinca: number, nombreTipoMecanismo: string, direccionIp:string): Promise<any> {
    const data = {
      'idFinca': idFinca,
      'nombreTipoMecanismo': nombreTipoMecanismo,
      'direccionIP':direccionIp
    };

    return this.http.put(AsignarMecanismoRiegoFincaService.serverUrl +this.agregarMecanismoUrl, JSON.stringify(data), this.getRestHeader())
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




