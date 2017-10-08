import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { RestBaseService } from '../../tools/rest.tools';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class RecuperarCuentaService extends RestBaseService{
  private recuerparUrl = '/recuperarCuenta/';
  private cambiarContraRecuCuentaUrl='/cambiarContraseniaRecuperarCuenta/';

  


  constructor(private http: Http) {super();}

  recuperarCuenta(email:string):Promise<ResultadoRecuperacion> {
    const data = {
      'email': email
    };

    return this.http.post(RecuperarCuentaService.serverUrl +this.recuerparUrl, JSON.stringify(data), this.getRestHeader())
      .toPromise()
      .then(response => {
        return response.json() as ResultadoRecuperacion;
      })
      .catch(this.handleError);
  }

  cambiarContraseniaRecuperarCuenta(usuario:string,codigo:string,contraseniaNueva:string):Promise<ResultadoRecuperacion>{
    const data = {
      'usuario':usuario,
      'codigoVerificacion': codigo,
      'contraseniaNueva':contraseniaNueva
    };

    return this.http.post(RecuperarCuentaService.serverUrl +this.cambiarContraRecuCuentaUrl, JSON.stringify(data), this.getRestHeader())
      .toPromise()
      .then(response => {
        return response.json() as ResultadoRecuperacion;
      })
      .catch(this.handleError);
  }
}


export interface ResultadoRecuperacion{
  resultado:boolean;
  datos_operacion;
  detalle_operacion;
}



