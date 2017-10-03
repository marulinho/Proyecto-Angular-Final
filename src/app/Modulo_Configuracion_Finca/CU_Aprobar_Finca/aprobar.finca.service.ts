import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { RestBaseService } from '../../tools/rest.tools';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AprobarFincaService extends RestBaseService{
  private aprobarFincaUrl = '/aprobarFinca/';
  private noAprobarFincaUrl = '/noAprobarFinca/';
  


  constructor(private http: Http) {super();}

  aprobarFinca(id:number):Promise<any> {
    const data = {
        'idFinca': id
        
      };
  
      return this.http.post(AprobarFincaService.serverUrl +this.aprobarFincaUrl, JSON.stringify(data), this.getRestHeader())
        .toPromise()
        .then(response => {
          return response.json() as any;
  
        })
        .catch(this.handleError);
  }
  
  noAprobarFinca(id:number):Promise<Finca>{
    const data = {
        'idFinca': id
      };
  
      return this.http.post(AprobarFincaService.serverUrl +this.noAprobarFincaUrl, JSON.stringify(data), this.getRestHeader())
        .toPromise()
        .then(response => {
          return response.json() as Finca;
  
        })
        .catch(this.handleError);
  }


}

export interface Finca {
  nombre:string;
  ubicacion:string;
  tamanio: number;
  direccionLegal:string;
  
}




