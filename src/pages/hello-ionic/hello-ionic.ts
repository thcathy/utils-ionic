import { Component } from '@angular/core';
import {AuthService} from "../../app/service/auth.service";

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {
  constructor(public authService: AuthService) {

  }
}
