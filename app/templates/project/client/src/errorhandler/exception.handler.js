/**
 * Created by Rahul on 18/2/15.
 */

(function () {
  'use strict';
  angular
    .module('<%= name %>.error.handler')
    /* @ngInject */
    .config(function ($provide) {
      /* @ngInject */
      $provide.decorator('$exceptionHandler', function exceptionDecorator($delegate, $injector) {
        return function (exception, cause) {
          $delegate(exception, cause);
          var reportService = $injector.get('errorReportService');
          var message = exception.message + ' (caused by "' + cause + '")';
          reportService.logError('danger', message);
        };
      });
    });
}());
