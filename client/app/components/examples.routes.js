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
        url: '/index.html?templateUrl&controller&controllerAs',
        views: {
          'main@': {
            template:
              '<div ' +
                ' example-wrap="example.controller + \' as \' + example.controllerAs" ' +
                ' ng-include="example.templateUrl">' +
              '</div>',
            controller: 'ExampleController',
            controllerAs: 'example'
          }
        }
      });
  }

})();
