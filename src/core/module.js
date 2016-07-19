
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
    .run(function ($rootScope, $uibModal, $state, Analytics) {

    });
})();
