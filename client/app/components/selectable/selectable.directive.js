/**
 * @ngdoc directive
 * @name app.componnets.directive:selectable
 * @restrict E
 *
 * @description
 * 
 * each time on click starts `toggleSelect()` script, it will make 
 * `select` value be equated to `value` value
 *
 * @param {string=} value passed to `select` on click
 * @param {string=} selected current selected value
 * @param {boolean=} checked check flag
 * @param {string=} other does not use anywhere
 *
 * @example
 *
 <example>
   <file name="index.html">
     <b> value: </b>
     <input ng-bind="val"></input>
     <b> selected: </b>
     <p> {{val}} </p>
     <selectable
       value="val"
     >
     </selectable>
   </file>
 </example>
 *
 */
(function () {
  'use strict';

  angular
    .module('app.components')
    .directive('selectable', selectable);

  /* @ngInject */
  function selectable() {
    var directive = {
      restrict: 'E',
      transclude: true,
      templateUrl: 'app/components/selectable/selectable.html',
      scope: {},
      bindToController: {
        value: '=',
        selected: '=',
        checked: '=',
        other: '='
      },
      controller: Controller,
      controllerAs: 'dm'
    };

    return directive;
  }

  /* @ngInject */
  function Controller($scope){
    var dm = this;

    dm.checked = dm.checked || false;
    dm.toggleSelect = toggleSelect;

    function toggleSelect() {

      if(dm.selected === dm.value) {
        if (!dm.checked) {
          dm.checked = !dm.checked;
        }
      } else {
        dm.checked = !dm.checked;
      }

      if (dm.checked) {
        dm.selected = dm.value;
      }
    }

    $scope.$watch('dm.checked', toggleColor);

    function toggleColor() {
      dm.color = dm.checked ? 'primary-action' : 'grey-text';
    }
  }
})();
