/**
 * Created by Rahul on 21/1/15.
 */

(function () {
  'use strict';
  angular.module('<%= name %>')
    /* @ngInject */
    .run(function (analyticsService) {
      analyticsService.trackPageViews();
    });
}());
