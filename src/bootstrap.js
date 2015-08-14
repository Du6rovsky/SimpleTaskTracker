'use strict';

module.exports = function(app) {
	//Config
	app.config(require('./config.js'));
	// Controller 
    app.controller('mainCtrl', require('./modules/main/main-controller'));
};