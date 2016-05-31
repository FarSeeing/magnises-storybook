;(function(){
  angular.module('storybook')
  .config(
    /* @ngInject */
    function(storyBookProvider){
      storyBookProvider
      .Story('member card pocket')
      .add({
        name: 'example',
        templateUrl: 'app/components/material-input/examles/example.template.html',
        controller: 'ActionButtonDocController',
        documentationUrl: 'app/components/material-input/doc/annotation.md'
      }).publish();
    });
})();
