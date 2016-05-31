;(function(){
  angular.module('storybook')
    .directive('elframe', function(){
      var directive = {
        restrict: 'E',
        controller: function() {
        },
        controllerAs: 'vm',
        template:
        '<iframe ' +
        '  class="col s12" ' +
        '  id="elframe"' +
        '  style="' +
        '    margin:0;' +
        '    width:100%;' +
        '    border:none;' +
        '    overflow:hidden"' +
        '  scrolling="no"' +
        '></iframe>',
        scope: {},
        link: function (scope, element) {
          var iframe = element.find('iframe')[0];
          iframe.src = element.attr('src');
        }
      }
      return directive;
    })
})();
