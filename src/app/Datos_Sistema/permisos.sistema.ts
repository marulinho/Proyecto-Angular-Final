export class PermisosSistema{

    constructor(permisos){
        //ASIGNAR COMPONENTE SENSOR
            if(permisos['puedeAsignarComponenteSensor']){
                localStorage.setItem('puedeAsignarComponenteSensor',JSON.stringify(true));
            }
            else{
                localStorage.setItem('puedeAsignarComponenteSensor',JSON.stringify(false));
            }

        //CONFIGURAR OBTENCION INFORMACION EXTERNA
            if(permisos['puedeConfigurarObtencionInfoExterna']){
                localStorage.setItem('puedeConfigurarObtencionInfoExterna',JSON.stringify(true));
            }
            else{
                localStorage.setItem('puedeConfigurarObtencionInfoExterna',JSON.stringify(false));
            }
        
        //CREAR SECTOR
            if(permisos['puedeCrearSector']){
                localStorage.setItem('puedeCrearSector',JSON.stringify(true));
            }
            else{
                localStorage.setItem('puedeCrearSector',JSON.stringify(false));
            }

        //GENERAR INFORME CRUZADO
            if(permisos['puedeGenerarInformeCruzadoRiegoMedicion']){
                localStorage.setItem('puedeGenerarInformeCruzadoRiegoMedicion',JSON.stringify(true));
            }
            else{
                localStorage.setItem('puedeGenerarInformeCruzadoRiegoMedicion',JSON.stringify(false));
            }

        //ASIGNAR CULTIVO
            if(permisos['puedeAsignarCultivo']){
                localStorage.setItem('puedeAsignarCultivo',JSON.stringify(true));
            }
            else{
                localStorage.setItem('puedeAsignarCultivo',JSON.stringify(false));
            }

        //CREAR CONFIGURACION RIEGO
            if(permisos['puedeCrearConfiguracionRiego']){
                localStorage.setItem('puedeCrearConfiguracionRiego',JSON.stringify(true));
            }
            else{
                localStorage.setItem('puedeCrearConfiguracionRiego',JSON.stringify(false));
            }
        
        //HISTORICO ESTADO SECTOR
            if(permisos['puedeGenerarInformeEstadoHistoricoSectoresFinca']){
                localStorage.setItem('puedeGenerarInformeEstadoHistoricoSectoresFinca',JSON.stringify(true));
            }
            else{
                localStorage.setItem('puedeGenerarInformeEstadoHistoricoSectoresFinca',JSON.stringify(false));
            }
        
        //GESTIONAR CULTIVO SECTOR
            if(permisos['puedeGestionarCultivoSector']){
                localStorage.setItem('puedeGestionarCultivoSector',JSON.stringify(true));
            }
            else{
                localStorage.setItem('puedeGestionarCultivoSector',JSON.stringify(false));
            }
        
        //INICIAR O DETENER RIEGO
            if(permisos['puedeIniciarODetenerRiegoManualmente']){
                localStorage.setItem('puedeIniciarODetenerRiegoManualmente',JSON.stringify(true));
            }
            else{
                localStorage.setItem('puedeIniciarODetenerRiegoManualmente',JSON.stringify(false));
            }
        
        //GESTIONAR COMPONENTE SENSOR
            if(permisos['puedeGestionarComponenteSensor']){
                localStorage.setItem('puedeGestionarComponenteSensor',JSON.stringify(true));
            }
            else{
                localStorage.setItem('puedeGestionarComponenteSensor',JSON.stringify(false));
            }
        
        //GESTIONAR FINCA
            if(permisos['puedeGestionarFinca']){
                localStorage.setItem('puedeGestionarFinca',JSON.stringify(true));
            }
            else{
                localStorage.setItem('puedeGestionarFinca',JSON.stringify(false));
            }

        //GESTIONAR EVENTO PERSONALIZADO
            if(permisos['puedeGestionarEventoPersonalizado']){
                localStorage.setItem('puedeGestionarEventoPersonalizado',JSON.stringify(true));
            }
            else{
                localStorage.setItem('puedeGestionarEventoPersonalizado',JSON.stringify(false));
            }
        
        //CREAR COMPONENTE SENSOR
            if(permisos['puedeCrearComponenteSensor']){
                localStorage.setItem('puedeCrearComponenteSensor',JSON.stringify(true));
            }
            else{
                localStorage.setItem('puedeCrearComponenteSensor',JSON.stringify(false));
            }
        
        //INFORME HELADAS
            if(permisos['puedeGenerarInformeHeladasHistorico']){
                localStorage.setItem('puedeGenerarInformeHeladasHistorico',JSON.stringify(true));
            }
            else{
                localStorage.setItem('puedeGenerarInformeHeladasHistorico',JSON.stringify(false));
            }
        
        //GESTIONAR SENSORES
            if(permisos['puedeGestionarSensores']){
                localStorage.setItem('puedeGestionarSensores',JSON.stringify(true));
            }
            else{
                localStorage.setItem('puedeGestionarSensores',JSON.stringify(false));
            }

        //GENERAR INFORME RIEGO EJECUCION
            if(permisos['puedeGenerarInformeRiegoEnEjecucion']){
                localStorage.setItem('puedeGenerarInformeRiegoEnEjecucion',JSON.stringify(true));
            }
            else{
                localStorage.setItem('puedeGenerarInformeRiegoEnEjecucion',JSON.stringify(false));
            }
        
        //INFORME HISTORICO RIEGO
            if(permisos['puedeGenerarInformeRiegoPorSectoresHistorico']){
                localStorage.setItem('puedeGenerarInformeRiegoPorSectoresHistorico',JSON.stringify(true));
            }   
            else{
                localStorage.setItem('puedeGenerarInformeRiegoPorSectoresHistorico',JSON.stringify(false));
            }

        //ASINGNAR MECANISMO SECTOR FINCA
            if(permisos['puedeAsignarMecRiegoASector']){
                localStorage.setItem('puedeAsignarMecRiegoASector',JSON.stringify(true));
            }
            else{
                localStorage.setItem('puedeAsignarMecRiegoASector',JSON.stringify(false));
            }

        //ASGINAR MECANISMO SECTOR
            if(permisos['puedeAsignarMecRiegoAFinca']){
                localStorage.setItem('puedeAsignarMecRiegoAFinca',JSON.stringify(true));
            }
            else{
                localStorage.setItem('puedeAsignarMecRiegoAFinca',JSON.stringify(false));
            }
        //INFORME EVENTO PERSONALIZADO
            if(permisos['puedeGenerarInformeEventoPersonalizado']){
                localStorage.setItem('puedeGenerarInformeEventoPersonalizado',JSON.stringify(true));
            }
            else{
                localStorage.setItem('puedeGenerarInformeEventoPersonalizado',JSON.stringify(false));
            }
        
        //MODIFICAR CONFIGURACION RIEGO
            if(permisos['puedeModificarConfiguracionRiego']){
                localStorage.setItem('puedeModificarConfiguracionRiego',JSON.stringify(true));
            }
            else{
                localStorage.setItem('puedeModificarConfiguracionRiego',JSON.stringify(false));
            }
        
        //GESTIONAR USUARIO FINCA
            if(permisos['puedeGestionarUsuariosFinca']){
                localStorage.setItem('puedeGestionarUsuariosFinca',JSON.stringify(true));
            }
            else{
                localStorage.setItem('puedeGestionarUsuariosFinca',JSON.stringify(false));
            }
        
        //GESTIONAR SECTOR
            if(permisos['puedeGestionarSector']){
                localStorage.setItem('puedeGestionarSector',JSON.stringify(true));
            }
            else{
                localStorage.setItem('puedeGestionarSector',JSON.stringify(false));
            }

        //INFOME ACTUAL SECTOR
            if(permisos['puedeGenerarInformeEstadoActualSectores']){
                localStorage.setItem('puedeGenerarInformeEstadoActualSectores',JSON.stringify(true));
            }
            else{
                localStorage.setItem('puedeGenerarInformeEstadoActualSectores',JSON.stringify(false));
            }
        
        
    }


}

