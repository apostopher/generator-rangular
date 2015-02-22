/**
 * Created by Rahul on 18/2/15.
 */

(function () {
  'use strict';
  angular
    .module('<%= name %>.common')
    .directive('progressIndicator', progressIndicatorDirective);

  progressIndicatorDirective.$inject = ['$window', 'requestCounterInterceptor'];

  /* @ngInject */
  function progressIndicatorDirective($window, requestCounter) {
    return function (scope) {
      scope.$watch(requestCounter.getRequestCount, showProgress);
    };

    //Implementation ---
    function showProgress(newValue, oldValue) {
      if (oldValue === 0 && newValue > 0) {
        $window.NProgress.start();
      } else if (oldValue > 0 && newValue > 0) {
        $window.NProgress.inc();
      } else if (newValue === 0) {
        $window.NProgress.done();
      }
    }
  }
}());
