import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HomeFincaService, Finca } from './home.finca.service';

@Component({
    selector:'homeFinca',
    templateUrl: './home.finca.component.html',
    styleUrls:['./home.finca.component.css']
    
})

export class HomeFincaComponent implements OnInit{
    
    position = 'above';
    tooltipCrearFinca='Crear Finca';
    tooltipVer="Ver Finca";


    //ATRIBUTOS LLAMADA FINCAS USUARIO
    fincasUsuario:Finca;
    fincasUsuarioSeleccionado:Boolean;
    rolesFincaUsuario:string[];
    errorMessageFincasUsuario:string;

    //ATRIBUTOS LLAMADA FINCAS ENCARGADO
    fincasEncargado:Finca;
    fincasEncargadoSeleccionado:Boolean;
    errorMessageFincasEncargado:string;

    //ATRIBUTOS LLAMADA CREAR FINCA
    /*crearFincaSeleccionado:Boolean;    
    errorMessageCrearFinca:string;
    selectIndex: number = 0;
    nombre:string;
    direccion:string;
    ubicacion:string;
    tamanio:number;   
    fincaCreada : FincaCreada; 
    proveedor: string;
    proveedoresInformacion: ProveedorInformacion[];*/
    
    
    constructor(private router:Router,
                private homeFincaService:HomeFincaService){

    }

    ngOnInit(){
        this.errorMessageFincasEncargado="";        
        this.errorMessageFincasUsuario="";
        this.fincasEncargadoSeleccionado=false;
        this.fincasUsuarioSeleccionado=false;

        this.homeFincaService.obtenerFincasEncargado()
            .then(
                response=>{
                    
                    if(response.detalle_operacion=="No hay datos"){
                        this.errorMessageFincasEncargado="No existen fincas asociadas al usuario con el rol especificado.";
                    }
                    else{
                        this.fincasEncargado=response.datos_operacion;
                        this.fincasEncargadoSeleccionado=true;
                    }
                }
            )
            .catch(
                error=>{
                    this.errorMessageFincasEncargado=error.error_description;
                }
            );

        this.homeFincaService.obtenerFincasUsuario()
            .then(
                    response=>{
                        if(response.detalle_operacion=="No hay datos"){
                            this.errorMessageFincasUsuario="No existen fincas asociadas al usuario con el rol especificado.";
                        }
                        else{
                            this.fincasUsuario=response.datos_operacion;
                            this.obtenerRoles();
                            this.fincasUsuarioSeleccionado=true
                        }
                    }
                )
            .catch(
                error=>{
                    this.errorMessageFincasUsuario=error.error_description;
                }
            );
             

        
    }

    getFincasEncargado(){
        return this.fincasEncargadoSeleccionado;
    }

    getFincasUsuario(){
        return this.fincasUsuarioSeleccionado;
    }


    apretarNuevaFincaIcono(){
        console.log("apretamos crear nueva finca");
        this.router.navigate(['/crearFinca/']);
    }

    obtenerRoles(){
        let roles = new Array;
        let longitud= Object.keys(this.fincasUsuario).length;
        for(var i=0;i<longitud;i++){
            roles.push(this.fincasUsuario[i]['nombreRol']);
        }
        let rolesUnicos = new Array;
        let actual;
        for(var j=0;j<longitud;j++){
            actual = roles[j];
            console.log("posicion "+j+ "valor: "+actual);

            if(rolesUnicos.includes(actual)==true){
                console.log("roles unicos: "+rolesUnicos);
                console.log("el valor "+actual +" ya se encuentra en roles unicos. Intento "+j);
            }
            else{
                console.log("el valor "+actual+" no se encuentra. Posicion "+j);
                rolesUnicos.push(actual);
            }
        }
        console.log("roles unicos: "+rolesUnicos);
   
    }
}


