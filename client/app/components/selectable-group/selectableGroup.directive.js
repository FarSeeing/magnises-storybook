/**
 * @ngdoc directive
 * @name app.components.directive:selectableGroup
 * @restrict E
 *
 * @description
 *
 * group of selectable elements
 *
 * @param {object=} options group options
 * @param {object[]} options.values `selectable`'s options
 * @param {string} options.mainLable label of selectable group
 * @param {string} options.values.label displayed selectable label, in case of falsy `options.values.value` used
 * @param {string} options.values.value selectable value
 * @param {string=} ngModel ???
 *
 * @example
 *
 <example>
   <file name="index.html">
     <selectable-group
       options="
       {
         values: [
           { label: "with label", value: "option with label" },
           { value: "wihtout label" },
           { value: "addition wihtou label" }
         ],
         mainLable: "label for group"
       }"
       ng-model=""
     >
     </selectable-group>
   </file>
 </example>
 *
 */
(function () {
  'use strict';

  angular
    .module('app.components')
    .directive('selectableGroup', selectableGroup);

  /* @ngInject */
  function selectableGroup() {
    var directive = {
      restrict: 'E',
      transclude: true,
      templateUrl: 'app/components/selectableGroup.html',
      scope: {},
      bindToController: {
        options: '=',
        selected: '=ngModel'
      },
      controller: Controller,
      controllerAs: 'sm'
    };

    return directive;

  }

  /* @ngInject */
  function Controller($scope){
    var sm = this;

    sm.monoSelect = monoSelect;
    setOptions(sm.options);

    $scope.$watch('sm.selected', function watchOptions(data, old) {
      if (data && !findSelection(data)) {
        selectInitial(data);
        selectOther(data);
      } else if (!data) {
        clearSelection();
      }
    });

    function setOptions(options) {
      if (options.initial) {
        selectInitial(options.initial);
      }

      sm.optionLength = 's' + (options.values.length > 0 ? parseInt(12/options.values.length) : 12);
    }

    function findSelection(data) {
      for (var i = 0; i < sm.options.values.length; i++) {
        if (data.toLowerCase() === sm.options.values[i].value.toLowerCase() && sm.options.values[i].checked)
          return true;
      }

      return false;
    }

    function monoSelect() {
      var found = false;

      for (i = 0; i < sm.options.values.length; i++) {
        if (sm.selected.toLowerCase() === sm.options.values[i].value.toLowerCase())
          found = true;
      }

      for (var i = 0; i < sm.options.values.length; i++) {
        if (sm.options.values[i].checked && sm.selected !== sm.options.values[i].value && found)
          sm.options.values[i].checked = false;
      }
    }

    function selectOther(value) {
      var found = false;
      var i;

      if (!value) return found;

      for (i = 0; i < sm.options.values.length; i++) {
        if(value.toLowerCase() === sm.options.values[i].value.toLowerCase())
          found = true;
      }

      if(!found) {
        for (i = 0; i < sm.options.values.length; i++) {
          if (sm.options.values[i].other)
            sm.options.values[i].checked = true;
        }
      }
    }

    function selectInitial(value) {
      sm.selected = value;
      for (var i = 0; i < sm.options.values.length; i++) {
        if(value.toLowerCase() === sm.options.values[i].value.toLowerCase())
          sm.options.values[i].checked = true;
      }
    }

    function clearSelection() {
      for (var i = 0; i < sm.options.values.length; i++) {
        sm.options.values[i].checked = false;
      }
    }
  }
})();
