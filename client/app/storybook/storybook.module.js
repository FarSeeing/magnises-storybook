;(function() {
  'use strict';

  angular
    .module('storybook', [
      'hc.marked',
      /* Angular Modules */
      'ngAnimate',
      'ngCookies',
      'ngSanitize',
      'ngTouch',
      /* Cross-app Modules */
      /* Router Modules */
      'ui.router',
      'ct.ui.router.extras.core',
      'permission',
      'permission.ui',
      //'anim-in-out',
      'uiRouterStyles',
      /* 3rd Party Modules */
      'angularMoment',
      'LocalForageModule',
      'ui.materialize',
      'ui.mask',
      'angularPayments',
      'ngFileUpload',
      'ng-showdown'
    ]);

})();
