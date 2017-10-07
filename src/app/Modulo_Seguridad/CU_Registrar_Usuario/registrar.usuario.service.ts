import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { RestBaseService } from '../../tools/rest.tools';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class RegistrarUsuarioService extends RestBaseService{
  private loginUrl = '/registrarse/';

  


  constructor(private http: Http) {super();}

  registrarUsuario(nombre:string,apellido:string,dni:number,cuit:number,
    fechaNac:string,domicilio:string, email:string, usuario:string,pass1:string): Promise<RespuestaRegistrar> {
    const data = {
      'nombre': nombre,
      'apellido': apellido,
      'dni':dni,
      'cuit':cuit,
      'fechaNacimiento':fechaNac,
      'domicilio':domicilio,
      'email':email,
      'usuario':usuario,
      'contrasenia':pass1,
      'imagenUsuario':''
    };

    return this.http.put(RegistrarUsuarioService.serverUrl +this.loginUrl, JSON.stringify(data), this.getRestHeader())
      .toPromise()
      .then(response => {
        return response.json() as RespuestaRegistrar;
      })
      .catch(this.handleError);
  }

}

export interface RespuestaRegistrar {
  resultado: boolean;
  datos_operacion;

}



