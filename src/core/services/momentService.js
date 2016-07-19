(function() {
angular.module('app')
.factory('Moment', function ($window) {
    return $window.moment;
});
})();
