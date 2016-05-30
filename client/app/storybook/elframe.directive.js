;(function(){
  console.log('fu');
  angular.module('storybook')
    .directive('elframe', function(){
      var directive = {
        restrict: 'E',
        controller: function() {
        },
        controllerAs: 'vm',
        template: '<iframe id="elframe"></iframe>',
        scope: {},
        link: function(scope, element, attrs) {
          var iframe = element.find('iframe')[0];
          iframe.src = element.attr('src');

         /* console.log(iframe.contentWindow.document.body);
          iframe.onload = function(){
            scope.$watch(
              function(){
              return iframe.contentWindow.document.body;//offsetHeight
            }
            , function(newVal){
              console.log(newVal);
            });
          }*/
          iframe.contentWindow.onWindowResize = function(h){
            iframe.height = h;
          }
        }
      }
      return directive;
    })
})();
