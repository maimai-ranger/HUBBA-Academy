(function() {

angular.module('app')
.service('Analytics', function ($window, $rootScope, Environment, $analytics) {
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
});

})();
