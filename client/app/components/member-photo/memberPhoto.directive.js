/**
 * @ngdoc directive
 * @name app.components.directive:materialInput
 * @restrict E
 *
 * @description
 * member photo 
 *
 * @param {string=} ngModel profile image
 * @param {string=} user user
 * @param {string=} loading loading status
 *
 * @example
 <example>
   <file name="index.html">
     <member-photo></member-photo>
   </file>
   <file name="script.js">
   </file>
 </example>
*/

(function () {
  'use strict';

  angular
    .module('app.components')
    .directive('memberPhoto', memberPhoto);

  /* @ngInject */
  function memberPhoto() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/memberPhoto.html',
      scope: {},
      bindToController: {
        profileImage: '=ngModel',
        user: '=',
        loading: '='
      },
      controller: Controller,
      controllerAs: 'dm'
    };

    return directive;
  }

  /* @ngInject */
  function Controller($scope, Upload, $http) {
    var dm = this;

    if(dm.user.profile && dm.user.profile.image) {
      dm.placeholder = dm.user.profile.image;
    } else {
      dm.placeholder = 'images/profile-upload-placeholder.png';
    }

    dm.validate = function(file) {
      console.log(file);

      var valid = true;

      //if file is over 1mb try and resize the photo
      if (file.size > 1048576) {
        if(!Upload.isResizeSupported()) {
          valid = false;
          PromiseLogger.errorDialog(
            'Cannot Compress Image',
            'Image filesize is too large to upload. Please resize and/or compress the image and try again.'
          );
        } else {
          dm.resizeFile(file);
        }
      }

      return valid;
    };

    dm.resizeFile = function(file) {
      Upload
        .resize(file, 300, 300, 0.8, 'image/jpeg')
        .then(function(resizedFile) {
          dm.profileImage = resizedFile;
        });
    };

  }
})();
