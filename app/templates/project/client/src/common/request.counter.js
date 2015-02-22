/**
 * Created by Rahul on 18/2/15.
 */

(function () {
  'use strict';
  angular
    .module('<%= name %>.common')
    .factory('requestCounterInterceptor', requestCounterInterceptor);

  requestCounterInterceptor.$inject = ['$q'];

  /* @ngInject */
  function requestCounterInterceptor($q) {
    var requests = 0;
    return {
      request: request,
      requestError: handleError,
      response: response,
      responseError: handleError,
      getRequestCount: getRequestCount
    };

    //Implementation ---
    function getRequestCount() {
      return requests;
    }

    function request(config) {
      requests += 1;
      return config;
    }

    function handleError(error) {
      if (requests > 0) {
        requests -= 1;
      }
      return $q.reject(error);
    }

    function response(resp) {
      if (requests > 0) {
        requests -= 1;
      }
      return resp;
    }

  }
}());
