export const htmlTemplate = `
	<form (ngSubmit)="Ajouter( texteChose )" action="#">
		<label>Entrer une nouvelle chose à faire</label>
		<input [(ngModel)]="texteChose" type="text" autofocus/>
	</form>

	<hr/>
	texteChose : {{texteChose}}
	<hr/>
	data.choses : {{data.choses.length}} items
	<section>
		<chose *ngFor="let chose of data.choses" [data]="chose"></chose>
	</section>
`;

