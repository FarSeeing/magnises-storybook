;(function(){
  angular.module('storybook')
  .config(function(storyBookProvider){
    storyBookProvider.Story('selectable')
    .add('touching(NC)')
    .publish();
  })
})();
