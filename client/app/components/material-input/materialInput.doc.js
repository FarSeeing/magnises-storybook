;(function(){
  'use strict';
  
  angular.module('storybook')
    .config(actionButtonConfig);
  
  /* @ngInject */
  function actionButtonConfig(StoryBookProvider) {
    StoryBookProvider
      .addChapter('material-input')
      .addStory('common')
      .publish();
  }
  
})();
