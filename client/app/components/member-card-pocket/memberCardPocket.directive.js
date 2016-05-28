/**
 * @ngdoc directive
 * @name app.components.directive:memberCardPocket
 * @restrict E
 *
 * @description
 * 
 * @param {string=} firstName member's first name
 * @param {string=} lastName member's last name
 *
 * @example
 *
 <example>
   <file name="index.html">
     <member-card-pocket firstName="Klekov" secondName="Klekovsky">
     </member-card-pocket>
   </file>
 </example>
*/
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
