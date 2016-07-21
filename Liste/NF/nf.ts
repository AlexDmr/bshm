import { Injectable } from '@angular/core';


export class Chose {
	liste		: ListeChoses;
	texte		: string;
	date 		: Date;
	fait 		: boolean;
	constructor	(texte: string, liste: ListeChoses) {
		this.texte	= texte;
		this.date	= new Date( Date.now() );
		this.fait	= false;
		this.liste	= liste;
	}
	dispose		() {
		this.liste.Retirer(this);
	}
};


export class ListeChoses {
	choses 		: Chose[];
	constructor	() {
		this.choses 	= new Array<Chose>();
	}
	Ajouter		(texte: string) {
		this.choses.push( new Chose(texte, this) );
	}
	Retirer		(chose: Chose) {
		this.choses.splice( this.choses.indexOf(chose), 1 );
	}
};

@Injectable()
export class ListeChoseService {
	getData	() {
		return new Promise<ListeChoses>( 
			(resolve) => { setTimeout(() => resolve( new ListeChoses() ), 2000) }
			);
	}
};
