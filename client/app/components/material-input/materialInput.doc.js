;(function(){
  angular.module('storybook')
  .config(
    /* @ngInject */
    function(storyBookProvider){
      storyBookProvider
      .Story('material input')
      .add({
        name: 'example',
        templateUrl: 'app/components/material-input/examles/example.template.html',
        controller: 'MaterialInputController',
        documentationUrl: 'app/components/material-input/doc/annotation.md'
      }).publish();
    });
})();
