// Framework Angular
var angular 		= require( "angular" 			)
  ;

// Instantiate module
var mod = angular.module( "bshm", [] );

// Define a directive to deal with data
var ListeChoses = require( "../NF/ListeChoses.js" );
mod.directive( "bshmRoot", function() {return {
	bindToController: true,
	controllerAs	: "ctrl",
	controller 		: function() {
		this.hello = "hello";
		this.listeChoses = new ListeChoses();
	}
};})

// Load components
require( "./js/ListeChoses.js" )(mod);
