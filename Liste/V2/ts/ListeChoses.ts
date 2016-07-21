import { Component, Input 	} 	from "@angular/core";
import {htmlTemplate		}	from "./ListeChoses.html.ts";

import { Chose }				from "./Chose.ts";

import * as nf 					from "../../NF/nf.ts";

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

