;(function(){
  'use strict';
  
  angular.module('storybook')
    .config(actionButtonConfig);
  
  /* @ngInject */
  function actionButtonConfig(StoryBookProvider) {
    StoryBookProvider
      .addChapter('member-card-pocket')
      .addStory('common')
      .publish();
  }
  
})();
