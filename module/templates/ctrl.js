(function () {
  'use strict';
  angular
    .module('<%= module %>.<%= name %>')
    .controller('<%= Name %>Ctrl', <%= Name %>Ctrl);

  <%= Name %>Ctrl.$inject = [];

  /* @ngInject */
  function <%= Name %>Ctrl() {
    var vm = this;

  }
}());
