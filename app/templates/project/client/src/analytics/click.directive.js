/**
 * Created by Rahul on 14/2/15.
 */

(function () {
  'use strict';
  angular
    .module('authapp.analytics')
    .directive('gaClick', gaClickDirective);

  gaClickDirective.$inject = ['analyticsService'];

  /* @ngInject */
  function gaClickDirective(analyticsService) {
    return {
      scope: {
        gaClick: '='
      },
      link: function (scope, element) {
        element.on('click', reportClickEvent);

        //Implementation ---
        function reportClickEvent() {
          var data = scope.gaClick;
          if(angular.isObject(data)){
            analyticsService.trackEvent('element', 'click', data.label, data.value);
          }else{
            analyticsService.trackEvent('element', 'click', data);
          }
        }
      }
    };
  }
}());