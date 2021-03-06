;(function() {
  'use strict';

  angular
    .module('app.core')
    .config(AppConfig);

  /* @ngInject */
  function AppConfig($compileProvider, $httpProvider, $locationProvider, $urlRouterProvider, $uiViewScrollProvider, $showdownProvider) {
    //Performance Improvements
    $compileProvider.debugInfoEnabled(false);

    $httpProvider.useApplyAsync(true);

    //If these walls could talk
    $locationProvider.html5Mode(false);

    $urlRouterProvider.otherwise(function($injector) {
      var $state = $injector.get('$state');
      $state.go('components');
    });

    $uiViewScrollProvider.useAnchorScroll();
    
    $showdownProvider.setOption()
  }

})();
