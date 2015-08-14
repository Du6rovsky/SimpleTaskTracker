require('angular');
require('angular-route'); //ngRoute for ng-view
require('angular-local-storage'); //LocalStorageModule for order data

var app = angular.module('timerApp', ['LocalStorageModule','ngRoute']);
require('./bootstrap.js')(app);