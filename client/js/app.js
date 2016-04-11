var app = angular.module("resttokenclient", ['ngRoute']);

// configure our routes
app.config(function($routeProvider) {
    $routeProvider

        // route for the home page
        .when('/', {
            templateUrl : 'pages/home.html',
            controller  : 'MainController'
        })

        // route for the about page
        .when('/login', {
            templateUrl : 'pages/login.html',
            controller  : 'LoginController'
        })

        // route for the contact page
        .when('/register', {
            templateUrl : 'pages/register.html',
            controller  : 'RegisterController'
        });
});