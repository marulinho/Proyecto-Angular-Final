import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { RestBaseService } from '../../tools/rest.tools';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AsignarCultivoSectorService extends RestBaseService{

    private mostrarSubTipoCultivoUrl="/mostrarSubtiposTiposCultivos/";
    private asignarCultivoUrl="/asignarCultivoASector/";

    constructor(private http: Http) {super();}

    mostrarCultivo():Promise<Cultivo>{

        return this.http.get(AsignarCultivoSectorService.serverUrl + this.mostrarSubTipoCultivoUrl, this.getRestHeader())
        .toPromise()
        .then(response => {return response.json() as Cultivo;})
        .catch(this.handleError);
    }

    asignarCultivoSector(idSector:number,nombreSubtipoCultivo:string,nombreCultivo:string,descripcionCultivo:string,fechaPlantacion:string,cantidadPlantas:number,idFinca:number):Promise<any>{
        const data = {
            'idSector': idSector,
            'nombreSubtipoCultivo': nombreSubtipoCultivo,
            'nombreCultivo':nombreCultivo,
            'descripcionCultivo':descripcionCultivo,
            'fechaPlantacion':fechaPlantacion,
            'cantidadPlantas':cantidadPlantas,
            'idFinca':idFinca
          };
      
          return this.http.put(AsignarCultivoSectorService.serverUrl +this.asignarCultivoUrl, JSON.stringify(data), this.getRestHeader())
            .toPromise()
            .then(response => {
              return response.json() as any;
            })
            .catch(this.handleError);
    }
  
}

export interface Cultivo {
  resultado:Boolean;
  datos_operacion;
  detalle_operacion;
  
}


