
(function() {

var appConfig = {
  "Environment": "development"
}

if(window.config) appConfig = window.config;

angular
    .module('app', [
        'ui.router',
        'ui.bootstrap',
        'duScroll',
        'uiGmapgoogle-maps',
        'pikaday',
        'ngAnimate',
        'angulartics',
        'angulartics.mixpanel',
        'angulartics.google.analytics',
        'ng-fastclick',
        'ngFileUpload',
        'ngLodash'
    ])
    .constant("Environment", appConfig.Environment)
    .run(["$rootScope", "$uibModal", "$state", "Analytics", function ($rootScope, $uibModal, $state, Analytics) {

    }]);
})();

(function() {

angular.module('app')
.service('Analytics', ["$window", "$rootScope", "Environment", "$analytics", function ($window, $rootScope, Environment, $analytics) {
  var isProduction = Environment==='production';
  var isStaging = Environment==='staging';
  var isValid = isProduction || isStaging ? true : false;

  return {
    pageTrack: function(url){
      if(isValid){
        $analytics.pageTrack(url);
      }
    },
    eventTrack: function(eventName, options){
      if(isValid){
        if(isStaging) eventName = eventName + " (Staging)";
        $analytics.eventTrack(eventName, options);
      }
    },
    setUsername: function(email){
      if(isValid){
        $analytics.setUsername(email);
      }
    },
    alias: function(email){
      if(isValid){
        var distinctId = $window.mixpanel.get_distinct_id();
        $window.mixpanel.alias(distinctId, email);
        setTimeout(function(){
          $analytics.setUsername(email);
        }, 2000);
      }
    }
  };;
}]);

})();

(function() {

angular.module('app')
.service('Browser', ["$window", function ($window) {
  return function() {

      var userAgent = $window.navigator.userAgent;
      var browsers = {chrome: /chrome/i, safari: /safari/i, firefox: /firefox/i, ie: /internet explorer/i};

      for(var key in browsers) {
        if (browsers[key].test(userAgent)) {
          return key;
        }
     };

     return 'unknown';
  }
}]);

})();

(function() {
angular.module('app')
.factory('Moment', ["$window", function ($window) {
    return $window.moment;
}]);
})();

(function() {

angular.module('app').controller('HomeCtrl', ["$scope", "lodash", function($scope,lodash) {
  $scope.map = {
      center: {
          longitude: 100.585434,
          latitude: 13.72519
      },
      options: {
        draggable: false,
        maxZoom: 15,
        minZoom: 15,
        clickableIcons: false
      }
  };

}]);

})();

(function() {
  angular.module('app').config(["$stateProvider", "$urlRouterProvider", "$analyticsProvider", function ($stateProvider, $urlRouterProvider, $analyticsProvider) {
    $analyticsProvider.withAutoBase(true);
    $urlRouterProvider.otherwise('/');
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'public/components/home/templates/home.html',
        data: {
            auth: false
        }
    });
}]);

})();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZS5qcyIsInNlcnZpY2VzL2FuYWx5dGljc1NlcnZpY2UuanMiLCJzZXJ2aWNlcy9icm93c2VyU2VydmljZS5qcyIsInNlcnZpY2VzL21vbWVudFNlcnZpY2UuanMiLCJob21lL2NvbnRyb2xsZXJzL2hvbWVDb250cm9sbGVyLmpzIiwiaG9tZS9jb25maWcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQSxDQUFBLFdBQUE7O0FBRUEsSUFBQSxZQUFBO0VBQ0EsZUFBQTs7O0FBR0EsR0FBQSxPQUFBLFFBQUEsWUFBQSxPQUFBOztBQUVBO0tBQ0EsT0FBQSxPQUFBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztLQUVBLFNBQUEsZUFBQSxVQUFBO0tBQ0EsdURBQUEsVUFBQSxZQUFBLFdBQUEsUUFBQSxXQUFBOzs7OztBQ3pCQSxDQUFBLFdBQUE7O0FBRUEsUUFBQSxPQUFBO0NBQ0EsUUFBQSxvRUFBQSxVQUFBLFNBQUEsWUFBQSxhQUFBLFlBQUE7RUFDQSxJQUFBLGVBQUEsY0FBQTtFQUNBLElBQUEsWUFBQSxjQUFBO0VBQ0EsSUFBQSxVQUFBLGdCQUFBLFlBQUEsT0FBQTs7RUFFQSxPQUFBO0lBQ0EsV0FBQSxTQUFBLElBQUE7TUFDQSxHQUFBLFFBQUE7UUFDQSxXQUFBLFVBQUE7OztJQUdBLFlBQUEsU0FBQSxXQUFBLFFBQUE7TUFDQSxHQUFBLFFBQUE7UUFDQSxHQUFBLFdBQUEsWUFBQSxZQUFBO1FBQ0EsV0FBQSxXQUFBLFdBQUE7OztJQUdBLGFBQUEsU0FBQSxNQUFBO01BQ0EsR0FBQSxRQUFBO1FBQ0EsV0FBQSxZQUFBOzs7SUFHQSxPQUFBLFNBQUEsTUFBQTtNQUNBLEdBQUEsUUFBQTtRQUNBLElBQUEsYUFBQSxRQUFBLFNBQUE7UUFDQSxRQUFBLFNBQUEsTUFBQSxZQUFBO1FBQ0EsV0FBQSxVQUFBO1VBQ0EsV0FBQSxZQUFBO1dBQ0E7OztJQUdBOzs7OztBQ2xDQSxDQUFBLFdBQUE7O0FBRUEsUUFBQSxPQUFBO0NBQ0EsUUFBQSx1QkFBQSxVQUFBLFNBQUE7RUFDQSxPQUFBLFdBQUE7O01BRUEsSUFBQSxZQUFBLFFBQUEsVUFBQTtNQUNBLElBQUEsV0FBQSxDQUFBLFFBQUEsV0FBQSxRQUFBLFdBQUEsU0FBQSxZQUFBLElBQUE7O01BRUEsSUFBQSxJQUFBLE9BQUEsVUFBQTtRQUNBLElBQUEsU0FBQSxLQUFBLEtBQUEsWUFBQTtVQUNBLE9BQUE7O01BRUE7O0tBRUEsT0FBQTs7Ozs7O0FDZkEsQ0FBQSxXQUFBO0FBQ0EsUUFBQSxPQUFBO0NBQ0EsUUFBQSxzQkFBQSxVQUFBLFNBQUE7SUFDQSxPQUFBLFFBQUE7Ozs7QUNIQSxDQUFBLFdBQUE7O0FBRUEsUUFBQSxPQUFBLE9BQUEsV0FBQSxpQ0FBQSxTQUFBLE9BQUEsUUFBQTtFQUNBLE9BQUEsTUFBQTtNQUNBLFFBQUE7VUFDQSxXQUFBO1VBQ0EsVUFBQTs7TUFFQSxTQUFBO1FBQ0EsV0FBQTtRQUNBLFNBQUE7UUFDQSxTQUFBO1FBQ0EsZ0JBQUE7Ozs7Ozs7O0FDWkEsQ0FBQSxXQUFBO0VBQ0EsUUFBQSxPQUFBLE9BQUEsc0VBQUEsVUFBQSxnQkFBQSxvQkFBQSxvQkFBQTtJQUNBLG1CQUFBLGFBQUE7SUFDQSxtQkFBQSxVQUFBO0lBQ0EsZUFBQSxNQUFBLFFBQUE7UUFDQSxLQUFBO1FBQ0EsYUFBQTtRQUNBLE1BQUE7WUFDQSxNQUFBOzs7Ozs7QUFNQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbihmdW5jdGlvbigpIHtcblxudmFyIGFwcENvbmZpZyA9IHtcbiAgXCJFbnZpcm9ubWVudFwiOiBcImRldmVsb3BtZW50XCJcbn1cblxuaWYod2luZG93LmNvbmZpZykgYXBwQ29uZmlnID0gd2luZG93LmNvbmZpZztcblxuYW5ndWxhclxuICAgIC5tb2R1bGUoJ2FwcCcsIFtcbiAgICAgICAgJ3VpLnJvdXRlcicsXG4gICAgICAgICd1aS5ib290c3RyYXAnLFxuICAgICAgICAnZHVTY3JvbGwnLFxuICAgICAgICAndWlHbWFwZ29vZ2xlLW1hcHMnLFxuICAgICAgICAncGlrYWRheScsXG4gICAgICAgICduZ0FuaW1hdGUnLFxuICAgICAgICAnYW5ndWxhcnRpY3MnLFxuICAgICAgICAnYW5ndWxhcnRpY3MubWl4cGFuZWwnLFxuICAgICAgICAnYW5ndWxhcnRpY3MuZ29vZ2xlLmFuYWx5dGljcycsXG4gICAgICAgICduZy1mYXN0Y2xpY2snLFxuICAgICAgICAnbmdGaWxlVXBsb2FkJyxcbiAgICAgICAgJ25nTG9kYXNoJ1xuICAgIF0pXG4gICAgLmNvbnN0YW50KFwiRW52aXJvbm1lbnRcIiwgYXBwQ29uZmlnLkVudmlyb25tZW50KVxuICAgIC5ydW4oZnVuY3Rpb24gKCRyb290U2NvcGUsICR1aWJNb2RhbCwgJHN0YXRlLCBBbmFseXRpY3MpIHtcblxuICAgIH0pO1xufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcblxuYW5ndWxhci5tb2R1bGUoJ2FwcCcpXG4uc2VydmljZSgnQW5hbHl0aWNzJywgZnVuY3Rpb24gKCR3aW5kb3csICRyb290U2NvcGUsIEVudmlyb25tZW50LCAkYW5hbHl0aWNzKSB7XG4gIHZhciBpc1Byb2R1Y3Rpb24gPSBFbnZpcm9ubWVudD09PSdwcm9kdWN0aW9uJztcbiAgdmFyIGlzU3RhZ2luZyA9IEVudmlyb25tZW50PT09J3N0YWdpbmcnO1xuICB2YXIgaXNWYWxpZCA9IGlzUHJvZHVjdGlvbiB8fCBpc1N0YWdpbmcgPyB0cnVlIDogZmFsc2U7XG5cbiAgcmV0dXJuIHtcbiAgICBwYWdlVHJhY2s6IGZ1bmN0aW9uKHVybCl7XG4gICAgICBpZihpc1ZhbGlkKXtcbiAgICAgICAgJGFuYWx5dGljcy5wYWdlVHJhY2sodXJsKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGV2ZW50VHJhY2s6IGZ1bmN0aW9uKGV2ZW50TmFtZSwgb3B0aW9ucyl7XG4gICAgICBpZihpc1ZhbGlkKXtcbiAgICAgICAgaWYoaXNTdGFnaW5nKSBldmVudE5hbWUgPSBldmVudE5hbWUgKyBcIiAoU3RhZ2luZylcIjtcbiAgICAgICAgJGFuYWx5dGljcy5ldmVudFRyYWNrKGV2ZW50TmFtZSwgb3B0aW9ucyk7XG4gICAgICB9XG4gICAgfSxcbiAgICBzZXRVc2VybmFtZTogZnVuY3Rpb24oZW1haWwpe1xuICAgICAgaWYoaXNWYWxpZCl7XG4gICAgICAgICRhbmFseXRpY3Muc2V0VXNlcm5hbWUoZW1haWwpO1xuICAgICAgfVxuICAgIH0sXG4gICAgYWxpYXM6IGZ1bmN0aW9uKGVtYWlsKXtcbiAgICAgIGlmKGlzVmFsaWQpe1xuICAgICAgICB2YXIgZGlzdGluY3RJZCA9ICR3aW5kb3cubWl4cGFuZWwuZ2V0X2Rpc3RpbmN0X2lkKCk7XG4gICAgICAgICR3aW5kb3cubWl4cGFuZWwuYWxpYXMoZGlzdGluY3RJZCwgZW1haWwpO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgJGFuYWx5dGljcy5zZXRVc2VybmFtZShlbWFpbCk7XG4gICAgICAgIH0sIDIwMDApO1xuICAgICAgfVxuICAgIH1cbiAgfTs7XG59KTtcblxufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcblxuYW5ndWxhci5tb2R1bGUoJ2FwcCcpXG4uc2VydmljZSgnQnJvd3NlcicsIGZ1bmN0aW9uICgkd2luZG93KSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcblxuICAgICAgdmFyIHVzZXJBZ2VudCA9ICR3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudDtcbiAgICAgIHZhciBicm93c2VycyA9IHtjaHJvbWU6IC9jaHJvbWUvaSwgc2FmYXJpOiAvc2FmYXJpL2ksIGZpcmVmb3g6IC9maXJlZm94L2ksIGllOiAvaW50ZXJuZXQgZXhwbG9yZXIvaX07XG5cbiAgICAgIGZvcih2YXIga2V5IGluIGJyb3dzZXJzKSB7XG4gICAgICAgIGlmIChicm93c2Vyc1trZXldLnRlc3QodXNlckFnZW50KSkge1xuICAgICAgICAgIHJldHVybiBrZXk7XG4gICAgICAgIH1cbiAgICAgfTtcblxuICAgICByZXR1cm4gJ3Vua25vd24nO1xuICB9XG59KTtcblxufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbmFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuLmZhY3RvcnkoJ01vbWVudCcsIGZ1bmN0aW9uICgkd2luZG93KSB7XG4gICAgcmV0dXJuICR3aW5kb3cubW9tZW50O1xufSk7XG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuXG5hbmd1bGFyLm1vZHVsZSgnYXBwJykuY29udHJvbGxlcignSG9tZUN0cmwnLCBmdW5jdGlvbigkc2NvcGUsbG9kYXNoKSB7XG4gICRzY29wZS5tYXAgPSB7XG4gICAgICBjZW50ZXI6IHtcbiAgICAgICAgICBsb25naXR1ZGU6IDEwMC41ODU0MzQsXG4gICAgICAgICAgbGF0aXR1ZGU6IDEzLjcyNTE5XG4gICAgICB9LFxuICAgICAgb3B0aW9uczoge1xuICAgICAgICBkcmFnZ2FibGU6IGZhbHNlLFxuICAgICAgICBtYXhab29tOiAxNSxcbiAgICAgICAgbWluWm9vbTogMTUsXG4gICAgICAgIGNsaWNrYWJsZUljb25zOiBmYWxzZVxuICAgICAgfVxuICB9O1xuXG59KTtcblxufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgYW5ndWxhci5tb2R1bGUoJ2FwcCcpLmNvbmZpZyhmdW5jdGlvbiAoJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlciwgJGFuYWx5dGljc1Byb3ZpZGVyKSB7XG4gICAgJGFuYWx5dGljc1Byb3ZpZGVyLndpdGhBdXRvQmFzZSh0cnVlKTtcbiAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvJyk7XG4gICAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2hvbWUnLCB7XG4gICAgICAgIHVybDogJy8nLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ3B1YmxpYy9jb21wb25lbnRzL2hvbWUvdGVtcGxhdGVzL2hvbWUuaHRtbCcsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIGF1dGg6IGZhbHNlXG4gICAgICAgIH1cbiAgICB9KTtcbn0pO1xuXG59KSgpO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9