/**
 * Created by Rahul on 21/1/15.
 */

(function () {
  'use strict';
  angular
    .module('<%= name %>', [
      '<%= name %>.core',
      '<%= name %>.common',
      '<%= name %>.analytics',
      '<%= name %>.navbar',
      '<%= name %>.home'
    ]);
}());
