;(function(){
  angular.module('storybook')
  /* @ngIngect */
  .config(function(storyBookProvider){
    storyBookProvider.Story('selectableGroup')
    .add('groupingSelects(NC)').publish();
  });
})();
