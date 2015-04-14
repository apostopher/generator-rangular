(function () {
  'use strict';
  angular
    .module('<%= name %>.common')
    .factory('localStoreService', localStoreService);

  localStoreService.$inject = ['$window'];

  /* @ngInject */
  function localStoreService($window) {
    var local = $window.localStorage;
    var session = $window.sessionStorage;

    // Security
    var getLSData = $window.localStorage.getItem;
    var getSSData = $window.sessionStorage.getItem;

    $window.localStorage.getItem = function (key) {
      if (key === 'token') {
        return;
      }
      return getLSData.call(local, key);
    };
    $window.sessionStorage.getItem = function (key) {
      if (key === 'token') {
        return;
      }
      return getSSData.call(session, key);
    };
    // API
    return {
      set: set,
      get: get,
      remove: remove
    };

    //Implementation ---

    function set(key, value, isSession) {
      if (isSession) {
        session.setItem(key, value);
      } else {
        local.setItem(key, value);
      }
      return get(key, isSession);
    }

    function get(key, isSession) {
      if (isSession) {
        return getSSData.call(session, key);
      } else {
        return getLSData.call(local, key);
      }
    }

    function remove(key, isSession) {
      if (isSession) {
        return session.removeItem(key);
      } else {
        return local.removeItem(key);
      }
    }
  }
}());
