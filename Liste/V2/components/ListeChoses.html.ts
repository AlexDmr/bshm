export const htmlTemplate = `
	<form (ngSubmit)="Ajouter( texteChose )" action="#">
		<label>Entrer une nouvelle chose à faire</label>
		<input [(ngModel)]="texteChose" type="text" autofocus/>
	</form>
	<hr/>
	<section>{{data.choses.length}} choses</section>
	<section>
		<chose *ngFor="let chose of data.choses" [data]="chose"></chose>
	</section>
`;

