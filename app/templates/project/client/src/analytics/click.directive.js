/**
 * Created by Rahul on 14/2/15.
 */

(function () {
  'use strict';
  angular
    .module('<%= name %>.analytics')
    .directive('gaClick', gaClickDirective);

  gaClickDirective.$inject = ['analyticsService'];

  /* @ngInject */
  function gaClickDirective(analyticsService) {
    return {
      scope: {
        gaClick: '@'
      },
      link: function (scope, element) {
        element.on('click', reportClickEvent);

        //Implementation ---
        function reportClickEvent() {
          var label = scope.gaClick;
          analyticsService.trackEvent('element', 'click', label);

        }
      }
    };
  }
}());
