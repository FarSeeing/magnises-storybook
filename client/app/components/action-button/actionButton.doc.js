;(function(){
  'use strict';

  angular.module('storybook')
    .config(actionButtonConfig);

  /* @ngInject */
  function actionButtonConfig(StoryBookProvider) {
    StoryBookProvider
      .addChapter('action-button')
        .addStory('animation')
        .addStory('state')
        .publish();
  }

})();
