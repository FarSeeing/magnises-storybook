/**
 * @ngdoc directive
 * @name app.components.directive:materialInput
 * @restrict E
 *
 * @description
 * Input wrapper
 *
 * @param {string=} ngModel Passed to input inside as it is
 * @param {string=} [type="text"] Passed to input inside as it is
 * @param {string=} name Passed to input inside as it is
 * @param {string=} label Passed to label inside as a text
 * @param {string=} pattern Passed to input inside as it is
 * @param {string=} placeholder Passed to input inside as it is
 * @param {string=} minLength Passed to input ngMinLength inside as it is
 * @param {string=} maxLength Passed to input ngMaxLength inside as it is
 * @param {boolean=} [required=false] Passed to input inside as it is
 * @param {boolean=} [validate=false] Passed to input inside as it is
 * @param {boolean=} [disabled=false] Passed to input inside as it is
 *
 * @example
   <example module="materialInputExample">
     <file name="index.html">
       <div ng-controller="Controller as ctrl">
         <form>
           <material-input
             ng-model="ctrl.model"
             type="text"
             name="materialTextInput"
             label="Label"
             pattern="\d+"
             placeholder="Placeholder"
             min-length="1"
             max-length="3"
             required="true"
             validate="true"
             disabled="false"
           >

           </material-input>
           <material-input
             type="submit"
             name="materialSubmitInput"
           >

           </material-input>
         </form>
       </div>
     </file>

     <file name="script.js">
       angular.module('materialInputExample', ['app'])
         .controller('Controller', function () {

         });
     </file>
   </example>
 */
(function () {
  'use strict';

  angular
    .module('app.components')
    .directive('materialInput', materialInput);

  /* @ngInject */
  function materialInput() {
    var directive = {
      restrict: 'E',
      templateUrl: '/client/app/components/material-input/materialInput.html',
      scope: {},
      bindToController: {
        model: '=ngModel',
        name: '@',
        type: '@',
        label: '@',
        required: '=',
        pattern: '@',
        validate: '=',
        placeholder: '@',
        minLength: '@',
        maxLength: '@',
        disabled: '='
      },
      controller: function() {},
      controllerAs: 'dm',
      link: link
    };

    return directive;

    function link(scope, element) {
      var input = element.find('input')[0];

      if (typeof scope.dm.pattern === 'string') {
        input.pattern = scope.dm.pattern;
      }

      if (typeof scope.dm.placeholder === 'string') {
        input.placeholder = scope.dm.placeholder;
      }

      scope.$watch('dm.pattern', function(value) {
        if (typeof value === 'string') {
          input.pattern = value;
        }
      });

      scope.$watch('dm.placeholder', function(value) {
        if (typeof value === 'string') {
          input.placeholder = value;
        }
      });
    }
  }
})();
