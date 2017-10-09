import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { RestBaseService } from '../../tools/rest.tools';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class GestionarFincaService extends RestBaseService{
  private modificarFincaUrl="/modificarFinca/"

  constructor(private http: Http) {super();}
  modificarFinca(id:number,nombre:string,direccion:string,ubicacion:string,tamanio:number):Promise<FincaModificada>{
    const data = {
      'idFinca':id,
      'nombreFinca': nombre,
      'ubicacion':ubicacion,
      'tamanio':tamanio,
      'direccionLegal':direccion,
      'logo':'',
      'estadoFinca':'habilitado'
      
    };

    return this.http.post(GestionarFincaService.serverUrl +this.modificarFincaUrl, JSON.stringify(data), this.getRestHeader())
      .toPromise()
      .then(response => {
        return response.json() as FincaModificada;
        
        
      })
      .catch(this.handleError);
  }

  

}

export interface FincaModificada {
  nombre: string;
  direccionLegal: string;
  ubicacion: string;
  tamanio: number;
}


