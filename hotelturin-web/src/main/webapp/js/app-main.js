'use strict';

requirejs.config({
    baseUrl: 'js',
    urlArgs: "bust=" + (new Date()).getTime(),
    paths: {
      'angular': 'ext/angular.min',
      'angularAMD' : 'ext/angularAMD.min',
      'angular-ui-router' : 'ext/angular-ui-router.min',
      'angular-resource' : 'ext/angular-resource.min',
      'jquery' : 'ext/jquery-3.2.1.min',
      'sweetalert' : 'ext/sweetalert.min',
      'app-module' : 'app/modules/app-module',
      'loginController' : 'app/controllers/login/loginController',
      'appController' : 'app/controllers/home/appController',
      'clienteController' : 'app/controllers/clienteController',
      'habitacionController' : 'app/controllers/habitacionController',
      'habitacionService' : 'app/services/habitacionService',
      'servicioController' : 'app/controllers/servicioController',
      'servicioService' : 'app/services/servicioService',
      'facturaService' : 'app/services/facturaService',
      'checkinController' : 'app/controllers/checkinController',
      'checkinMenuController' : 'app/controllers/checkinMenuController',
      'facturacionMenuController' : 'app/controllers/facturacionMenuController',
      'checkoutController' : 'app/controllers/checkoutController',
      'administracionController' : 'app/controllers/administracionController',
      'facturacionHospedajeController' : 'app/controllers/facturacionHospedajeController',
      'restService' : 'app/services/restService',
      'clienteService' : 'app/services/clienteService',
      'consumoporservicioService' : 'app/services/consumoporservicioService',
      'acompananteService' : 'app/services/acompananteService',
      'arriendoService' : 'app/services/arriendoService',
      'mediopagoService' : 'app/services/mediopagoService',
      'tipoDocumentoService' : 'app/services/tipoDocumentoService',
      'sweetService' : 'app/services/util/sweetService',
      'numberDirective' : 'app/directives/numberDirective'
    },
    shim: {
    	'angular' : ['jquery'],
    	'angularAMD': ['angular'],
    	'angular-iu-router': ['angular'],
    	'app-module' : ['angular']
    },
    deps: [
      'app-module', 'sweetService', 'clienteController', 'numberDirective', 'checkinController', 'checkoutController','habitacionController', 'servicioController','administracionController', 'checkinMenuController', 'facturacionMenuController', 'facturacionHospedajeController']
});
