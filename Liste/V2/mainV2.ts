import "./liste.css";


import "reflect-metadata";
import "rxjs";
import "zone.js/dist/zone";

// Angular 2
import "@angular/platform-browser";
import "@angular/platform-browser-dynamic";
import "@angular/core";
import "@angular/common";
import "@angular/http";
import "@angular/router";
import { bootstrap }	from "@angular/platform-browser-dynamic";


import { Component 	} 	from "@angular/core";
import * as nf 			from "../NF/nf.ts";
import {ListeChoses}	from "./ts/ListeChoses.ts";

@Component({
  selector		: "archi-logicielle",
  template		: `	<section *ngIf="!initDone">Chargement...</section>
  					<section *ngIf="initDone">
	  					<liste-chose [data]="data"></liste-chose>
						<hr/>
						<liste-chose [data]="data"></liste-chose>
					</section>
				  `,
  directives	: [ListeChoses],
  providers		: [nf.ListeChoseService]
})
export class ArchiLogicielle {
	data 			: nf.ListeChoses;
	initDone		: boolean;
	constructor		(listeService: nf.ListeChoseService) {
		this.initDone = false;
		listeService.getData().then((data) => {this.initDone = true; this.data = data});
	}
}

bootstrap( ArchiLogicielle );

