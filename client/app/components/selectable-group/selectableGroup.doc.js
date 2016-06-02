;(function(){
  'use strict'

  angular.module('storybook')
    .config(selectableGroupConfig);

  /* @ngInject */
  function selectableGroupConfig(StoryBookProvider) {
    StoryBookProvider
      .addChapter('selectable-group')
        .addStory('common')
        .addStory('lonely element', 'common')
        .publish();
  }
})();
