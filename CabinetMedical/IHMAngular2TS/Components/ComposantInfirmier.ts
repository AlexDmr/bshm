import * as NF from "../Services/cabinetMedicalService";
import {Component, Input} from "@angular/core";

import {ComposantPatient} from "./ComposantPatient";
import {AlxDraggable} from "../Directives/DirectivesDragDrop";

@Component({
    selector	: "composant-infirmier",
    /*styles      : [
        `section.infirmier {display: inline-block; border: solid black 1px;}`,
    ],*/
    template	: `<section class                = "infirmier">
                        <img src="{{nf.photo}}" />
                        <p class="nom">{{nf.nom}}</p>
                        <p class="prenom">{{nf.prenom}}</p>
                        <p class="id">{{nf.id}}</p>
                        <hr/>
                        <h3>Liste des patients !!!!</h3>
                        <composant-patient *ngFor              = "let patient of nf.patients"
                                           [alx-draggable]     = "{type: 'patient', patient: patient, infirmierSource: nf}"
                                           [nf]                = "patient" 
                                           ></composant-patient>
				   </section>`,
    directives	: [ComposantPatient, AlxDraggable],
    providers	: []
})
export class ComposantInfirmier {
    @Input() nf         : NF.InfirmierInterface;
    constructor		() {
        // console.log( "new instance of ComposantInfirmier")
    }
};

