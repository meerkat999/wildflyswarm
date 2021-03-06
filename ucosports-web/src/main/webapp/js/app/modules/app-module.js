'use strict';
define(['angularAMD' , 'angular-ui-router', 'angular-resource'], function (angularAMD) {
    var app = angular.module('app-module', ['ui.router', 'ngResource']);

    app.config(function($stateProvider, $urlRouterProvider, $httpProvider){

      $httpProvider.defaults.headers.post['Content-Type'] =  'application/json';

    	$stateProvider
    		.state('login', angularAMD.route({
          url: '/',
          templateUrl : 'resources/partials/login/login.html',
          controller : 'loginController'
    		}))
        .state('app', angularAMD.route({
          url: 'app',
          templateUrl : 'resources/partials/home/app.html'
        }));

    });

    app.run(function($state){
      $state.go('login');
    });

    return angularAMD.bootstrap(app);
});
