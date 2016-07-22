import { Component, Input 	} 	from "@angular/core";
import {htmlTemplate		}	from "./ListeChoses.html";

import { Chose }				from "./Chose";

import * as nf 					from "../nf/nf";

@Component({
  selector		: "liste-chose",
  template		: htmlTemplate,
  directives	: [Chose]
})
export class ListeChoses { 
	@Input() data	: nf.ListeChoses;
	texteChose		: string;
	constructor		() {
		this.texteChose  = "";
		console.log(this);
	};
	Ajouter			(texte: string  ) {this.data.Ajouter(texte); this.texteChose = "";}
	Retirer			(chose: nf.Chose) {this.data.Retirer(chose);}
};

