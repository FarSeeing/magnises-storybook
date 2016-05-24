(function () {
  'use strict';

  angular
    .module('app.components')
    .directive('memberCardPocket', memberCardPocket);

  /* @ngInject */
  function memberCardPocket() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/memberCardPocket.html',
      scope: {},
      bindToController: {
        firstName: '=',
        lastName: '='
      },
      controller: Controller,
      controllerAs: 'dm'
    };

    return directive;

  }

  /* @ngInject */
  function Controller(){
    var dm = this;
  }
})();
