/**
 * @ngdoc directive
 * @name app.components.directive:materialInput
 * @restrict E
 *
 * @description
 *
 * @param {string=} firstName member's first name
 * @param {string=} lastName member's last name
 * @param {string=} [face="/images/manises-card-md.png"] path to face photo
 *
 * @example
 *
 <example>
   <file name="index.html">
     <member-card 
       first-name="Glenjin" 
       last-name="Korkovich">
     </member-card>
   </file>
 </example>
*/

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
