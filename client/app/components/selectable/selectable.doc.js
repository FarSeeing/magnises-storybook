;(function(){
  'use strict'

  angular.module('storybook')
    .config(selectableConfig);

  /* @ngInject */
  function selectableConfig(StoryBookProvider) {
    StoryBookProvider
      .addChapter('selectable')
        .addStory('common')
        .addStory('parameters')
        .addStory('uncheck')
        .publish();
  }
})();
