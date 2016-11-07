'use strict';

// ui-view is a component that has a controller than has access to services being configured by the providers below.
module.exports = ['$stateProvider', '$urlRouterProvider', routerConfig];

function routerConfig($stateProvider, $urlRouterProvider){
  $urlRouterProvider.when('' , '/landing#signup');
  $urlRouterProvider.when('/' , '/landing#signup');
  $urlRouterProvider.when('/signup' , '/landing#signup');
  $urlRouterProvider.when('/login' , '/landing#login');

  let states = [
    {
      name: 'Home',
      url: '/home',
      controller: 'HomeController',
      controllerAs: 'homeCtrl',
      template: require('../view/home/home.html'),
    },
    {
      name: 'Landing',
      url: '/landing',
      controller: 'LandingController',
      controllerAs: 'landingCtrl',
      template: require('../view/landing/landing.html'),
    },
  ];

  states.forEach(state => {
    $stateProvider.state(state);
  });
}
