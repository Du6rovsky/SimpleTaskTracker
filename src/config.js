var config = function($locationProvider,$routeProvider){
	$routeProvider
	    .when('/', {
	      templateUrl:'/build/modules/main/main.html',
	      controller:'mainCtrl'
	    })
	    .otherwise({redirectTo:'/'});
	    // use the HTML5 History API
	    $locationProvider.html5Mode({
	      enabled: true,
	      requireBase: false
	    });
};

module.exports = config;
