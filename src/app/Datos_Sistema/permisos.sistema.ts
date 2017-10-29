import { PermissionService } from 'angular2-permission';

export class RolesSistema{
   
    PERMISO_PUEDEASIGNARMECRIEGOAFINCA;
    PERMISO_PUEDEASIGNARMECRIEGOASECTOR;
    
    PERMISO_PUEDECREARCOMPONENTESENSOR;
    PERMISO_PUEDECREARCONFIGURACIONRIEGO;
    
    PERMISO_PUEDEGENERARINFORMECRUZADORIEGOMEDICION;
    PERMISO_PUEDEGENERARINFORMEESTADOACTUALSECTORES;
    PERMISO_PUEDEGENERARINFORMEESTADOHISTORICOSECTORESFINCA;
    PERMISO_PUEDEGENERARINFORMEEVENTOPERSONALIZADO;
    PERMISO_PUEDEGENERARINFORMEHELADASHISTORICO;
    PERMISO_PUEDEGENERARINFORMERIEGOENEJECUCION;
    PERMISO_PUEDEGENERARINFORMERIEGOPORSECTORESHISTORICO;
    PERMISO_PUEDEGESTIONARCOMPONENTESENSOR;
    PERMISO_PUEDEGESTIONARCULTIVOSECTOR;
    PERMISO_PUEDEGESTIONAREVENTOPERSONALIZADO;
    PERMISO_PUEDEGESTIONARFINCA;
    PERMISO_PUEDEGESTIONARSECTOR;
    PERMISO_PUEDEGESTIONARSENSORES;
    PERMISO_PUEDEGESTIONARUSUARIOSFINCA;
    PERMISO_PUEDEINICIARODETENERRIEGOMANUALMENTE;
    PERMISO_PUEDEMODIFICARCONFIGURACIONRIEGO;
    permisosUsuarioFinca=[];

    constructor(private _permissionService:PermissionService){
        if(_permissionService['puedeAsignarComponenteSensor']){
            this.permisosUsuarioFinca.push('PERMISO_PUEDEASIGNARCOMPONENTESENSOR');
        }

        if(_permissionService['puedeConfigurarObtencionInfoExterna']){
            this.permisosUsuarioFinca.push('PERMISO_PUEDECONFIGURAROBTENCIONINFOEXTERNA');
        }
        if(_permissionService['puedeCrearSector']){
            this.permisosUsuarioFinca.push('PERMISO_PUEDECREARSECTOR');
        }
        if(_permissionService['puedeGenerarInformeCruzadoRiegoMedicion']){
            this.permisosUsuarioFinca.push('PERMISO_PUEDEASIGNARCOMPONENTESENSOR');
        }
        if(_permissionService['puedeAsignarCultivo']){
            this.permisosUsuarioFinca.push('PERMISO_PUEDEASIGNARCULTIVO');
        }
        if(_permissionService['puedeCrearConfiguracionRiego']){
            this.permisosUsuarioFinca.push('PERMISO_PUEDEASIGNARCOMPONENTESENSOR');
        }
        if(_permissionService['puedeAsignarComponenteSensor']){
            this.permisosUsuarioFinca.push('PERMISO_PUEDEASIGNARCOMPONENTESENSOR');
        }
        if(_permissionService['puedeAsignarComponenteSensor']){
            this.permisosUsuarioFinca.push('PERMISO_PUEDEASIGNARCOMPONENTESENSOR');
        }
        if(_permissionService['puedeAsignarComponenteSensor']){
            this.permisosUsuarioFinca.push('PERMISO_PUEDEASIGNARCOMPONENTESENSOR');
        }
        if(_permissionService['puedeAsignarComponenteSensor']){
            this.permisosUsuarioFinca.push('PERMISO_PUEDEASIGNARCOMPONENTESENSOR');
        }
        if(_permissionService['puedeAsignarComponenteSensor']){
            this.permisosUsuarioFinca.push('PERMISO_PUEDEASIGNARCOMPONENTESENSOR');
        }
        if(_permissionService['puedeAsignarComponenteSensor']){
            this.permisosUsuarioFinca.push('PERMISO_PUEDEASIGNARCOMPONENTESENSOR');
        }
        if(_permissionService['puedeAsignarComponenteSensor']){
            this.permisosUsuarioFinca.push('PERMISO_PUEDEASIGNARCOMPONENTESENSOR');
        }
        if(_permissionService['puedeAsignarComponenteSensor']){
            this.permisosUsuarioFinca.push('PERMISO_PUEDEASIGNARCOMPONENTESENSOR');
        }
        if(_permissionService['puedeAsignarComponenteSensor']){
            this.permisosUsuarioFinca.push('PERMISO_PUEDEASIGNARCOMPONENTESENSOR');
        }
        if(_permissionService['puedeAsignarComponenteSensor']){
            this.permisosUsuarioFinca.push('PERMISO_PUEDEASIGNARCOMPONENTESENSOR');
        }
        
    }

}

