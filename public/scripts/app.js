
(function() {

var appConfig = {
  "API": "https://localhost:7777/api/v1",
  "imageServer": "https://s3-ap-southeast-1.amazonaws.com/findmynode-dev",
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
    .constant("API", appConfig.API)
    .constant("imageServer", appConfig.imageServer)
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

angular.module('app').controller('HomeCtrl', ["$scope", "$uibModal", "Auth", "$state", "$filter", "$rootScope", "Browser", "Analytics", "lodash", function($scope, $uibModal, Auth, $state, $filter, $rootScope, Browser, Analytics, lodash) {

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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZS5qcyIsInNlcnZpY2VzL2FuYWx5dGljc1NlcnZpY2UuanMiLCJzZXJ2aWNlcy9icm93c2VyU2VydmljZS5qcyIsInNlcnZpY2VzL21vbWVudFNlcnZpY2UuanMiLCJob21lL2NvbnRyb2xsZXJzL2hvbWVDb250cm9sbGVyLmpzIiwiaG9tZS9jb25maWcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQSxDQUFBLFdBQUE7O0FBRUEsSUFBQSxZQUFBO0VBQ0EsT0FBQTtFQUNBLGVBQUE7RUFDQSxlQUFBOzs7QUFHQSxHQUFBLE9BQUEsUUFBQSxZQUFBLE9BQUE7O0FBRUE7S0FDQSxPQUFBLE9BQUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O0tBRUEsU0FBQSxlQUFBLFVBQUE7S0FDQSxTQUFBLE9BQUEsVUFBQTtLQUNBLFNBQUEsZUFBQSxVQUFBO0tBQ0EsdURBQUEsVUFBQSxZQUFBLFdBQUEsUUFBQSxXQUFBOzs7OztBQzdCQSxDQUFBLFdBQUE7O0FBRUEsUUFBQSxPQUFBO0NBQ0EsUUFBQSxvRUFBQSxVQUFBLFNBQUEsWUFBQSxhQUFBLFlBQUE7RUFDQSxJQUFBLGVBQUEsY0FBQTtFQUNBLElBQUEsWUFBQSxjQUFBO0VBQ0EsSUFBQSxVQUFBLGdCQUFBLFlBQUEsT0FBQTs7RUFFQSxPQUFBO0lBQ0EsV0FBQSxTQUFBLElBQUE7TUFDQSxHQUFBLFFBQUE7UUFDQSxXQUFBLFVBQUE7OztJQUdBLFlBQUEsU0FBQSxXQUFBLFFBQUE7TUFDQSxHQUFBLFFBQUE7UUFDQSxHQUFBLFdBQUEsWUFBQSxZQUFBO1FBQ0EsV0FBQSxXQUFBLFdBQUE7OztJQUdBLGFBQUEsU0FBQSxNQUFBO01BQ0EsR0FBQSxRQUFBO1FBQ0EsV0FBQSxZQUFBOzs7SUFHQSxPQUFBLFNBQUEsTUFBQTtNQUNBLEdBQUEsUUFBQTtRQUNBLElBQUEsYUFBQSxRQUFBLFNBQUE7UUFDQSxRQUFBLFNBQUEsTUFBQSxZQUFBO1FBQ0EsV0FBQSxVQUFBO1VBQ0EsV0FBQSxZQUFBO1dBQ0E7OztJQUdBOzs7OztBQ2xDQSxDQUFBLFdBQUE7O0FBRUEsUUFBQSxPQUFBO0NBQ0EsUUFBQSx1QkFBQSxVQUFBLFNBQUE7RUFDQSxPQUFBLFdBQUE7O01BRUEsSUFBQSxZQUFBLFFBQUEsVUFBQTtNQUNBLElBQUEsV0FBQSxDQUFBLFFBQUEsV0FBQSxRQUFBLFdBQUEsU0FBQSxZQUFBLElBQUE7O01BRUEsSUFBQSxJQUFBLE9BQUEsVUFBQTtRQUNBLElBQUEsU0FBQSxLQUFBLEtBQUEsWUFBQTtVQUNBLE9BQUE7O01BRUE7O0tBRUEsT0FBQTs7Ozs7O0FDZkEsQ0FBQSxXQUFBO0FBQ0EsUUFBQSxPQUFBO0NBQ0EsUUFBQSxzQkFBQSxVQUFBLFNBQUE7SUFDQSxPQUFBLFFBQUE7Ozs7QUNIQSxDQUFBLFdBQUE7O0FBRUEsUUFBQSxPQUFBLE9BQUEsV0FBQSxpSEFBQSxTQUFBLFFBQUEsV0FBQSxNQUFBLFFBQUEsU0FBQSxZQUFBLFNBQUEsV0FBQSxRQUFBOzs7Ozs7QUNGQSxDQUFBLFdBQUE7RUFDQSxRQUFBLE9BQUEsT0FBQSxzRUFBQSxVQUFBLGdCQUFBLG9CQUFBLG9CQUFBO0lBQ0EsbUJBQUEsYUFBQTtJQUNBLG1CQUFBLFVBQUE7SUFDQSxlQUFBLE1BQUEsUUFBQTtRQUNBLEtBQUE7UUFDQSxhQUFBO1FBQ0EsTUFBQTtZQUNBLE1BQUE7Ozs7OztBQU1BIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuKGZ1bmN0aW9uKCkge1xuXG52YXIgYXBwQ29uZmlnID0ge1xuICBcIkFQSVwiOiBcImh0dHBzOi8vbG9jYWxob3N0Ojc3NzcvYXBpL3YxXCIsXG4gIFwiaW1hZ2VTZXJ2ZXJcIjogXCJodHRwczovL3MzLWFwLXNvdXRoZWFzdC0xLmFtYXpvbmF3cy5jb20vZmluZG15bm9kZS1kZXZcIixcbiAgXCJFbnZpcm9ubWVudFwiOiBcImRldmVsb3BtZW50XCJcbn1cblxuaWYod2luZG93LmNvbmZpZykgYXBwQ29uZmlnID0gd2luZG93LmNvbmZpZztcblxuYW5ndWxhclxuICAgIC5tb2R1bGUoJ2FwcCcsIFtcbiAgICAgICAgJ3VpLnJvdXRlcicsXG4gICAgICAgICd1aS5ib290c3RyYXAnLFxuICAgICAgICAnZHVTY3JvbGwnLFxuICAgICAgICAndWlHbWFwZ29vZ2xlLW1hcHMnLFxuICAgICAgICAncGlrYWRheScsXG4gICAgICAgICduZ0FuaW1hdGUnLFxuICAgICAgICAnYW5ndWxhcnRpY3MnLFxuICAgICAgICAnYW5ndWxhcnRpY3MubWl4cGFuZWwnLFxuICAgICAgICAnYW5ndWxhcnRpY3MuZ29vZ2xlLmFuYWx5dGljcycsXG4gICAgICAgICduZy1mYXN0Y2xpY2snLFxuICAgICAgICAnbmdGaWxlVXBsb2FkJyxcbiAgICAgICAgJ25nTG9kYXNoJ1xuICAgIF0pXG4gICAgLmNvbnN0YW50KFwiRW52aXJvbm1lbnRcIiwgYXBwQ29uZmlnLkVudmlyb25tZW50KVxuICAgIC5jb25zdGFudChcIkFQSVwiLCBhcHBDb25maWcuQVBJKVxuICAgIC5jb25zdGFudChcImltYWdlU2VydmVyXCIsIGFwcENvbmZpZy5pbWFnZVNlcnZlcilcbiAgICAucnVuKGZ1bmN0aW9uICgkcm9vdFNjb3BlLCAkdWliTW9kYWwsICRzdGF0ZSwgQW5hbHl0aWNzKSB7XG5cbiAgICB9KTtcbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG5cbmFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuLnNlcnZpY2UoJ0FuYWx5dGljcycsIGZ1bmN0aW9uICgkd2luZG93LCAkcm9vdFNjb3BlLCBFbnZpcm9ubWVudCwgJGFuYWx5dGljcykge1xuICB2YXIgaXNQcm9kdWN0aW9uID0gRW52aXJvbm1lbnQ9PT0ncHJvZHVjdGlvbic7XG4gIHZhciBpc1N0YWdpbmcgPSBFbnZpcm9ubWVudD09PSdzdGFnaW5nJztcbiAgdmFyIGlzVmFsaWQgPSBpc1Byb2R1Y3Rpb24gfHwgaXNTdGFnaW5nID8gdHJ1ZSA6IGZhbHNlO1xuXG4gIHJldHVybiB7XG4gICAgcGFnZVRyYWNrOiBmdW5jdGlvbih1cmwpe1xuICAgICAgaWYoaXNWYWxpZCl7XG4gICAgICAgICRhbmFseXRpY3MucGFnZVRyYWNrKHVybCk7XG4gICAgICB9XG4gICAgfSxcbiAgICBldmVudFRyYWNrOiBmdW5jdGlvbihldmVudE5hbWUsIG9wdGlvbnMpe1xuICAgICAgaWYoaXNWYWxpZCl7XG4gICAgICAgIGlmKGlzU3RhZ2luZykgZXZlbnROYW1lID0gZXZlbnROYW1lICsgXCIgKFN0YWdpbmcpXCI7XG4gICAgICAgICRhbmFseXRpY3MuZXZlbnRUcmFjayhldmVudE5hbWUsIG9wdGlvbnMpO1xuICAgICAgfVxuICAgIH0sXG4gICAgc2V0VXNlcm5hbWU6IGZ1bmN0aW9uKGVtYWlsKXtcbiAgICAgIGlmKGlzVmFsaWQpe1xuICAgICAgICAkYW5hbHl0aWNzLnNldFVzZXJuYW1lKGVtYWlsKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGFsaWFzOiBmdW5jdGlvbihlbWFpbCl7XG4gICAgICBpZihpc1ZhbGlkKXtcbiAgICAgICAgdmFyIGRpc3RpbmN0SWQgPSAkd2luZG93Lm1peHBhbmVsLmdldF9kaXN0aW5jdF9pZCgpO1xuICAgICAgICAkd2luZG93Lm1peHBhbmVsLmFsaWFzKGRpc3RpbmN0SWQsIGVtYWlsKTtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICRhbmFseXRpY3Muc2V0VXNlcm5hbWUoZW1haWwpO1xuICAgICAgICB9LCAyMDAwKTtcbiAgICAgIH1cbiAgICB9XG4gIH07O1xufSk7XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG5cbmFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuLnNlcnZpY2UoJ0Jyb3dzZXInLCBmdW5jdGlvbiAoJHdpbmRvdykge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG5cbiAgICAgIHZhciB1c2VyQWdlbnQgPSAkd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQ7XG4gICAgICB2YXIgYnJvd3NlcnMgPSB7Y2hyb21lOiAvY2hyb21lL2ksIHNhZmFyaTogL3NhZmFyaS9pLCBmaXJlZm94OiAvZmlyZWZveC9pLCBpZTogL2ludGVybmV0IGV4cGxvcmVyL2l9O1xuXG4gICAgICBmb3IodmFyIGtleSBpbiBicm93c2Vycykge1xuICAgICAgICBpZiAoYnJvd3NlcnNba2V5XS50ZXN0KHVzZXJBZ2VudCkpIHtcbiAgICAgICAgICByZXR1cm4ga2V5O1xuICAgICAgICB9XG4gICAgIH07XG5cbiAgICAgcmV0dXJuICd1bmtub3duJztcbiAgfVxufSk7XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG5hbmd1bGFyLm1vZHVsZSgnYXBwJylcbi5mYWN0b3J5KCdNb21lbnQnLCBmdW5jdGlvbiAoJHdpbmRvdykge1xuICAgIHJldHVybiAkd2luZG93Lm1vbWVudDtcbn0pO1xufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcblxuYW5ndWxhci5tb2R1bGUoJ2FwcCcpLmNvbnRyb2xsZXIoJ0hvbWVDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCAkdWliTW9kYWwsIEF1dGgsICRzdGF0ZSwgJGZpbHRlciwgJHJvb3RTY29wZSwgQnJvd3NlciwgQW5hbHl0aWNzLCBsb2Rhc2gpIHtcblxufSk7XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gIGFuZ3VsYXIubW9kdWxlKCdhcHAnKS5jb25maWcoZnVuY3Rpb24gKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIsICRhbmFseXRpY3NQcm92aWRlcikge1xuICAgICRhbmFseXRpY3NQcm92aWRlci53aXRoQXV0b0Jhc2UodHJ1ZSk7XG4gICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnLycpO1xuICAgICRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdob21lJywge1xuICAgICAgICB1cmw6ICcvJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdwdWJsaWMvY29tcG9uZW50cy9ob21lL3RlbXBsYXRlcy9ob21lLmh0bWwnLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBhdXRoOiBmYWxzZVxuICAgICAgICB9XG4gICAgfSk7XG59KTtcblxufSkoKTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==