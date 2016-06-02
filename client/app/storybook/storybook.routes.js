;(function() {
  'use strict';

  angular
    .module('storybook')
    .config(AppConfig);

  /* @ngInject */
  function AppConfig($stateProvider, $locationProvider) {
    $locationProvider.html5Mode({ enabled: true, requireBase: false });
    $stateProvider
      .state({
        name: 'components',
        url: '/components',
        views: {
          'main@': {
            templateUrl: 'app/storybook/storybook.html',
            controller: 'StoryBookController',
            controllerAs: 'vm'
          }
        }
      });
  }

})();
