/**
 * @ngdoc directive
 * @name app.components.directive:materialInput
 * @restrict E
 *
 * @description
 * action button support with four state:
 * - default
 * - loading
 * - error
 * - success
 * 
 * use `preloader-svg-wrapper animate-bounce` class for loading animation
 * in order of loadingState show some sessage, i.e.
 * - defaultMessage, when loadingState is `'loading'` of `true`
 * - errorMessage, when loadingState is `'error'`
 * - successMessage, when loadingState is `'success'`
 *
 * @param {string} defaultMessage default button message 
 * @param {string} [errorMessage="Error"] error message 
 * @param {string} [successMessage="Success!"] success message 
 * @param {(string|boolean)=} loadingState loading state 
 * @param {string} [loaderAnimation="three-dots.svg"] svg loader in 'images/svg-loaders/'
 *
 * @example
 *
   <example module="actionButtonExample">
     <file name="index.html">
       <div ng-controller="Controller as ctrl">
         <action-button 
           loading-state="ctrl.state" 
           default-message="doing nothing"
           ng-click="ctrl.wait()"></action-button>
       </div>
     </file>
     <file name="script.js">
       angular.module('actionButtonExample', ['app'])
         .controller('Controller', function() {
           dm = this;
           dm.state = false;
           dm.wait = function() {
             dm.state = 'loading';
             setTimeout(2000, function() {dm.state = 'success'});
           }
         });
     </file>
   </example>
 * 
 * @example
 *
   <example module="actionButtonExample">
     <file name="index.html">
       <div ng-controller="Controller as ctrl">
         <action-button 
           loading-state="ctrl.state" 
           default-message="doing nothing"
           ng-click="ctrl.wait()"></action-button>
       </div>
     </file>
     <file name="script.js">
       angular.module('actionButtonExample', ['app'])
         .controller('Controller', function() {
           this.state = false;
           this.wait = function() {
             this.state = 'loading';
             setTimeout(2000, function() {this.state = 'error'});
           }
         });
     </file>
   </example> 
 */
(function () {
  'use strict';

  angular
    .module('app.components')
    .directive('actionButton', actionButton);

  /* @ngInject */
  function actionButton() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/action-button/actionButton.html',
      scope: {},
      bindToController: {
        defaultMessage: '@',
        loadingState: '=',
        loaderAnimation: '@',
        errorMessage: '@',
        successMessage: '@',
      },
      controller: function() {},
      controllerAs: 'dm'
    };

    return directive;
  }
})();
