define(['app-module'], function (app) {
    app.factory('restService',['$resource', '$q', '$location', function ($resource, $q, $location) {

        var baseUrl = $location.protocol() + "://" + $location.host() + ":8082/rest/";

        var httpMethods = {
          POST : function(path, params){
            return $resource(baseUrl   + path).save(angular.toJson(params)).$promise;
          },
          GETArray : function(path, params){
            return $resource(baseUrl   + path, params, {'get' : {method : 'GET',isArray: true}}).get().$promise;
          }
        }

        return httpMethods;

    }]);

});
