import { Component, Input 	} 	from "@angular/core";
//import {htmlTemplate		}	from "../IHM/ListeChoses.html";
const htmlTemplate = `
	<form (ngSubmit)="Ajouter( texteChose )" action="#">
		<label>Entrer une nouvelle chose à faire</label>
		<input [(ngModel)]="texteChose" type="text" name="texteChose" autofocus/>
	</form>
	<br/>
	<section>{{data.choses.length}} choses</section>
	<section class="liste">
		<chose *ngFor="let chose of data.choses" [data]="chose"></chose>
	</section>
`;

import { Chose }				from "./Chose";

import * as nf 					from "../nf/nf";

@Component({
  selector		: "liste-chose",
  template		: htmlTemplate,
  directives	: [Chose]
})
export class ListeChosesComponent {
	@Input() data	: nf.ListeChoses;
	texteChose		: string;
	constructor		() {
		this.texteChose  = "";
		console.log(this);
	};
	Ajouter			(texte: string  ) {this.data.Ajouter(texte); this.texteChose = "";}
	Retirer			(chose: nf.Chose) {this.data.Retirer(chose);}
};
