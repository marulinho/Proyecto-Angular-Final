import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { RestBaseService } from '../../tools/rest.tools';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class GestionarUsuarioFincaService extends RestBaseService{
  private buscarUsuarioNoEncargadoUrl="/buscarUsuariosNoEncargado/";
  private eliminarUsuarioFincaUrl="/eliminarUsuarioFinca/";
  private buscarUsuarioNoFincaUrl="/buscarUsuariosNoFinca/";
  private agregarUsuarioFincaUrl = '/agregarUsuarioFinca/';
  private modificarRolUsuarioFincaUrl="/modificarRolUsuario/";
  


  constructor(private http: Http) {super();}

  buscarUsuariosNoEncargado(idFinca:number):Promise<UsuarioNoEncargado>{
    const data = {
      'idFinca': idFinca,
      
    };
    return this.http.post(GestionarUsuarioFincaService.serverUrl + this.buscarUsuarioNoEncargadoUrl, JSON.stringify(data), this.getRestHeader())
      .toPromise()
      .then(response => {
          return response.json() as UsuarioNoEncargado;
      })
      .catch(this.handleError);
  }

  eliminarUsuarioFinca(usuarioFincaId: number): Promise<any> {
    const data = {
      'usuarioFincaId': usuarioFincaId,
      
    };
    return this.http.post(GestionarUsuarioFincaService.serverUrl + this.eliminarUsuarioFincaUrl,JSON.stringify(data), this.getRestHeader())
      .toPromise()
      .then(response => {
        return "";
      })
      .catch(this.handleError);
  }

  buscarUsuarioNoFinca(idFinca:number):Promise<Usuario[]>{
    const data = {
      'idFinca': idFinca
      
    };
    return this.http.post(GestionarUsuarioFincaService.serverUrl + this.buscarUsuarioNoFincaUrl, JSON.stringify(data), this.getRestHeader())
      .toPromise()
      .then(response => {
          return response.json() as Usuario[];
      })
      .catch(this.handleError);

  }

  agregarUsuarioFinca(usuario:string,idFinca:number): Promise<any> {
    const data = {
      'usuario': usuario,
      'idFinca': idFinca,
      'nombreRol':'stakeholder'
    };

    return this.http.put(GestionarUsuarioFincaService.serverUrl +this.agregarUsuarioFincaUrl, JSON.stringify(data), this.getRestHeader())
      .toPromise()
      .then(response => {
        return response.json() as any;
      })
      .catch(this.handleError);
  }

  modificarRolUsuario(usuario:string,idFinca:number,rol:string):Promise<any> {
    const data = {
        'usuario': usuario,
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



  

    

    
}

export interface Usuario {
  nombre:string;
  apellido: string;
  cuit:number;
  dni:number;
  domicilio:string;
  email:string;
  fechaNacimiento;
  usuario:string;
  
}

export interface UsuarioNoEncargado{
  resultado:boolean;
  datos_operacion;
  detalle_operacion;
}
