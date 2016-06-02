;(function() {
  'use strict';

  angular
    .module('app.components')
    .config(AppConfig);

  /* @ngInject */
  function AppConfig($stateProvider) {
    $stateProvider
      .state({
        name: 'examples',
        url: '/index.html?templateUrl',
        views: {
          'main@': {
            template:
              '<example-wrap>' +
                '<div ng-include="example.templateUrl"></div>' +
              '</example-wrap>',
            controller: 'ExampleController',
            controllerAs: 'example'
          }
        }
      });
  }

})();
