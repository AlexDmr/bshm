/* Noyau fonctionnel */
import {ListeChosesService}	from "./nf/service";
import {ListeChoses}		from "./nf/nf";

/* Version sans framework */
import {listeChoses_IHM} from "./IHM/listeChoses_IHM";
let PromesseDocumentPret = new Promise( (resolve) => {
	if(document.readyState === "complete") {
		resolve();
	} else {
		document.body.onload = () => resolve();
	}
});

/* Version avec le framework Angular 2 */
import { bootstrap }	from "@angular/platform-browser-dynamic";
import { Component, enableProdMode 	} 	from "@angular/core";
import { disableDeprecatedForms, provideForms } from '@angular/forms';

import {ListeChosesComponent}	from "./components/ListeChoses";

@Component({
  selector		: "archi-logicielle",
  template		: `	<section *ngIf="!initDone">Chargement...</section>
  					<liste-chose *ngIf="initDone" [data]="data"></liste-chose>
				  `,
  directives	: [ListeChosesComponent],
  providers		: [ListeChosesService]
})
class ArchiLogicielle {
	data 			: ListeChoses;
	initDone		: boolean;
	constructor		(listeService: ListeChosesService) {
		this.initDone = false;
		listeService.getData().then((data) => {this.initDone = true; this.data = data});

		// Juste pour initialiser les données dans le cadre d'Angular
		Promise.all( [listeService.getData(), PromesseDocumentPret]).then(
			([data, ...reste]) => new listeChoses_IHM(data, "#sansFramework")
		);
	}
}

enableProdMode();
bootstrap( ArchiLogicielle, [
	disableDeprecatedForms(),
	provideForms()
] );

