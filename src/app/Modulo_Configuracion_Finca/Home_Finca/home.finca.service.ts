import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { RestBaseService } from '../../tools/rest.tools';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HomeFincaService extends RestBaseService{
  private fincasUsuarioUrl = '/obtenerFincasPorUsuario/';
  private rehabilitarFincaUrl='/rehabilitarFinca/';


  constructor(private http: Http) {super();}
  
  obtenerFincasUsuario():Promise<Finca>{
    return this.http.get(HomeFincaService.serverUrl + this.fincasUsuarioUrl, this.getRestHeader())
    .toPromise()
    .then(response => {return response.json() as Finca;})
    .catch(this.handleError);
  }

  habilitarFinca(idFinca:number):Promise<any>{
    const data = {
      'idFinca': idFinca
    };

    return this.http.post(HomeFincaService.serverUrl +this.rehabilitarFincaUrl, JSON.stringify(data), this.getRestHeader())
      .toPromise()
      .then(response => {
        return response.json() as any;
      })
      .catch(this.handleError);
  }

}

export interface Finca {
  resultado:boolean;
  datos_operacion;
  detalle_operacion;
  
}



