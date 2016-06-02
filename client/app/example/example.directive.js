;(function() {
  'use strict';

  angular
    .module('app.components')
    .directive('exampleWrap', exampleWrapDirective);

  /* @ngInject */
  function exampleWrapDirective() {
    return {
      restrict: 'E',
      link: function () {
        var body = document.body;

        window.setInterval(function(){
          onWindowResize(body.offsetHeight + 50);
        }, 50);
      }
    };
  }

  function onWindowResize(height) {
    var frame = window.frameElement;

    if (frame) {
      frame.style.height = height + 'px';
    }
  }

})();
