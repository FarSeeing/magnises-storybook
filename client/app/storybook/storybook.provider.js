;(function() {
  'use strict';

  angular
    .module('storybook')
    .provider('StoryBook', StoryBookProvider);

  /* @ngInject */
  function StoryBookProvider($stateProvider) {
    var chapters = [];

    /**
     * @constructor Chapter
     * @description contains some stories and provide publishing in controller
     * should have access to root property
     * @param {string} name name of component or chapter title (what you want to call it)
     */
    function Chapter(name) {
      this.name = name;
      this.stories = [];
    }

    Chapter.prototype.publish = function () {
      chapters.push(this);

      return this;
    };

    Chapter.prototype.addStory = function (name, customDocModuleName) {
      new Story(this, name, customDocModuleName).publish();

      return this;
    };

    function Story(chapter, name, customDocModuleName) {
      var directory = 'app/components/' + chapter.name;

      this.chapter = chapter;
      this.name = name;
      this.templateUrl = directory + '/examples/' + name + '.html';
      this.documentationUrl = directory + '/docs/' + (customDocModuleName ? customDocModuleName : name) + '.md';

      return this;
    }

    Story.prototype.publish = function () {
      var url = '/' + this.chapter.name + '/' + this.name;

      this.chapter.stories.push(this);
      $stateProvider
        .state({
          name: 'components.' + this.chapter.name + '/' + this.name,
          url: url,
          views: {
            'component@components': {
              template:
              '<div class="row">' +
              '<elframe src="index.html' +
              '?templateUrl=' + this.templateUrl + '">' +
              '</elframe></div>'
            },
            'doc@components': {
              template: '<div marked ng-include="\'' + this.documentationUrl + '\'"></marked>'
            }
          }
        });
      this.url = '/components' + url;

      return this;
    };

    return {
      // here should be able to add some components and stories
      /**
       * @method Chapter
       * @description crete new chapter where you can add stories
       * @param {string} name name of the chapter
       * @return Chapter
       */
      addChapter: function (name) {
        return new Chapter(name);
      },
      $get: function () {
        return {
          chapters: chapters
        };
      }
    }
  }

})();
