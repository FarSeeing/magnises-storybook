;(function() {
  'use strict';

  /**
   * all that was pretty stupid
   * next time watch libriries first, then try to add something 
   * you have lodash
   *
   * @function phrase to words
   * @description convert phrase in format to words plain space delimited text
   * @param {string} phrase string with phrase
   * @param {string} format format of the string like 'camelCase' or 'sentence' or 'dash' or 'underscope'
   * @return {string[]} actually words from the phrase consist
   */
  function phraseToPlain(phrase, format){
    switch(format){
      case 'camelCase':
        return phrase
          .replace(/([a-z])([A-Z])/g
          , function($, lowerCased, upperCased) {
              return lowerCased + ' ' + upperCased.toLowerCase()
          }).toLowerCase();
      case 'kebabCase':
        return phrese
          .replace(/(-)([a-Z])/g
          , function($, delimiter, nextLetter) {
              return ' ' + nextLetter
          }).toLowerCase();
      case 'underscopeCase':
        return phrase
          .replace(/(_)([a-Z]/g
          , function($, delimiter, nextLetter) {
              return ' ' + nextLetter
          }).toLowerCase();
      case 'sentence':
        return phrase.toLowerCase();
// hilarious
//                    .replace(/( )([a-Z]/
//                    , function($, delimiter, nextLetter) {
//                        return ' ' + nextLetter
//                    });

    }
  }
  
  /**
   * @function plainTophrase
   * @description convert space delimited text to phrase in selected format
   * @param {string[]} words words from which completed phrase shoud consist
   * you shoud realize that Uppercased words may not be used beacouse of format difference
   * @param {string} format format of the output string like see `phraseToArray`
   * @return {string} completed phrase
   */
  function plainToPhrase(plain, format){
    const plainText = /( )(.)/g;
    switch(format){
      case 'camelcase':
        return plain
          .replace(plainText
          , function($, space, anysymbol) {
              return anysymbol.touppercase();
          });
      case 'kebabCase':
        return plain
          .replace(plainText
          , function($, space, anysymbol) {
              return '-' + anysymbol;
          });
      case 'underscopeCase':
        return plain
          .replace(plainText
          , function($, space, anysymbol) {
              return '_' + anysymbol;
          })
      case 'sentence':
        return plain.replace(/^./, function($) { return $.toUpperCase()});
      default:
        console.error('wrong format passed: ' + format)
        return plain;
    }
  }

  /**
   * @function convert
   * @description convert one case string to another through plain text
   * @param {string} phrase phrase to convert
   * @param {string} inputCase input phrase case style
   * @param {string} outputCase output phrase case style
   * @return {string} phrase in outputCase format
   */
  function convert(phrase, inputCase, outputCase){
    var plain = phraseToPlain(phrase, inputCase);
    return plainToPhrase(plain, outputCase);
  }  ;


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
         *
         * @param {string} [baseUrl="app/components"] base directory for autoconfig
         */
        function Chapter(name,baseUrl) {
          var o = this;
          
          this.baseUrl = baseUrl ? baseUrl : 'app/components/';
          this.name = name;
          // stupido block for name case transformation
          // types of spelling
          this.underScopeName = convert(o.name, 'camelCase', 'underscopeCase');
          this.dashedName = convert(o.name, 'camelCase', 'kebabCase');
          this.sentenceName = convert(o.name, 'camelCase', 'sentence');
          //  .replace(/([a-z])([A-Z])/g, function($, $1, $2){return $1 + " " + $2.toLowerCase();})
          //  .replace(/^./, function($) { return $.toUpperCase()} );
          //array for containing stories
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
          this.add = function(config, docs) {
            //configuration variables shoud be able to config
            //string to config shoud be moved to separate function maybe
            if (typeof config == "string") {
              o.stories.push(this.autoconfig(config, docs));
              return this;
            };
            o.stories.push(config);
            return this;
          }; 
          /**
           * @function autoconfig
           * @param {string} name
           * @return {object} configuration for add function
           */
          this.autoconfig = function(name, customDocumentation) {
            var withoutController = ( name.indexOf('(NC)') != -1 );
            if ( withoutController ){
              name = name.replace('(NC)','');
            };
            var baseDir = o.baseUrl + o.dashedName + '/examples/';
            var pathToDir = baseDir + name; 
            var autoconfig = {
              name: o.sentenceName + '\'s ' + name,
              templateUrl: pathToDir + '/doc.html',
              controllerUrl: pathToDir + '/doc.js',
              controller: (withoutController ? 'ActionButtonDocController' : o.name + 'DocController'),
              documentationUrl: baseDir + (customDocumentation ? customDocumentation : name) + '/doc.md'
            };
            //console.log(autoname);
            return autoconfig;
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
                      '<elframe src="index.html' +
                      '?templateUrl=' + story.templateUrl +
                      '&controller=' + story.controller +
                      '&controllerAs=' + (story.controllerAs ? story.controllerAs :'vm') + '">' +
                      '</elframe></div>'
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
