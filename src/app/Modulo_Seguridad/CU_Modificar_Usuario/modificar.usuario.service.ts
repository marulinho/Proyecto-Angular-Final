import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { RestBaseService } from '../../tools/rest.tools';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ModificarUsuarioService extends RestBaseService{
  private modificarUrl = '/modificarUsuario/';
  private eliminarUrl = '/eliminarUsuario/';
  private modificarContraseniaUrl='/cambiarContrasenia/';

  


  constructor(private http: Http) {super();}

  modificarUsuario(nombre:string,apellido:string,domicilio:string,
      fechaNac:string,email:string,dni:number,cuit:string):Promise<Usuario> {
          const data = {
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
  resultado;
  datos_operacion;

  
}

