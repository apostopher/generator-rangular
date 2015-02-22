/**
 * Created by Rahul on 20/2/15.
 */

(function () {
  'use strict';
  describe('home controller', function () {
    var createCtrl;
    var scope;
    beforeEach(module('<%= name %>'));
    beforeEach(inject(function ($controller, $rootScope) {
      createCtrl = $controller;
      scope = $rootScope.$new();
    }));
    it('should display a sweet message!', function () {
      var ctrl = createCtrl('HomeCtrl', {$scope: scope});
      expect(ctrl.sweet).to.equal('Home! Sweet Home!');
    });
  });

}());
