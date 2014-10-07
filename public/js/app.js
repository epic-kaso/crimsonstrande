'use strict';


// Declare app level module which depends on filters, and services
var app = angular.module('myApp', [
    'ui.bootstrap',
    'ui.router',
    'ngAnimate',
    'myApp.filters',
    'myApp.services',
    'myApp.directives',
    'myApp.controllers'
]);

app.run(function($rootScope){
    $rootScope.contact = true;
    
    $rootScope.showContact = function(){
        console.log('show contact called');
        var cont =  $rootScope.contact;
        cont = !cont;
        $rootScope.contact = cont;
    };
});

app.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider
                .state('home', {
                    url: '/',
                    templateUrl: 'partials/home.html',
                    controller: 'MyCtrl1',
                    resolve: {data: function($rootScope) {
                            $rootScope.active_menu = 'home';
                        }}
                })
                .state('approach', {
                    url: '/approach',
                    templateUrl: 'partials/approach.html',
                    controller: function($scope,$location){
                        //$location.url('/approach/1');
                    },
                    resolve: {data: function($rootScope) {
                            $rootScope.showMessage = false;
                            $rootScope.active_menu = 'approach';
                        }}
                })
                .state('approach.approach_1', {
                    url: '/one',
                    templateUrl: 'approach-1.html'
                })
                .state('approach.approach_2', {
                    url: '/two',
                    templateUrl: 'approach-2.html'
                })
                .state('values', {
                    url: '/values',
                    templateUrl: 'partials/value.html',
                    controller: 'MyCtrl1',
                    resolve: {data: function($rootScope) {
                            $rootScope.active_menu = 'values';
                        }}
                })
                .state('services', {
                    url: '/services',
                    views: {
                        '':{templateUrl: 'partials/service.html'},
                        'service-nav@services':{templateUrl:'partials/service-nav.html'}
                    },
                    //templateUrl: 'partials/service.html',
                    controller: 'MyCtrl1',
                    resolve: {data: function($rootScope) {
                            $rootScope.active_menu = 'services';
                        }}
                })
                .state('services.facility', {
                    url: '/facility',
                    templateUrl: 'partials/service-facility.html'
                })
                .state('services.coaching', {
                    url: '/coaching',
                    templateUrl: 'partials/service-coach.html'
                })
                .state('services.communication', {
                    url: '/communication',
                    templateUrl: 'communication-management.html'
                })
                .state('services.consultancy', {
                    url: '/consultancy',
                    templateUrl: 'change-management-consultancy.html'//vision-mission-definition.html
                })
                .state('services.vision', {
                    url: '/vision',
                    templateUrl: 'vision-mission-definition.html'
                })
                .state('team', {
                    url: '/team',
                    templateUrl: 'partials/team.html',
                    controller: 'MyCtrl1',
                    resolve: {data: function($rootScope) {
                            $rootScope.active_menu = 'team';
                        }}
                });
    }]);