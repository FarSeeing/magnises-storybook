;(function(){
  angular.module('storybook')
  /* @ngIngect */
  .config(function(storyBookProvider){
    storyBookProvider.Story('selectableGroup')
    .add('grouping selects(NC)').publish();
  });
})();
