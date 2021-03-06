import * as $ from 'jquery';
import { ROUTES } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { MaterialModule, MdTabsModule } from '@angular/material';
import { Md2Module } from 'md2/module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule, NoPreloading } from '@angular/router';
import { DialogExampleComponent } from './shared/dialog/dialog-example/dialog-example.component';
import { AgmCoreModule, MapsAPILoader} from 'angular2-google-maps/core';
import {GoogleMapsAPIWrapper} from "angular2-google-maps/core/services/google-maps-api-wrapper";
import { ComponentDialogComponent } from './pages/component-dialog/component-dialog.component';
//import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ComponentButtonsComponent } from './pages/component-buttons/component-buttons.component';
import { ComponentProgressComponent } from './pages/component-progress/component-progress.component';
import { ChartsChartjsComponent } from './pages/charts-chartjs/charts-chartjs.component';
import { TablesDynamicComponent } from './pages/tables-dynamic/tables-dynamic.component';
import { TablesBasicComponent } from './pages/tables-basic/tables-basic.component';
import { FormsTreeComponent } from './pages/forms-tree/forms-tree.component';
import { ComponentCardComponent } from './pages/component-card/component-card.component';
import { ComponentBootstrapComponent } from './pages/component-bootstrap/component-bootstrap.component';
import { ComponentNotificationsComponent } from './pages/component-notifications/component-notifications.component';
import { ComponentRadioButtonComponent } from './pages/component-radio-button/component-radio-button.component';
import { ComponentCheckboxComponent } from './pages/component-checkbox/component-checkbox.component';
import { ComponentChipsComponent } from './pages/component-chips/component-chips.component';
import { ComponentDatePickerComponent } from './pages/component-date-picker/component-date-picker.component';
import { ComponentListComponent } from './pages/component-list/component-list.component';
import { ComponentMediaPlayerComponent } from './pages/component-media-player/component-media-player.component';
import { ComponentMenuComponent } from './pages/component-menu/component-menu.component';
import { ComponentGridListComponent } from './pages/component-grid-list/component-grid-list.component';
import { ComponentTextEditorComponent } from './pages/component-text-editor/component-text-editor.component';
import { ComponentSelectComponent } from './pages/component-select/component-select.component';
import { ComponentSlideToggleComponent } from './pages/component-slide-toggle/component-slide-toggle.component';
import { ComponentSliderComponent } from './pages/component-slider/component-slider.component';
import { ComponentTabsComponent } from './pages/component-tabs/component-tabs.component';
import { ComponentToolbarComponent } from './pages/component-toolbar/component-toolbar.component';
import { ComponentTooltipComponent } from './pages/component-tooltip/component-tooltip.component';
import { IconWeatherComponent } from './pages/icon-weather/icon-weather.component';
import { MapsGoogleComponent } from './pages/maps-google/maps-google.component';
import { IconFontawesomeComponent } from './pages/icon-fontawesome/icon-fontawesome.component';
import { FormsValidationComponent } from './pages/forms-validation/forms-validation.component';
import { FormsWizardComponent } from './pages/forms-wizard/forms-wizard.component';
import { FormsAutocompleteComponent } from './pages/forms-autocomplete/forms-autocomplete.component';
import { FormsUploadComponent } from './pages/forms-upload/forms-upload.component';
import { ChartsPeityComponent } from './pages/charts-peity/charts-peity.component';
import { WidgetsComponent } from './pages/widgets/widgets.component';
import { LayoutFlexComponent } from './pages/layout-flex/layout-flex.component';
import { LayoutTabsComponent } from './pages/layout-tabs/layout-tabs.component';
import { LayoutEdgesComponent } from './pages/layout-edges/layout-edges.component';
import { LayoutCardsComponent } from './pages/layout-cards/layout-cards.component';
import { LayoutFullscreenComponent } from './pages/layout-fullscreen/layout-fullscreen.component';
import { PagesErrorComponent } from './pages/pages-error/pages-error.component';
import { PagesLockscreenComponent } from './pages/pages-lockscreen/pages-lockscreen.component';
import { PagesInvoiceComponent } from './pages/pages-invoice/pages-invoice.component';
import { PagesNotfoundComponent } from './pages/pages-notfound/pages-notfound.component';
import { PagesSigninComponent } from './pages/pages-signin/pages-signin.component';
import { PagesSignupComponent } from './pages/pages-signup/pages-signup.component';
import { AppsCalendarComponent } from './pages/apps-calendar/apps-calendar.component';
import { AppsExplorerComponent } from './pages/apps-explorer/apps-explorer.component';
import { AppsMailComponent } from './pages/apps-mail/apps-mail.component';
import { IconMaterialComponent } from './pages/icon-material/icon-material.component';
import { ScheduleModule } from './shared/schedule/schedule.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FileUploadModule } from 'ng2-file-upload';
import { TreeModule } from 'angular2-tree-component';
import { ChartModule } from './shared/chart/chart.module';
import { MapModule } from './shared/maps/maps.module';
import { MediaModule } from './shared/media/media.module';
import { WidgetModule } from './shared/widget/widget.module';
import { CustomFormsModule } from 'ng2-validation';
import { DashboardEdgeComponent } from './pages/dashboard-edge/dashboard-edge.component';
import { DialogThemeComponent } from './shared/dialog/dialog-theme/dialog-theme.component';
import { TranslateStaticLoader, TranslateLoader, TranslateModule } from 'ng2-translate';
import { QuillEditorComponent } from './shared/editor/quill-editor.component';

import { Ng2SmartTableModule } from 'ng2-smart-table';



//IMPORTS MODULO SEGURIDAD
  import { IniciarSesionComponent } from './Modulo_Seguridad/CU_Iniciar_Sesion/iniciar.sesion.component';
  import { IniciarSesionService } from './Modulo_Seguridad/CU_Iniciar_Sesion/iniciar.sesion.service';
  import { PerfilUsuarioComponent } from './Modulo_Seguridad/Perfil_Usuario/perfil.usuario.component';
  import { PerfilUsuarioService } from './Modulo_Seguridad/Perfil_Usuario/perfil.usuario.service';
  import { ModificarUsuarioComponent } from './Modulo_Seguridad/CU_Modificar_Usuario/Modificar_Usuario/modificar.usuario.component';
  import { ModificarUsuarioService } from './Modulo_Seguridad/CU_Modificar_Usuario/modificar.usuario.service';
  import { RegistrarUsuarioComponent } from './Modulo_Seguridad/CU_Registrar_Usuario/registrar.usuario.component';
  import { RegistrarUsuarioService } from './Modulo_Seguridad/CU_Registrar_Usuario/registrar.usuario.service';
  import { RecuperarCuentaComponent } from './Modulo_Seguridad/CU_Recuperar_Cuenta/recuperar.cuenta.component';
  import { RecuperarCuentaService } from './Modulo_Seguridad/CU_Recuperar_Cuenta/recuperar.cuenta.service';
  import { ModificarContraseniaComponent } from './Modulo_Seguridad/CU_Modificar_Usuario/Cambiar_Contrasenia/modificar.contrasenia.component';
  import { FinalizarSesionService } from './Modulo_Seguridad/CU_Finalizar_Sesion/finalizar.sesion.service';


//IMPORTS MODULOS CONFIGURACION FINCA
  import { HomeFincaComponent } from './Modulo_Configuracion_Finca/Home_Finca/home.finca.component';
  import { HomeFincaService } from './Modulo_Configuracion_Finca/Home_Finca/home.finca.service';
  import { HomeFincaDetalleComponent } from './Modulo_Configuracion_Finca/Home_Finca_Detalle/home.finca.detalle.component';
  import { HomeFincaDetalleService } from './Modulo_Configuracion_Finca/Home_Finca_Detalle/home.finca.detalle.service';
  import { SolicitarCreacionFincaComponent } from './Modulo_Configuracion_Finca/CU_Solicitar_Creacion_Finca/solicitar.creacion.finca.component';
  import { SolicitarCreacionFincaService } from './Modulo_Configuracion_Finca/CU_Solicitar_Creacion_Finca/solicitar.creacion.finca.service';
  import { GestionarFincaComponent } from './Modulo_Configuracion_Finca/CU_Gestionar_Finca/gestionar.finca.component';
  import { GestionarFincaService } from './Modulo_Configuracion_Finca/CU_Gestionar_Finca/gestionar.finca.service';
  import { GestionarUsuarioFincaComponent } from './Modulo_Configuracion_Finca/CU_Gestionar_Usuario_Finca/gestionar.usuario.finca.compontent';
  import { GestionarUsuarioFincaService } from './Modulo_Configuracion_Finca/CU_Gestionar_Usuario_Finca/gestionar.usuario.finca.service';
  import { ModificarRolUsuarioComponent } from './Modulo_Configuracion_Finca/CU_Gestionar_Usuario_Finca/Modificar_Rol_Usuario_Finca/modificar.rol.usuario.component';
  import { AsignarMecanismoRiegoFincaService } from './Modulo_Configuracion_Finca/CU_Asignar_Mecanismo_Riego_Finca/asignar.mecanismo.riego.finca.service';
  import { AgregarMecanismoRiegoFincaComponent } from './Modulo_Configuracion_Finca/CU_Asignar_Mecanismo_Riego_Finca/Agregar_Mecanismo_Riego_Finca/agregar.mecanismo.riego.finca.component';


//IMPORTS MODULO CONFIGURACION SECTORES
  import { HomeSectorComponent } from './Modulo_Configuracion_Sectores/Home_Sector/home.sector.component';
  import { GestionarSectorFincaComponent } from './Modulo_Configuracion_Sectores/CU_Gestionar_Sector/gestionar.sector.component';
  import { GestionarSectorFincaService } from './Modulo_Configuracion_Sectores/CU_Gestionar_Sector/gestionar.sector.service';
  import { CrearSectorFincaComponent } from './Modulo_Configuracion_Sectores/CU_Crear_Sector/crear.sector.component';
  import { CrearSectorFincaService } from './Modulo_Configuracion_Sectores/CU_Crear_Sector/crear.sector.service';
  import { AsignarMecanismoRiegoSectorComponent } from './Modulo_Configuracion_Sectores/CU_Asignar_Mecanismo_Riego_Sector/asignar.mecanismo.riego.sector.component';
  import { AsignarMecanismoRiegoSectorService } from './Modulo_Configuracion_Sectores/CU_Asignar_Mecanismo_Riego_Sector/asignar.mecanismo.riego.sector.service';
  import { AsignarCultivoSectorComponent } from './Modulo_Configuracion_Sectores/CU_Asignar_Cultivo_Sector/asignar.cultivo.sector.component';
  import { AsignarCultivoSectorService } from './Modulo_Configuracion_Sectores/CU_Asignar_Cultivo_Sector/asignar.cultivo.sector.service';
  import { AsignarComponenteSensorSectorComponent } from './Modulo_Configuracion_Sectores/CU_Asignar_Componente_Sensor_Sector/asignar.componente.sensor.sector.component';
  import { AsignarComponenteSensorSectorService } from './Modulo_Configuracion_Sectores/CU_Asignar_Componente_Sensor_Sector/asignar.componente.sensor.sector.service';

//IMPORTS MODULO SENSORES
  import { CrearSensorComponent } from './Modulo_Sensores/ABM_Sensores/Crear_Sensor/crear.sensor.component';
  import { ModificarSensorComponent } from './Modulo_Sensores/ABM_Sensores/Modificar_Sensor/modificar.sensor.component';
  import { ABMSensorFincaService } from './Modulo_Sensores/ABM_Sensores/abm.sensores.service';
  import { CrearComponenteSensorComponent } from './Modulo_Sensores/ABM_Componente_Sensor/CU_Crear_Componente_Sensor/crear.componente.sensor.component';
  import { GestionarComponenteSensorComponent } from './Modulo_Sensores/ABM_Componente_Sensor/CU_Gestionar_Componente_Sensor/gestionar.componente.sensor.component';
  import { GestionarComponenteSensorService } from './Modulo_Sensores/ABM_Componente_Sensor/gestionar.componente.sensor.service';
  import { HomeComponenteSensorComponent } from './Modulo_Sensores/Home_Componente_Sensor/home.componente.sensor.component';
  import { AsignarSensorComponenteSensorService } from './Modulo_Sensores/Asignar_Sensor_Componente_Sensor/asignar.sensor.componente.sensor.service';
  import { AsignarSensorComponenteSensorComponent } from './Modulo_Sensores/Asignar_Sensor_Componente_Sensor/asignar.sensor.componente.sensor.component';

//IMPORTS MODULO CULTIVO
  import { GestionarCultivoSectorComponent } from './Modulo_Cultivo/CU_Gestionar_Cultivo_Sector/gestionar.cultivo.sector.component';
  import { GestionarCultivoSectorService } from './Modulo_Cultivo/CU_Gestionar_Cultivo_Sector/gestionar.cultivo.sector.service';

//IMPORTS CONFIGURACION RIEGO
  import { GestionarConfiguracionRiegoService } from'./Modulo_Configuracion_Riego/Gestionar_Configuracion_Riego/gestionar.configuracion.riego.service';
  import { CrearConfiguracionRiegoComponent } from './Modulo_Configuracion_Riego/Gestionar_Configuracion_Riego/CU_Crear_Configuracion_Riego/crear.configuracion.riego.component';
  import { HomeConfiguracionRiegoComponent } from './Modulo_Configuracion_Riego/Home_Configuracion_Riego/home.configuracion.riego.component';
  import { ModificarConfiguracionRiegoComponent }  from './Modulo_Configuracion_Riego/Gestionar_Configuracion_Riego/CU_Modificar_Configuracion_Riego/modificar.configuracion.riego.component';
  import { AgregarCriterioInicioComponent } from './Modulo_Configuracion_Riego/Gestionar_Configuracion_Riego/Agregar_Criterio_Inicio/agregar.criterio.inicio.component';
  import { AgregarCriterioFinComponent } from './Modulo_Configuracion_Riego/Gestionar_Configuracion_Riego/Agregar_Criterio_Fin/agregar.criterio.fin.component';
  import { GestionarRiegoService } from './Modulo_Configuracion_Riego/Gestionar_Riego/gestionar.riego.service';
  import { ModificarCriterioInicialFinalComponent } from './Modulo_Configuracion_Riego/Gestionar_Configuracion_Riego/Modificar_Criterio_Inicial_Final/modificar.criterio.inicial.fincal.component';


//IMPORTS MODULO REPORTES
  import { GestionarEventoPersonalizadoService } from './Modulo_Reportes/Gestionar_Evento_Persinalizado/gestionar.evento.personalizado.service';
  import { GenerarReportesService } from './Modulo_Reportes/generar.repotes.service';
  import { AgregarEventoPersonalizadoComponent } from './Modulo_Reportes/Gestionar_Evento_Persinalizado/Agregar_Evento_Personalizado/agregar.evento.personalizado.component';
  import { ModificarEventoPersonalizadoComponent } from './Modulo_Reportes/Gestionar_Evento_Persinalizado/Modificar_Evento_Personalizado/modificar.evento.personalizado.component';
  import { HomeReporteComponent } from './Modulo_Reportes/Home_Reporte/home.reporte.component';
  import { ReporteRiegoEjecucionComponent } from './Modulo_Reportes/Reporte_Riego_Ejecucion/reporte.riego.ejecucion.component';
  import { ReporteEstadoActualEstadoSector } from './Modulo_Reportes/Reporte_Estado_Actual_Sector/reporte.estado.actual.sector.component';
  import { ReporteRiegoHistoricoSectorComponent } from './Modulo_Reportes/Reporte_Riego_Historico_Sector/reporte.riego.historico.sector.component';
  import { ReporteHistoricoHeladaComponent } from './Modulo_Reportes/Reporte_Historico_Heladas/reporte.historico.heladas.component';
  import { ReporteEstadoHistoricoSectorComponent } from './Modulo_Reportes/Reporte_Historico_Sector/reporte.estado.historico.sector.component';
  import { ReporteMedicionCruzadaComponent } from './Modulo_Reportes/Reporte_Medicion_Cruzada/reporte.medicion.cruzada.component';
  import { ReporteEventoPersonalizadoComponent } from './Modulo_Reportes/Reporte_Evento_Personalizado/reporte.evento.personalizado.component';

//IMPORTS MODULO OBTENCION INFORMACION EXTERNA
  import { ModificarProveedorInformacionComponent } from './Modulo_Obtencion_Informacion_Externa/CU_Gestionar_Proveedor_Informacion/Modificar_Proveedor_Informacion/modficar.proveedor.component';
  import { CambiarProveedorInformacionComponent } from './Modulo_Obtencion_Informacion_Externa/CU_Gestionar_Proveedor_Informacion/Cambiar_Proveedor_Informacion/cambiar.proveedor.component';
  import { GestionarProveedorInformacionService } from './Modulo_Obtencion_Informacion_Externa/CU_Gestionar_Proveedor_Informacion/gestionar.proveedor.service';


import { TablasComponent } from './tablas/tablas.component';

/**
 * Root Module
 *
 * App bootstrap here, add your component (Page) to var [declarations] for load.
 */
@NgModule({
  declarations: [
    // Page
    AppComponent,
    DialogExampleComponent,
    DialogThemeComponent,
    ComponentDialogComponent,
    DashboardComponent,
    DashboardEdgeComponent,
    ComponentButtonsComponent,
    ComponentProgressComponent,
    ComponentCardComponent,
    ComponentBootstrapComponent,
    ComponentDialogComponent,
    ComponentNotificationsComponent,
    ComponentRadioButtonComponent,
    ComponentCheckboxComponent,
    ComponentChipsComponent,
    ComponentDatePickerComponent,
    ComponentListComponent,
    ComponentMediaPlayerComponent,
    ComponentMenuComponent,
    ComponentGridListComponent,
    ComponentSelectComponent,
    ComponentSlideToggleComponent,
    ComponentSliderComponent,
    ComponentTabsComponent,
    ComponentTextEditorComponent,
    ComponentToolbarComponent,
    ComponentTooltipComponent,
    ComponentRadioButtonComponent,
    IconWeatherComponent,
    IconMaterialComponent,
    IconFontawesomeComponent,
    MapsGoogleComponent,
    FormsValidationComponent,
    FormsWizardComponent,
    FormsAutocompleteComponent,
    FormsUploadComponent,
    FormsTreeComponent,
    TablesBasicComponent,
    TablesDynamicComponent,
    ChartsChartjsComponent,
    ChartsPeityComponent,
    WidgetsComponent,
    LayoutFlexComponent,
    LayoutTabsComponent,
    LayoutEdgesComponent,
    LayoutCardsComponent,
    LayoutFullscreenComponent,
    PagesErrorComponent,
    PagesLockscreenComponent,
    PagesInvoiceComponent,
    PagesNotfoundComponent,
    PagesSigninComponent,
    PagesSignupComponent,
    AppsCalendarComponent,
    AppsExplorerComponent,
    AppsMailComponent,
    QuillEditorComponent,

    //COMPONENTS MODULO SEGURIDAD
    IniciarSesionComponent,
    PerfilUsuarioComponent,
    ModificarUsuarioComponent,
    RegistrarUsuarioComponent,
    RecuperarCuentaComponent,
    ModificarContraseniaComponent,

    //COMPONENTS MODULO CONFIGURACION FINCA
    HomeFincaComponent,
    HomeFincaDetalleComponent,
    SolicitarCreacionFincaComponent,
    GestionarFincaComponent,
    GestionarUsuarioFincaComponent,
    ModificarRolUsuarioComponent,

    //COMPONENTS MODULO CONFIGURACION SECTORES
    HomeSectorComponent,
    GestionarSectorFincaComponent,
    CrearSectorFincaComponent,
    AgregarMecanismoRiegoFincaComponent,
    AsignarMecanismoRiegoSectorComponent,
    AsignarCultivoSectorComponent,
    HomeComponenteSensorComponent,
    AsignarComponenteSensorSectorComponent,
    

    TablasComponent,

    //COMPONENTS MODULO SENSORES
    CrearSensorComponent,
    ModificarSensorComponent,
    CrearComponenteSensorComponent,
    GestionarComponenteSensorComponent,
    AsignarSensorComponenteSensorComponent,

    //COMPONENTS MODULO CULTIVO
    GestionarCultivoSectorComponent,

    //COMPONETS MODULO CONFIGURACION RIEGO
    CrearConfiguracionRiegoComponent,
    HomeConfiguracionRiegoComponent,
    ModificarConfiguracionRiegoComponent,
    AgregarCriterioInicioComponent,
    AgregarCriterioFinComponent,
    ModificarCriterioInicialFinalComponent,

    //COMPONENTS MODULO REPORTES
    AgregarEventoPersonalizadoComponent,
    ModificarEventoPersonalizadoComponent,
    HomeReporteComponent,
    ReporteRiegoEjecucionComponent,
    ReporteEstadoActualEstadoSector,
    ReporteRiegoHistoricoSectorComponent,
    ReporteHistoricoHeladaComponent,
    ReporteEstadoHistoricoSectorComponent,
    ReporteMedicionCruzadaComponent,
    ReporteEventoPersonalizadoComponent,

    //COMPONENTS MODULO OBTENCION INFORMACION EXTERNA
    ModificarProveedorInformacionComponent,
    CambiarProveedorInformacionComponent
  ],
  imports: [
    // Angular Imports
    BrowserModule,
    BrowserAnimationsModule,
    MdTabsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    // Lokra Imports
    ScheduleModule,
    ChartModule,    
    MapModule,
    MediaModule,
    WidgetModule,
    // Extra Plugin Imports
    NgxDatatableModule,
    // If you using lazy loading, var [preloadingStrategy] can change to PreloadAllModules or NoPreloading.
    RouterModule.forRoot(ROUTES, {useHash: true, preloadingStrategy: NoPreloading}),
    MaterialModule,
    FlexLayoutModule,
    Md2Module,
    NgxDatatableModule,
    FileUploadModule,
    CustomFormsModule,
    TreeModule,

    Ng2SmartTableModule,
    
    // Replace to your Google map API key.
    AgmCoreModule.forRoot({
      //apiKey: 'AIzaSyC4-U6Eo0eHV7UFGjAIO6ZRB4X5z7hWS-8',
      apiKey:'AIzaSyCB2vwsiaHEhNKBNAKTdrvLIu7cks8iG40',
      libraries:["places"]
    }),
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    }),
  ],
  providers: [
    // Global service (Global state)
    
    //SERVICES MODULO SEGURIDAD
    AppService,
    IniciarSesionService,
    ModificarUsuarioService,
    PerfilUsuarioService,
    RegistrarUsuarioService,
    RecuperarCuentaService,
    FinalizarSesionService,

    //LLAMADAS MODULO CONFIGURACION FINCA
    HomeFincaService,
    HomeFincaDetalleService,
    SolicitarCreacionFincaService,
    GestionarFincaService,
    GestionarUsuarioFincaService,
    AsignarMecanismoRiegoFincaService,

    //LLAMADAS MODULO CONFIGURACION SECTORES
    GestionarSectorFincaService,
    CrearSectorFincaService,
    AsignarMecanismoRiegoSectorService,
    AsignarCultivoSectorService,
    AsignarComponenteSensorSectorService,
    
    //LLAMADAS MODULO SENSORES
    ABMSensorFincaService,
    GestionarComponenteSensorService,
    AsignarSensorComponenteSensorService,

    //LLAMADAS MODULO CULTIVO
    GestionarCultivoSectorService,

    //LLAMADAS CONFIGURACION RIEGO
    GestionarConfiguracionRiegoService,

    //LLAMADAS REPORTES
    GestionarEventoPersonalizadoService,
    GenerarReportesService,
    

    //LLAMADAS MODULO OBTENCION INFORMACION EXTERNA
    GestionarProveedorInformacionService,
    GestionarRiegoService,
    
    GoogleMapsAPIWrapper, 
    
  ],
  entryComponents: [
    // Customize dialog must be import here.
    DialogExampleComponent,
    DialogThemeComponent,
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, './assets/i18n', '.json');
}
