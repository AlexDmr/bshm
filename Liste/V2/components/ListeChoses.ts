import { Component, Input 	} 	from "@angular/core";
import { Chose }				from "./Chose";
import * as nf 					from "../nf/nf";

@Component({
  selector		: "liste-chose",
  template		: `
					<form (ngSubmit)="Ajouter( inputNouvelleChose );" action="#">
						<label>Entrer une nouvelle chose à faire</label>
						<input #inputNouvelleChose type="text" autofocus/>
					</form>
					<br/>
					<section>{{data.choses.length}} choses</section>
					<section class="liste">
						<chose *ngFor="let chose of data.choses" [data]="chose"></chose>
					</section>
	`,
  directives	: [Chose]
})
export class ListeChosesComponent {
	@Input() data	: nf.ListeChoses;
	constructor		() {
		console.log(this);
	};
	Ajouter			(input: HTMLInputElement  ) {this.data.Ajouter(input.value); input.value = "";}
	Retirer			(chose: nf.Chose		  ) {this.data.Retirer(chose);}
};
