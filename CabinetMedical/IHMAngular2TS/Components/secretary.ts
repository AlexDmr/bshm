import {CabinetMedicalService} from "../Services/cabinetMedicalService";
import {Component} from "@angular/core";

@Component({
    selector	: "secretary-app",
    styles      : [
        `h1 {background: red;}`,
        `p {text-align: right;}`
    ],
    template	: `<h1>IHM de la secrétaire</h1>
				   <p>à compléter...</p>`,
    directives	: [],
    providers	: [CabinetMedicalService]
})
export class SecretaryApp {
    initDone		: boolean;
    constructor		(cms: CabinetMedicalService) {
        this.initDone = false;
        console.log("Appelez le service pour formatter et obtenir les données du cabinet");
        cms.getDataFrom( "/data/cabinetInfirmier.xml" );
    }
};
