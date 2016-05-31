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
            /*return Math.max( body.scrollHeight 
                             , body.offsetHeight 
                             , body.clientHeight
                             , html.clientHeight  
                             , html.scrollHeight 
                             , html.offsetHeight
                               );     */
             //console.log(getComputedStyle(body).marginTop);
             //here is a margin trouble
             return body.offsetHeight + 50;
          };
          //scope.$watch(scope.getWindowDimensions, onWindowResize, true);
          var controller = $parse(elem.attr('example-wrap'))(scope);
          
          window.setInterval(function(){
            onWindowResize(scope.getWindowDimensions());
          },100);
          //window.setInterval(function(){console.log('foo')}, 100);

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
