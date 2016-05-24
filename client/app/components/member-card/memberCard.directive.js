(function () {
  'use strict';

  angular
    .module('app.components')
    .directive('memberCard', memberCard);

  /* @ngInject */
  function memberCard() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/memberCard.html',
      scope: {},
      bindToController: {
        firstName: '=',
        lastName: '=',
        face: '='
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
