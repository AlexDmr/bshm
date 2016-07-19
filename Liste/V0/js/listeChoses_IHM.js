var Chose_IHM 		= require( "./Chose_IHM.js" )
  , template_liste	= require( "./listeChoses_IHM.html" )
  ;

require( "./listeChoses_IHM.css" );

function listeChoses_IHM(NF, rootSelector) {
	var listeIHM = this;
	this.nf = NF;
	var root = document.querySelector( rootSelector );
	root.innerHTML = template_liste;
	this.ihm = {
		liste 			: root.querySelector( ".liste" ),
		nouvelleChose	: root.querySelector( ".nouvelleChose" ),
		formulaire		: root.querySelector( "form" ),
		choses 			: []
	}

	// Abonnement pour créer de nouvelles choses à faire
	this.ihm.formulaire.onsubmit = function() {
		console.log( "Ajouter ", listeIHM.ihm.nouvelleChose.value );
		NF.Ajouter( listeIHM.ihm.nouvelleChose.value );
	};

	// Abonnement au noyau fonctionnel
	NF.on("update", listeChoses_IHM.prototype.update.bind(this) );
}

listeChoses_IHM.prototype = {
	dispose		: function() {

	},
	update		: function() {
		var listeIHM = this;
		// On détruit les IHM de choses à faire déjà existantes
		this.ihm.choses.forEach( function(c) {c.dispose();} );
		this.ihm.choses = [];

		// On crée les IHM de choses à faire par rapport au noyau fonctionnel
		this.nf.choses.forEach( function(c) {
			var div = document.createElement( "div" );
			listeIHM.ihm.liste.appendChild( div );
			listeIHM.ihm.choses.push( new Chose_IHM(c, div) );
		});	
	}
};

// Exporter la fonction de construction d'une IHM de liste de choses
module.exports = listeChoses_IHM;