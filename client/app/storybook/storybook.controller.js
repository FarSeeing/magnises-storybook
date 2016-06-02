;(function() {
  'use strict';

  angular
    .module('storybook')
    .controller('StoryBookController', StoryBookController);

  /* @ngInject */
  function StoryBookController(StoryBook) {
    this.chapters = StoryBook.chapters;
    this.filterChapters = function(query) {
      this.chapters = StoryBook.chapters
      .map(function(chapter){
        
        if (chapter.name.indexOf(query) != -1) {
          chapter.filteredStories = chapter.stories;
          return chapter;
        }         
        chapter.filteredStories = chapter.stories.filter(function(chapter){
          return chapter.name.indexOf(query) != -1;
        });

        return (chapter.filteredStories.length) ? chapter : {};
      })
    };
    this.filterChapters('');
  }

})();
