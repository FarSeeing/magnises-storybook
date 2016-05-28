;(function() {
  'use strict';

  angular
    .module('app.components')
    .controller('ComponentsController', ComponentsController);

  /* @ngInject */
  function ComponentsController($state) {
    var dm = this;
    var root = 'components';
    var rootHeader = new RegExp('^' + root + '\.');

    dm.nothing = 'nothing at all';
    dm.current = 0;
    dm.components = $state.get().filter(function(state){
      return rootHeader.test(state.name);
    }).
      map(function(state) {
        var component = {};
        component.name = state.name.replace(rootHeader, '');
        component.url = '#/' + root + state.url;
        return component; 
      });
  }
})();
