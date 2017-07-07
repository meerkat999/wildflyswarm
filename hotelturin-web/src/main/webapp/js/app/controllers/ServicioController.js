define(['app-module', 'sweetService', 'servicioService', 'tipoDocumentoService', 'clienteService', 'arriendoService', 'facturaService'], function (app) {
    app.controller('servicioController',['$scope','$state', 'sweetService', 'servicioService', 'tipoDocumentoService', 'clienteService', 'arriendoService', 'facturaService',
        function ($scope, $state, sweetService, servicioService, tipoDocumentoService, clienteService, arriendoService, facturaService) {

          $scope.validarEnTiempoRealCamposCedula = function(){
            if(!$scope.campoVacio($scope.tipodocumento) &&
               !$scope.campoVacio($scope.cedulaVerificar) &&
               !$scope.campoVacio($scope.confirmacionCedula) &&
               $scope.cedulaVerificar === $scope.confirmacionCedula
            ){
              var id = {
                tipodocumento : $scope.tipodocumento,
                id : $scope.cedulaVerificar
              };
              clienteService.getById(id).then(function(cliente){
                if(cliente !== undefined && cliente.id !== undefined){
                  arriendoService.getByClienteKeyCheckInActive(cliente.id).then(function(arriendo){
                    if(arriendo !== undefined && arriendo.id !== undefined){
                      $scope.arriendoSeleccionado = arriendo;
                      sweetService.info("Cliente Registrado con Checkin","El cliente " + cliente.nombreCompleto + " ya se encuentra registrado. \n Tiene un checkin activo, se facturará para la habitación " + arriendo.habitacionId + " . \n Puedes continuar con el proceso.");
                    }else{
                      sweetService.info("Cliente Registrado","El cliente " + cliente.nombreCompleto + " ya se encuentra registrado. \n Puedes continuar con el proceso.");
                    }
                  })
                  $scope.cliente = cliente;
                  $scope.seBloqueanLosCamposDeCedula = true;
                }else{
                  $state.go('app.serviciosAdicionales.registro');
                  sweetService.info("Cliente no Registrado","Se te habilitará un módulo para registrar el nuevo cliente.");
                  $scope.esNecesarioRegistrar = true;
                  $scope.nuevoCliente = {
                    id : {
                      id : $scope.cedulaVerificar,
                      tipodocumento : $scope.tipodocumento
                    }
                  };
                  $scope.seBloqueanLosCamposDeCedula = true;
                }
              });
            }
          }

      $scope.agregar = function(){
          servicioService.add($scope.Servicio).then(function(data){
            if(data !== null){
          	   sweetService.success("El Servicio adicional " + data.nombre + " fue registrado satisfactoriamente");
          	 $state.go("app.administracion.adminServicios")
            }
          },function(error){
            sweetService.error("Ha ocurrido un error al intentar Registrar el Servicio adicional. Si el problema persiste, comúniquese con el área de sistemas.");
          })
      }

      $scope.actualizar = function(){
          servicioService.update($scope.Servicio).then(function(data){
            if(data !== null){
          	   sweetService.success("El Servicio adicional " + data.nombre + " fue editado satisfactoriamente");
          	   $state.go("app.administracion.adminServicios.modificarServicios")
            }
          },function(error){
            sweetService.error("Ha ocurrido un error al intentar Actualizar el Servicio adicional. Si el problema persiste, comúniquese con el área de sistemas.");
          })
      }

      $scope.desactivar = function(servicio){
          servicioService.desactivar(servicio).then(function(data){
            if(data !== undefined && data.id !== undefined){
          	   sweetService.success("El Servicio adicional " + data.nombre + " fue desactivado satisfactoriamente");
          	 $scope.buscarServiciosDisponibles();
          	 $scope.$apply();
            }
          },function(error){
            sweetService.error("Ha ocurrido un error al intentar Desactivar el Servicio adicional. Si el problema persiste, comúniquese con el área de sistemas.");
          })
      }

      $scope.activar = function(servicio){
          servicioService.activar(servicio).then(function(data){
            if(data !== undefined && data.id !== undefined){
          	   sweetService.success("El Servicio adicional " + data.nombre + " fue Activado satisfactoriamente");
          	 $scope.buscarServiciosInactivos();
          	 $scope.$apply();
            }
          },function(error){
            sweetService.error("Ha ocurrido un error al intentar Activar el Servicio adicional. Si el problema persiste, comúniquese con el área de sistemas.");
          })
      }

      $scope.campoVacio = function(campo){
          return campo == undefined || campo == "";
      }

      $scope.validarFormularioRegistro = function(){
        var valido = true;
        $scope.erroresFormularioRegistro = [];
        if($scope.campoVacio($scope.Servicio.nombre)){
          valido = false;
          $scope.erroresFormularioRegistro[0] = true;
        }else if($scope.campoVacio($scope.Servicio.valor)){
          valido = false;
          $scope.erroresFormularioRegistro[1] = true;
        }
        return valido;
      }

      $scope.openServicio = function(servicio){
          sweetService.question(servicio.nombre, servicio.valor, "Seleccionar", "Cancelar", function(esSeleccionado){
            if(esSeleccionado){
              $scope.servicioSeleccionado = servicio;
              $scope.$apply();
            }
          });
        }

      $scope.buscarServiciosDisponibles = function(){
          var estado = {
            id : 1
          }
          servicioService.getByState(estado).then(function(data){
            if(data !== null && data.listaServicios !== null){
              $scope.serviciosDisponibles = data.listaServicios;
            }else{
              sweetService.warning("No hay servicios disponibles para facturar");
            }
          })
        }

      $scope.buscarServiciosInactivos = function(){
          var estado = {
            id : 2
          }
          servicioService.getByState(estado).then(function(data){
            if(data !== null && data.listaServicios !== null){
              $scope.serviciosInactivos = data.listaServicios;
            }
          })
        }

      $scope.registrar = function(){
        if($scope.validarFormularioRegistro() == true){
              $scope.agregar();
            }

        }

        $scope.goRegistrarServicio = function(){
          $scope.init();
          $scope.Servicio={};
          $scope.isEditing = false;
          $state.go("app.administracion.adminServicios.registrarServicio")
        }

        $scope.goModificarServicios = function(){
          $scope.init();
          $state.go("app.administracion.adminServicios.modificarServicios")
        }

        $scope.goActivarServicios = function(){
            $scope.init();
            $state.go("app.administracion.adminServicios.activarServicios")
          }

        $scope.goEditar = function(servicio){
          $scope.Servicio = servicio;
          $scope.isEditing = true;
          $state.go("app.administracion.adminServicios.modificarServicios.editarServicio")
        }

      $scope.mostrarVistaRegistro = function(){
        return $scope.esNecesarioRegistrar === true && $scope.cliente === null;
      }

      $scope.mostrarVistaServicioAdicional = function(){
        return $scope.cliente !== null;
      }

      $scope.buscarTiposDocumento = function(){
        tipoDocumentoService.getAll().then(function(lista){
          if(lista !== null && lista !== undefined){
            $scope.listaTiposDocumentos = lista;
          }
        }, function(error){
          sweetService.error("No se pudieron obtener los tipos de documento.");
        })
      }

      $scope.serviceSeleccionado = function(id){
        return $scope.serviciosSeleccionados.indexOf(id) > -1;
      }

      $scope.selectUnselectServicio = function(id){
        if($scope.serviceSeleccionado(id) === true){
          delete $scope.serviciosSeleccionados[$scope.serviciosSeleccionados.indexOf(id)];
        }else{
          $scope.serviciosSeleccionados.push(id);
        }
      }

      $scope.addServicio = function(servicio){
        $scope.totalMonto += servicio.valor;
        $scope.serviciosSeleccionados.push(servicio);
      }

      $scope.deleteServicio = function(index){
        $scope.totalMonto -= $scope.serviciosSeleccionados[index].valor;
        $scope.serviciosSeleccionados.splice(index, 1);
      }

      $scope.limpiarServicios = function(){
        $scope.totalMonto = 0;
        $scope.serviciosSeleccionados = [];
      }

      $scope.getArriendosActivos = function(){
        arriendoService.getByState({estadoId : 1}).then(function(listaArriendosActivos){
          if(listaArriendosActivos !== undefined && listaArriendosActivos.listaArriendos !== undefined && listaArriendosActivos.listaArriendos.length > 0){
            $scope.arriendoActivos = listaArriendosActivos.listaArriendos;
          }else{
            sweetService.warning("No hay ningún check-in activo.");
          }
        })
      }

      $scope.openArriendo = function(arriendo){
        $scope.arriendoSeleccionado = arriendo;
        $scope.cliente = {
          id : {
            id : arriendo.clienteId,
            tipodocumento : arriendo.tipodocumentoId
          }
        }
      }

      $scope.finishFactura = function(){
        $scope.factura = {
          clienteId : $scope.cliente.id.id,
          tipodocumentoId : $scope.cliente.id.tipodocumento,
          numBauche : null,
          listaServiciosAConsumir : $scope.serviciosSeleccionados
        }
        facturaService.facturarconsumoclientesincheckin($scope.factura).then(function(data){
          if(data !== undefined && data.id !== undefined){
            sweetService.success("Se ha facturado correctamente.");
            $scope.limpiarServicios();
          }else{
            sweetService.error("Ha ocurrido un error al facturar");
          }
        }, function(error){
          sweetService.error("Ha ocurrido un error al facturar");
        })

      }

      $scope.init = function(){
        $scope.buscarTiposDocumento();
        $scope.buscarServiciosDisponibles();
        $scope.buscarServiciosInactivos();
        $scope.getArriendosActivos();
        $scope.arriendoActivos = [];
        $scope.totalMonto = 0;
        $scope.serviciosSeleccionados = [];
        $scope.isEditing = false;
        $scope.esNecesarioRegistrar = undefined;
        $scope.cliente = null;
        $scope.seBloqueanLosCamposDeCedula = false;
        $scope.tipodocumento = null;
        $scope.cedulaVerificar = null;
        $scope.confirmacionCedula = null;
        $scope.listServicios = [];
        $scope.serviciosAdicionalesRegistro = true;
        $scope.serviciosDisponibles = [];
        $scope.serviciosInactivos = [];
        $scope.servicioSeleccionado = {
            id : null
        };
        $scope.arriendoSeleccionado = undefined;
      }

      $scope.init();

    }]);
});
