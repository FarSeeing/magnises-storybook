;(function() {
  'use strict';

  angular
    .module('storybook')
    .provider('storyBook', 
      /* @ngInject */
      function($stateProvider) {
        var root = 'components';
        var components = [];

        /**
         * @constructor Chapter
         * @description contains some stories and provide publishing in controller
         * shoud have access to root property
         * @param {string} componentName name of component or chapter title (what you want to call it)
         */
        function Chapter(name) {
          var o = this;
          this.name = name;
          this.stories = [];
          /**
           * @function add
           * @description add story with passed configuration
           * @param {object} config
           * @param {string} config.name 
           * @param {string} [config.url=config.name] story url (relative to root)
           * @param {string} config.templateUrl story template url
           * @param {string} config.controller angular controller name for template
           * @param {string} [config.controllerAs='vm'] alias for controller in angular
           * @param {string} config.documentationUrl template for documentation section
           */
          this.add = function(config) {
            o.stories.push(config);
            return this;
          };
          /**
           * publish stories in roteProvider
           * just a routeProvider vrapper
           */
          this.publish = function() {
            o.stories.map(function(story){
              story.url = '/' + (story.url ? story.url : o.name + '/' + story.name );
              $stateProvider
                .state({
                  name: root + '.' + o.name + '\'s ' + story.name,
                  url: story.url,
                  views: {
                    'component@components': {
                      template:                      
                      '<div class="row">' +
                      '<iframe class="col s12" src="index.html?' +
                      '?templateUrl=' + story.templateUrl +
                      '&controller=' + story.controller +
                      '&controllerAs=' + (story.controllerAs ? story.controllerAs :'vm') + '">' +
                      '</iframe></div>'
                    },
                    'doc@components': {
                      template: '<div marked ng-include="\'' + story.documentationUrl + '\'"></marked>'
                    }
                  }
                });
              story.url =  '/components' + story.url;
            });
          };
        }

        return {
          //here shoud be able to add some components and stories
          /**
           * @method Story
           * @description crete new chapter where you can add stories
           * @param {string} name name of the chapter
           * @return Chapter
           */
          Story: function(name) {
            var chapter = new Chapter(name);
            components.push(chapter);
            return chapter;
          },
          Publish: function() {
            componetns.map(function(component){
              componens.publish();
            });
          },
          $get: function() {
            //here shoud be able to get a list or maybe tree of components
            //it will be stories service
            //for here is just info about all added chapters
            return {
              chapters: components
            }
          }
        }
      })

})();
