/**
 * Created by Rahul on 21/1/15.
 */

(function () {
  'use strict';
  angular.module('<%= name %>')
    /* @ngInject */
    .config(function ($stateProvider, $urlRouterProvider, $compileProvider) {

      $compileProvider.debugInfoEnabled(false);
      $urlRouterProvider.otherwise('home');

      $stateProvider
        .state('home', {
          url: '/home',
          controller: 'HomeCtrl as home',
          templateUrl: 'src/home/home.html'
        });

    });
}());
