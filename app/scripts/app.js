'use strict';

/**
 * @ngdoc overview
 * @name testAngularApp
 * @description
 * # testAngularApp
 *
 * Main module of the application.
 */

//'ngCookies',
//  'ngMessages',
//  'ngResource',
//  'ngRoute',
//  'ngSanitize',
//  'ngTouch'
var testAngularApp = angular
  .module('testAngularApp', ['ngRoute', 'ngCookies'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        controller: 'ListController',
        templateUrl : "views/list.html"
      }).when('/add', {
      controller: 'AddController',
      templateUrl : "views/add.html"
    }).when('/show/:id', {
      controller: 'ShowController',
      templateUrl : "views/show.html"
    })
      .otherwise({
        redirectTo: ''
      });
    });




