;(function(){
  console.log('fu');
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
        link: function(scope, element, attrs) {
          var iframe = element.find('iframe')[0];
          iframe.src = element.attr('src');
          var height = '0px';
          scope.__height = '0px';

          iframe.contentWindow.onWindowResize = function(h){
            console.log('new h: ', h);
            iframe.style.height = h + 'px';
          };
        }
      }
      return directive;
    })
})();
