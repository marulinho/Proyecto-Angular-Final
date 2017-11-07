import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { RestBaseService } from '../../tools/rest.tools';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class FinalizarSesionService extends RestBaseService{
  private cerrarSesionUrl = '/finalizarSesion/';

  constructor(private http: Http) {super();}

  cerrarSesion():Promise<Boolean> {


    return this.http.post(FinalizarSesionService.serverUrl +this.cerrarSesionUrl, this.getRestHeader(),{
      withCredentials:true})
      .toPromise()
      .then(response => {
        return response.json() as Boolean;
      })
      .catch(this.handleError);
  }

}




