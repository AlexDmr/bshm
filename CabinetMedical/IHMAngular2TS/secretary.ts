import { bootstrap }	                        from '@angular/platform-browser-dynamic';
import { enableProdMode 	}               	from '@angular/core';
import { disableDeprecatedForms, provideForms } from '@angular/forms';

import {SecretaryApp} from './Components/secretary';

enableProdMode();
bootstrap( SecretaryApp, [
    disableDeprecatedForms(),
    provideForms()
] );



