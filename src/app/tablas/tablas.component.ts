import { Component, OnInit} from '@angular/core';
import { Ng2SmartTableModule,LocalDataSource } from 'ng2-smart-table';
import { Router } from '@angular/router';
import { GestionarUsuarioFincaService, Usuario } from '../Modulo_Configuracion_Finca/CU_Gestionar_Usuario_Finca/gestionar.usuario.finca.service';

@Component({
  selector: 'basic-example-source',
  templateUrl: './tablas.component.html',
  styleUrls:['./tablas.component.css']
  
})
export class TablasComponent implements OnInit  {
 
  
  settings = {
    actions:{
          columnTitle:'Accion',
          add:false,
          delete:false,
          edit:false
      }, 
    columns: {
      nombre: {
        title: 'Nombre',
        filter: false,
        width:'37%'
      },
      apellido: {
        title: 'Tamaño',
        filter: false,
        width:'36%'
      },
      usuario: {
        title: 'Ubicación',
        filter: false,
      },
      acciones:{
        title:'Acción',
        filter:false,
        type:'html',
        valuePrepareFunction: (value=10)=>{
          return '<a href="http://localhost:4200/#/gestionarFinca/10"><img src="assets/icons/editar.png"></a>'
        }
      }
    }
  };

  data = [];

  source: LocalDataSource;

  constructor( private router: Router,
               private gestionarUsuarioFincaService:GestionarUsuarioFincaService ) {
  }
  ngOnInit(){
    this.gestionarUsuarioFincaService.buscarUsuarioNoFinca(10)
    .then(
        response=>{
            this.data=response.datos_operacion;
            this.source = new LocalDataSource(this.data);
        }
    )

  }
  onSearch(query: string = '') {
      if(query==""){
        this.source = new LocalDataSource(this.data);
      }
      else{
        this.source.setFilter([
          {
            field: 'nombre',
            search: query,
          },
          {
            field: 'apellido',
            search: query,
          },
          {
            field: 'usuario',
            search: query,
          }
        ],false);
      }
 
  }

}