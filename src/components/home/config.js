(function() {
  angular.module('app').config(function ($stateProvider, $urlRouterProvider, $analyticsProvider) {
    $analyticsProvider.withAutoBase(true);
    $urlRouterProvider.otherwise('/');
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'public/components/home/templates/home.html',
        data: {
            auth: false
        }
    });
});

})();
