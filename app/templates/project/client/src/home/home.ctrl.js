/**
 * Created by Rahul on 21/1/15.
 */

(function () {
  'use strict';
  angular
    .module('<%= name %>.home')
    .controller('HomeCtrl', HomeCtrl);

  HomeCtrl.$inject = [];

  /* @ngInject */
  function HomeCtrl() {
    var vm = this;
    vm.sweet = 'Home! Sweet Home!';
  }
}());