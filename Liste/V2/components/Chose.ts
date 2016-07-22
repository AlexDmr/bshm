import { Component, Input 	} from "@angular/core";
import {htmlTemplate		} from "./Chose.html";

import * as nf from "../nf/nf";

@Component({
  selector		: "chose",
  template		: htmlTemplate
})
export class Chose { 
	@Input() data	: nf.Chose;
	dispose	() {
		this.data.dispose();
	}
};

