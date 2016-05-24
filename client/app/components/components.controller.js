;(function() {
  'use strict';

  angular
    .module('app.components')
    .controller('ComponentsController', ComponentsController);

  /* @ngInject */
  function ComponentsController() {
    this.nothing = 'nothing at all';
    this.current = 0;
    this.components = [
      {
        name: "component",
        documentation: "##component \n md _documentation_ \n- frst  \n- scnd  \n- thrd",
        stories: [
          {
            name: "first story"
          },
          {
            name: "second story"
          }
        ]
      }
    ];
  }
})();
