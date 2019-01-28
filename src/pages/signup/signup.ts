import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { HttpClient} from '@angular/common/http';
import { HomePage } from '../home/home';
import { Constants } from '../../modals/Constants';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private http: HttpClient, 
    public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  onSignup(user){
    console.log('onSignup SignupPage');
    console.log('signup data  ', user.value)

    let data = {
      user_id: user.value.username,
      password: user.value.password,
      postcode: user.value.postcode,
      dob: user.value.dob
    }
    console.log('data ', data)

    let toastSuccess = this.toastCtrl.create({
      message: 'Record created, please login',
      cssClass: 'toastSuccess',
      duration: 2000,
    })
  
    this.http.post(Constants.BASE_URL+'/user/create/', JSON.stringify(data))
    .subscribe(resp => {
      console.log('resp ', resp);
      toastSuccess.present()
    },err => {
        console.log('Error ', err)

        let toastFail = this.toastCtrl.create({
          message: err.error['error'],
          cssClass: 'toastFail',
          duration: 2000
        })
        toastFail.present()
      })

      toastSuccess.onDidDismiss(()=>{
        this.navCtrl.setRoot(HomePage)
      })
  }
}
