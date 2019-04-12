 app.config(function($stateProvider, $urlRouterProvider) {

     $stateProvider
         .state('app', {
             url: '/app',
             abstract: true,
             templateUrl: 'tpl/app.html'
         })
         .state('app.main', {
             url: '/main',
             views: {
                 'menuContent': {
                     templateUrl: 'tpl/main.html',
                     controller: 'mainCtrl'
                 }
             }
         })
         .state('app.drlist', {
             url: '/drlist',
             views: {
                 'menuContent': {
                     templateUrl: 'tpl/drlist.html',
                     controller: 'drlistCtrl'
                 }
             },
         })
         .state('app.person', {
             url: '/person',
             views: {
                 'menuContent': {
                     templateUrl: 'tpl/person.html',
                     controller: 'personCtrl'
                 }
             },
         })

     $urlRouterProvider.otherwise('/app/main');
 });