import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import "rxjs/add/operator/toPromise";

@Injectable()
export class CabinetMedicalService {
    private _http : Http;
    constructor(http: Http) {
        this._http = http;
    }
    getDataFrom( url: string ) {
        return this._http.get(url).toPromise().then( (res: Response) => {
            console.log( res.toString(), "\n", res.text() );

        });
    }
};
