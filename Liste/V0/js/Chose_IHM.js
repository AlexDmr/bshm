var template_chose	= require( "./Chose_IHM.html" )
  ;

require( "./Chose_IHM.css" );

function Chose_IHM(NF, root) {
	var choseIHM = this;

	this.nf = NF;
	this.root = root;
	root.innerHTML = template_chose;
	this.ihm = {
		texte	: root.querySelector( "input.texte" ),
		fait	: root.querySelector( "input.fait"  )
	};

	// Abonnement au noyau fonctionnel
	NF.on("update", Chose_IHM.prototype.update.bind(this) );
	this.update();

	// Abonnement aux évènements utilisateurs
	this.ihm.fait.onchange  = function() {NF.setFait ( choseIHM.ihm.fait.checked );}
	this.ihm.texte.onchange = this.ihm.texte.onkeyup = function() {NF.setTexte( choseIHM.ihm.texte.value  );}
}

Chose_IHM.prototype = {
	dispose	: function() {
		this.root.parentNode.removeChild( this.root );

	},
	update	: function() {
		this.ihm.texte.value	= this.nf.texte;
		this.ihm.fait.checked	= this.nf.fait;
	}
};


// Exporter la fonction de construction d'une IHM de liste de choses
module.exports = Chose_IHM;