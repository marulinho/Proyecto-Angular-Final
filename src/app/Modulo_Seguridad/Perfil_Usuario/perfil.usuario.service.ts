import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { RestBaseService } from '../../tools/rest.tools';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class PerfilUsuarioService extends RestBaseService{
  
  private obtenerUsuarioActualUrl='/mostrarUsuario/';

  constructor(private http: Http) {super();}

  obtenerUsuarioActual(): Promise<Usuario> {
    return this.http.get(PerfilUsuarioService.serverUrl + this.obtenerUsuarioActualUrl, this.getRestHeader())
    .toPromise()
    .then(response => {return response.json() as Usuario;})
    .catch(this.handleError);
  }


}

export interface Usuario {
  resultado;
  datos_operacion;
  detalle_operacion;

  
}

