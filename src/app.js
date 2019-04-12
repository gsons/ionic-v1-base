var app = angular.module('starter', ['ionic', 'ngStorage']);

app.config(function($ionicConfigProvider, $sceDelegateProvider) {
        //$sceDelegateProvider.resourceUrlWhitelist([ 'self','*://www.youtube.com/**', '*://player.vimeo.com/video/**']);
    })

app.constant('WAP_CONFIG', {
        host: 'https://api.avgle.com',
        port: 443,
        path: '/v1/',
        platform: 'browser' // 
    })
app.config(function($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
})
app.factory('AuthInterceptor', function($rootScope, $q, $location, $timeout, $window) {
    return {
        response: function(response, toState) {
            var path = $location.path();
            var header = response.headers();
            return response;
        }
    };
})
app.run(function($baseurl, $window, $rootScope, $state, $stateParams, $localStorage, $http, $q, $location) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $rootScope.$back = function() {
        $window.history.back();
    }
    $rootScope.$refresh = function() {
        $window.location.reload();
    }
    $rootScope.$on('$stateChangeSuccess', function(event, to, toParams, from, fromParams, toState) {
        $rootScope.previousState = from;
        $rootScope.previousStateParams = fromParams;
    });

    $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
            ionic.Platform.setPlatform('ios');
    })
})