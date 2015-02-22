/**
 * Created by Rahul on 18/2/15.
 */

(function () {
  'use strict';
  angular
    .module('<%= name %>.error.handler')
    .constant('HIDE_AFTER', 5000)
    .factory('errorReportService', errorReportService);

  errorReportService.$inject = ['$timeout', 'HIDE_AFTER'];

  /* @ngInject */
  function errorReportService($timeout, HIDE_AFTER) {
    var errors = [];
    return {
      logError: logError,
      removeError: removeError,
      errors: errors
    };

    //Implementation ---
    function removeError(error) {
      for (var index = 0, len = errors.length; index < len; index += 1) {
        if (errors[index] === error) {
          errors.splice(index, 1);
          break;
        }
      }
    }

    function logError(type, msg) {
      var error = {type: type, msg: msg};
      errors.push(error);
      $timeout(function () {
        removeError(error);
      }, HIDE_AFTER);
    }
  }
}());
