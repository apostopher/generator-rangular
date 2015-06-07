(function () {
  'use strict';
  angular
    .module('<%= name %>.navbar')
    .controller('NavbarCtrl', NavbarCtrl);

  NavbarCtrl.$inject = [];

  /* @ngInject */
  function NavbarCtrl() {
    var vm = this;
    vm.appName = '<%= name %>';
  }
}());
