/**
 * Created by Rahul on 21/1/15.
 */

(function () {
  'use strict';
  angular.module('<%= name %>')
    /* @ngInject */
    .config(function ($stateProvider, $urlRouterProvider, $compileProvider) {

      $compileProvider.debugInfoEnabled(false);
      $urlRouterProvider.otherwise('app.home');

      $stateProvider
        .state('app', {
          abstract: true,
          views: {
            navbar: {
              controller: 'NavbarCtrl as nav',
              templateUrl: 'src/navbar/navbar.html'
            },
            content: {
              template: '<div ui-view></div>'
            }
          }
        })
        .state('app.home', {
          url: '/home',
          controller: 'HomeCtrl as home',
          templateUrl: 'src/home/home.html'
        });

    });
}());
