var angular = require( "angular" );

// Définition du composant
var moduleName 			= "listeChoses";
var moduleListeChose	= angular.module( moduleName, [ require( "./Chose.js" ) ]);


// Template HTML
var template 	= require( "./ListeChoses.html" );
require( "./ListeChoses.css" );
 
function controller($scope) {
	this.texteChose = "";
	this.choses 	= this.nf.choses;
	this.Ajouter	= function(texte) {
		this.nf.Ajouter(texte);
		this.texteChose = "";
	}
	this.nf.on("update", function() {
		$scope.$applyAsync();
	})
}
controller.$inject = ["$scope"];

 // Définition du composant
moduleListeChose.component( moduleName, {
		template	: template,
		bindings	: {nf: '<'},
		controller	: controller
	});

module.exports = moduleName;
