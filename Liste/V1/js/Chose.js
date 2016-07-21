var angular = require( "angular" );

// Template HTML
var template 	= require( "./Chose.html" );
require( "./Chose.css" );

// Définition du composant
var moduleName 	= "chose";
var moduleChose = angular.module( moduleName, []);

function controller($scope) {
	this.dispose	= function(event) {
		if(event) {event.stopPropagation();}
		this.nf.dispose();
	}
	this.updateFait 	= function() {this.nf.setFait (this.nf.fait );}
	this.updateTexte 	= function() {this.nf.setTexte(this.nf.texte);}

	this.nf.on("update", function() {
		$scope.$applyAsync();
	});
}
controller.$inject = ["$scope"];

moduleChose.component( moduleName, {
		template	: template,
		bindings	: {nf: '<'},
		controller	: controller
	});

module.exports = moduleName;
