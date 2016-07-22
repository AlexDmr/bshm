export const htmlTemplate = `
	<section class="chose">
		<input 		type 			= "checkbox" 
					[(ngModel)]		= "data.fait" 
					aria-label 		= "Tâche réalisée ou pas"
					/>
		<input		[(ngModel)]		= "data.texte" 
					aria-label 		= "Description de la tâche"
					/>
		<label>{{data.date | date}}</label>
		<button 	class 		= "remove" 
					(click) 	= "dispose()"
					>X</button>
	</section>
`;
