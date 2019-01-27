import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  option: string = 'login';

  constructor(
    public navCtrl: NavController,
  ) {
    sessionStorage.clear();
  }
  
}
