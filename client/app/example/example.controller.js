;(function() {
  'use strict';

  angular
    .module('app.components')
    .controller('ExampleController', ['$stateParams', function ($stateParams) {
      this.templateUrl = $stateParams.templateUrl;
      this.controller = $stateParams.controller;
      this.controllerAs = $stateParams.controllerAs;
    }]);

})();
