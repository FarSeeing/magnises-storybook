;(function() {
  'use strict';

  angular
    .module('storybook')
    .controller('StoryBookController', StoryBookController);

  /* @ngInject */
  function StoryBookController(StoryBook) {
    this.chapters = StoryBook.chapters;
  }
})();
