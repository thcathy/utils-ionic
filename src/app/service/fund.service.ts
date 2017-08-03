import { Injectable }              from '@angular/core';
import { Http, Response }          from '@angular/http';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import {Fund} from "../entity/fund";

declare const ENV;

@Injectable()
export class FundService {
  private ALL_FUND_URL = ENV.apiHost + '/rest/fund/getall';

  constructor (private http: Http) {}

  getFunds(): Promise<Fund[]> {
    return this.http.get(this.ALL_FUND_URL)
      .toPromise()
      .then(response => response.json() as Fund[])
      .catch(this.handleError);
  }

  submitRequest(request: string): Promise<string> {
    if (request.slice(-1) != '/') request += '/';
    console.log(`calling fund request url ${request}`);
    return this.http.get(ENV.apiHost + '/rest/fund/' + request)
            .toPromise()
            .then(response => {
              try {
                return JSON.stringify(response.json());
              } catch (e) {
                return response.toString();
              }
            })
            .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
