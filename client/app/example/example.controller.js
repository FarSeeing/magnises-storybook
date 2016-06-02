;(function() {
  'use strict';

  angular
    .module('app.components')
    .controller('ExampleController', ExampleController);

  /* @ngInject */
  function ExampleController($stateParams) {
    this.templateUrl = $stateParams.templateUrl;
  }

})();
