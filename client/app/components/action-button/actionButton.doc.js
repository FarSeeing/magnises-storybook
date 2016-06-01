;(function(){
  angular.module('storybook')
  .config(
    /* @ngInject */
    function(storyBookProvider){
    storyBookProvider
      .Story('actionButton')
      .add('animation(NC)', 'state')
      .add('state(NC)')
      .add({
        name: 'action button states',
        templateUrl: 'app/components/action-button/examples/actionButton.state.doc.html',
        controller: 'ActionButtonDocController',
        controllerAs: 'vm',
        documentationUrl: 'app/components/action-button/doc/actionButton.state.doc.annotation.md'
      })
      .add({
        name: 'action button animation',
        templateUrl: 'app/components/action-button/examples/actionButton.animation.doc.html',
        controller: 'ActionButtonDocController',
        documentationUrl: 'app/components/action-button/doc/actionButton.animation.doc.annotation.md'
      }).publish();
  })
})();
