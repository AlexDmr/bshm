import { Component, Input 	} from "@angular/core";
import {htmlTemplate		} from "./Chose.html.ts";

import * as nf from "../../NF/nf.ts";

@Component({
  selector		: "chose",
  template		: htmlTemplate
})
export class Chose { 
	@Input() data	: nf.Chose;
	dispose	() {
		console.log( "dispose", this );
		this.data.dispose();
	}
};

