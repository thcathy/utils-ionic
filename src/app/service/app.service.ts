import { Injectable } from '@angular/core';
import { Platform, App } from 'ionic-angular';
import {HttpErrorResponse} from "@angular/common/http";

@Injectable()
export class AppService {

  constructor(public platform: Platform
  ) { }

  isApp(): boolean {
    return this.platform.is('ios') || this.platform.is('android');
  }

  handleError(err: HttpErrorResponse) {
    if (err.error instanceof Error) {
      // A client-side or network error occurred. Handle it accordingly.
      console.log('An error occurred:', err.error.message);
      alert(`An error occurred: ${err.error.message}`);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
      debugger;
      if (err.status == 401 || err.status == 403) {
        alert(`No permission to open. Please login`);
      }
    }
  }

}
