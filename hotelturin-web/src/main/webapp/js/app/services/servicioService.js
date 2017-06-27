define(['app-module', 'restService'], function (app) {
    app.factory('servicioService',['restService', '$q', function (restService, $q) {

      var path = 'servicioService/'

        var servicesRest = {
          getById : function(id){
            return restService.POST(path + 'getById', id);
          },
          getAll : function(){
            return restService.GETArray(path + 'getAll');
          },
          getByState : function(filtro){
              return restService.POST(path + 'getByState',filtro);
            },
          add : function(servicio){
            return restService.POST(path + 'add', servicio);
          }
        }

        return servicesRest;

    }]);
});