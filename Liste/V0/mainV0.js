// Sans framework, en utilisant javascript 5

// On importe les constructeurs
var ListeChoses_NF	= require( "../NF/ListeChoses.js" )
  , listeChoses_IHM = require( "./js/listeChoses_IHM.js" )
  ;

// On instancie un noyau fonctionnel et deux IHM qui le représentent
window.onload = function() {
	console.log( "c'est partit !" );
	var nf		= new ListeChoses_NF()
	  , ihm1	= new listeChoses_IHM(nf, "#listeChoses1")
	  , ihm2	= new listeChoses_IHM(nf, "#listeChoses2")
	  ;

	console.log(nf, ihm1, ihm2);
}