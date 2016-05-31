;(function() {
  'use strict';

  angular
    .module('app.components')
    .directive('exampleWrap', ['$compile', '$parse', '$window', function ($compile, $parse, $window) {
      return {
        restrict: 'A',
        terminal: true,
        priority: 100000,
        link: function (scope, elem) {
          var w = angular.element($window);

          scope.getWindowDimensions = function () {
            var body = document.body,
            html = document.documentElement;
            return Math.max( body.scrollHeight, body.offsetHeight, 
                             html.clientHeight, html.scrollHeight, html.offsetHeight );         
          };
          scope.$watch(scope.getWindowDimensions, onWindowResize, true);
          scope.$on('$viewContentLoaded', onWindowResize);

          var controller = $parse(elem.attr('example-wrap'))(scope);

          elem.removeAttr('example-wrap');
          elem.attr('ng-controller', controller);
          $compile(elem)(scope);
        }
      };
    }]);

  function onWindowResize(h) {
    if (window.onWindowResize) {
      window.onWindowResize(h);
    }
  }

})();
