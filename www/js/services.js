angular.module('starter.services', [])

.factory('Settings', function($localstorage) {
  
  var settings = {
    warmup: $localstorage.get('warmup', 15),
    rest: $localstorage.get('rest', 1),
    run: $localstorage.get('run', 2),
    iterations: $localstorage.get('iterations', 3)
  };

  return {
    all: function() {
      return settings;
    }
  };
})

.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
}]);
