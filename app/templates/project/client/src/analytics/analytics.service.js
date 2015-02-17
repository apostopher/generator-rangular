/**
 * Created by Rahul on 14/2/15.
 */

(function () {
  'use strict';

  angular
    .module('<%= name %>.analytics')
    .factory('analyticsService', analyticsService);

  analyticsService.$inject = ['$rootScope', '$window', '$location'];

  /* @ngInject */
  function analyticsService($rootScope, $window, $location) {
    var ga = angular.isFunction($window.ga) ? $window.ga : angular.noop;
    return {
      trackPageViews: trackPageViews,
      trackEvent: trackEvent,
      ga: ga
    };

    //Implementation ---

    function trackPageViews() {
      $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState) {
        trackEvent('state', 'change', fromState + ' => ' + toState);
        ga('set', 'page', $location.path());
        ga('send', 'pageview');
      });
    }

    function trackEvent(category, action, label) {
      var options = {
        eventCategory: category,
        eventAction: action,
        eventLabel: label,
        useBeacon: true
      };
      ga('send', 'event', options);
    }
  }
}());
