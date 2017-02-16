import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable ()
export class LoggerService {

    private loggerUrl = 'api/loggerData';

    constructor(private http: Http) {}

    getClients(): Promise<any> {
        return 
    }

    getLoggerData(): Promise <any> {

        return this.http.get(this.loggerUrl)
            .toPromise()
            .then(response => response.json().data as loggerData[] )
            .catch(this.handleError);
    }

    private handleError(error: any): Promise <any> {
        console.error('An error occured', error);
        return Promise.reject(error.message || error );
    }
}