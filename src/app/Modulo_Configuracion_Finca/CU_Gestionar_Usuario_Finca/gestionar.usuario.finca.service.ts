import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { RestBaseService } from '../../tools/rest.tools';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class GestionarUsuarioFincaService extends RestBaseService{
  private buscarUsuarioNoEncargadoUrl="/buscarUsuariosNoEncargado/";
  private eliminarUsuarioFincaUrl="/eliminarUsuarioFinca/";
  private buscarUsuarioNoFincaUrl="/buscarUsuariosNoFinca/";
  private buscarUsuarioFincaUrl="/buscarUsuariosFinca/";
  private agregarUsuarioFincaUrl = '/agregarUsuarioFinca/';
  private modificarRolUsuarioFincaUrl="/modificarRolUsuario/";
  private buscarRolesUrl="/buscarRoles/";


  constructor(private http: Http) {super();}

  buscarUsuariosNoEncargado(idFinca:number):Promise<Usuario>{
    const data = {
      'idFinca': idFinca,
      
    };
    return this.http.post(GestionarUsuarioFincaService.serverUrl + this.buscarUsuarioNoEncargadoUrl, JSON.stringify(data), this.getRestHeader())
      .toPromise()
      .then(response => {
          return response.json() as Usuario;
      })
      .catch(this.handleError);
  }

  buscarUsuarioFinca(idFinca:number):Promise<Usuario>{
    const data = {
      'idFinca': idFinca,
      
    };
    return this.http.post(GestionarUsuarioFincaService.serverUrl + this.buscarUsuarioFincaUrl, JSON.stringify(data), this.getRestHeader())
      .toPromise()
      .then(response => {
          return response.json() as Usuario;
      })
      .catch(this.handleError);
  }

  eliminarUsuarioFinca(usuarioFincaId: number,idFinca): Promise<any> {
    const data = {
      'idUsuarioFinca': usuarioFincaId,
      'idFinca':idFinca
      
    };
    return this.http.post(GestionarUsuarioFincaService.serverUrl + this.eliminarUsuarioFincaUrl,JSON.stringify(data), this.getRestHeader())
      .toPromise()
      .then(response => {
        return "";
      })
      .catch(this.handleError);
  }

  buscarUsuarioNoFinca(idFinca:number):Promise<Usuario>{
    const data = {
      'idFinca': idFinca
      
    };
    return this.http.post(GestionarUsuarioFincaService.serverUrl + this.buscarUsuarioNoFincaUrl, JSON.stringify(data), this.getRestHeader())
      .toPromise()
      .then(response => {
          return response.json() as Usuario;
      })
      .catch(this.handleError);

  }

  agregarUsuarioFinca(usuario:string,idFinca:number,rol:string): Promise<any> {
    const data = {
      'usuario': usuario,
      'idFinca': idFinca,
      'nombreRol':rol
    };

    return this.http.put(GestionarUsuarioFincaService.serverUrl +this.agregarUsuarioFincaUrl, JSON.stringify(data), this.getRestHeader())
      .toPromise()
      .then(response => {
        return response.json() as any;
      })
      .catch(this.handleError);
  }

  modificarRolUsuario(idUsuarioFinca:number,idFinca:number,rol:string):Promise<any> {
    const data = {
        'idUsuarioFinca': idUsuarioFinca,
        'idFinca':idFinca,
        'nombreRol':rol
        
    };

    return this.http.post(GestionarUsuarioFincaService.serverUrl + this.modificarRolUsuarioFincaUrl, JSON.stringify(data), this.getRestHeader())
        .toPromise()
        .then(response => {
            return response.json() as any;


        })
        .catch(this.handleError);
  }

  buscarRoles(){
    return this.http.get(GestionarUsuarioFincaService.serverUrl + this.buscarRolesUrl, this.getRestHeader())
    .toPromise()
    .then(response => {return response.json() as Roles;})
    .catch(this.handleError);
  }

}

export interface Usuario {
  resultado:Boolean;
  datos_operacion;
  detalle_operacion;
  
}

export interface Roles{
  resultado:boolean;
  datos_operacion;
  detalle_operacion;
}
