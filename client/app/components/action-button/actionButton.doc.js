;(function(){
  angular.module('storybook')
  .config(
    /* @ngInject */
    function(storyBookProvider){
    storyBookProvider
      .Story('action button')
      .add({
        name: 'action button states',
        templateUrl: 'app/components/action-button/actionButton.state.doc.html',
        controller: 'ActionButtonDocController',
        controllerAs: 'vm',
        documentationUrl: 'app/components/action-button/actionButton.state.doc.annotation.md'
      })
      .add({
        name: 'action button animation',
        templateUrl: 'app/components/action-button/actionButton.animation.doc.html',
        controller: 'ActionButtonDocController',
        documentationUrl: 'app/components/action-button/actionButton.animation.doc.annotation.md'
      }).publish();
  })
})();
