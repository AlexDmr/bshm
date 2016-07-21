// Framework Angular
var angular 			= require( "angular" )
  , ListeChoses_NF		= require( "../NF/ListeChoses.js" )
  , listeChoses_IHM_V0	= require( "../V0/js/listeChoses_IHM.js" )
  ;

// On instancie un noyau fonctionnel comme pour la V0
var nf		= new ListeChoses_NF();

// On instancie une IHM V0 pour comparer
window.onload = function() {
	new listeChoses_IHM_V0(nf, "#listeChoses1");
}

// On définit maintenant les structure Angular
// Le module qui va contenir les définitions
var mod = angular.module( "cours", [ require( "./js/ListeChoses.js" ) ] );

// Une directive attribut qui a pour but de faire le lien avec le noyau fonctionnel
mod.directive( "listeCours", function() {return {
	bindToController: true,
	controllerAs	: "$ctrl",
	controller 		: function() {
		this.listeChoses = nf;
	}
};})
