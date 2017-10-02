import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { RestBaseService } from '../../tools/rest.tools';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ModificarUsuarioService extends RestBaseService{
  private obtenerUsuarioActualUrl="/mostrarUsuario/"
  private modificarUrl = '/modificarUsuario/';
  private eliminarUrl = '/eliminarUsuario/';
  private modificarContraseniaUrl='/cambiarContrasenia/';

  


  constructor(private http: Http) {super();}

  obtenerUsuarioActual(): Promise<Usuario> {
    return this.http.get(ModificarUsuarioService.serverUrl + this.obtenerUsuarioActualUrl, this.getRestHeader())
    .toPromise()
    .then(response => {return response.json() as Usuario;})
    .catch(this.handleError);
  }

  modificarUsuario(usuario:string,nombre:string,apellido:string,domicilio:string,
    fechaNac:string,email:string,dni:number,cuit:number):Promise<Usuario> {
    const data = {
      'usuario': usuario,
      'email':email,
      'nombre': nombre,
      'apellido':apellido,
      'dni':dni,
      'cuit':cuit,
      'domicilio':domicilio,
      'fechaNacimiento':fechaNac,
      'imagenUsuario':""
      
    };

    return this.http.post(ModificarUsuarioService.serverUrl +this.modificarUrl, JSON.stringify(data), this.getRestHeader())
      .toPromise()
      .then(response => {
        let estado = response.status;
        return response.json() as Usuario;
        
        
      })
      .catch(this.handleError);
  }

  eliminarUsuario(): Promise<Boolean> {
    
      return this.http.delete(ModificarUsuarioService.serverUrl + this.eliminarUrl, this.getRestHeader())
      .toPromise()
      .then(response => {
        return response.json() as Boolean;
      })
      .catch(this.handleError);
    
  }
  
  modificarContrasenia(passVieja:string,passNueva:string){
    const data = {
      'contraseniaVieja': passVieja,
      'contraseniaNueva': passNueva
    };
    return this.http.post(ModificarUsuarioService.serverUrl +this.modificarContraseniaUrl, JSON.stringify(data), this.getRestHeader())
      .toPromise()
      .then(response => {
        console.log(response);
        return response.json();
        
        
      })
      .catch(this.handleError);
  }
}



export interface Usuario {
  usuario:string;
  nombre:string;
  apellido:string;
  dni:number;
  cuit:number;
  email:string;
  domicilio:string;
  fechaNacimiento;

}

