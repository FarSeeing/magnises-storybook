;(function() {
  'use strict';

  angular
    .module('app.components')
    .directive('exampleWrap', ['$compile', '$parse', function ($compile, $parse) {
      return {
        restrict: 'A',
        terminal: true,
        priority: 100000,
        link: function (scope, elem) {
          var body = document.body;
          var html = document.documentElement

          scope.getWindowDimensions = function () {
            return Math.max( body.scrollHeight, body.offsetHeight, 
                             html.clientHeight, html.scrollHeight, html.offsetHeight );     
          };
          scope.$watch(scope.getWindowDimensions, onWindowResize, true);
          var controller = $parse(elem.attr('example-wrap'))(scope);

          elem.removeAttr('example-wrap');
          elem.attr('ng-controller', controller);
          $compile(elem)(scope);
        }
      };
    }]);

  function onWindowResize(height) {
    var frame = window.frameElement;
    console.log('lol');
    if (frame) {
      frame.style.height = height + 'px';
    }
  }

})();
