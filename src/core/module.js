
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
    .run(function ($rootScope, $uibModal, $state, Analytics) {

    });
})();
