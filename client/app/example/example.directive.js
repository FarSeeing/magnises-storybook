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

          scope.getWindowDimensions = function () {
            return body.scrollHeight;
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

    if (frame) {
      frame.style.height = height + 'px';
    }
  }

})();
