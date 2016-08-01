import { bootstrap }	                        from "@angular/platform-browser-dynamic";
//import { enableProdMode 	}               	from "@angular/core";
import { disableDeprecatedForms, provideForms } from "@angular/forms";
import {HTTP_PROVIDERS} from "@angular/http";

import {ComposantSecretaire} from "./Components/ComposantSecretaire";

//enableProdMode();
bootstrap( ComposantSecretaire, [
    disableDeprecatedForms(),
    provideForms(),
    HTTP_PROVIDERS
] );



