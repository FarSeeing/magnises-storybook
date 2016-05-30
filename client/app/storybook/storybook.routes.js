;(function() {
  'use strict';

  angular
    .module('storybook')
    .config(AppConfig);

  /* @ngInject */
  function AppConfig($stateProvider, $locationProvider, storyBookProvider) {
    $locationProvider.html5Mode({ enabled: true, requireBase: false });
    /*storyBookProvider.Story('newstory')
      .add({
        name:'pff',
        templateUrl: 'app/components/action-button/actionButton.doc.html',
        controller: 'ActionButtonDocController',
        controllerAs: 'vm',
        documentationUrl: 'app/components/action-button/actionButton.annotation.doc.html'})
      .add({
        name:'pffo',
        templateUrl: 'app/components/action-button/actionButton.doc.html',
        controller: 'ActionButtonDocController',
        documentationUrl: 'app/components/action-button/actionButton.annotation.doc.html'})
      .publish();*/
    $stateProvider
      .state({
        name: 'components',
        url: '/components',
        views: {
          'main@': {
            templateUrl: 'app/storybook/storybook.html',
            controller: 'StorybookController',
            controllerAs: 'vm',
          }
        }
      });
      //An example of a component state, where components is the child of that state
      //example in action-button's component directory
      /*
      .state({
        name: 'components.actionButton',
        url: '/action-button',
        views: {
          'component@components': {
            templateUrl: 'app/components/action-button/actionButton.doc.html',
            controller: 'ActionButtonDocController',
            controllerAs: 'vm'
          },
          'doc@components': {
            templateUrl: 'app/components/action-button/actionButton.annotation.doc.html'
          }
        }
      })
      .state({
        name: 'components.materialInput',
        url: '/material-input',
        views: {
          'component@components': {
            templateUrl: 'app/components/material-input/materialInput.doc.html'
          },
          'doc@components': {
            templateUrl: 'app/components/material-input/materialInput.annotation.doc.html'
          }
        }
      });
     */
  }

})();
