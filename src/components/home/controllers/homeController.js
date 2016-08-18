(function() {

angular.module('app').controller('HomeCtrl', function($scope,lodash) {
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

});

})();
