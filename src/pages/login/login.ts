import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { HttpClient, HttpHeaders, HttpClientModule  } from '@angular/common/http';

import { ForgetPasswordPage } from '../forget-password/forget-password';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { DashboardPage } from '../dashboard/dashboard';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { Constants } from '../../modals/Constants';
import { AdminHomePage } from '../admin-home/admin-home';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private modlCtr: ModalController,
    private http: HttpClient,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  resetPassword() {
    console.log('resetPassword LoginPage');
    this.modlCtr.create(ForgetPasswordPage).present();
  }

  onLogin(login) {
    console.log('onLogin LoginPage');
    console.log('login data  ', login.value)

    if (login.value.username === 'admin' && login.value.password === 'admin') {
      console.log('Admin Login')
      this.modlCtr.create(AdminHomePage).present();

    } else {

      let data = {
        user_id: login.value.username,
        password: login.value.password
      }
      console.log('data ', data)


      let loading = this.loadingCtrl.create({
        content: 'Validating credentials, please wait',
      })
      console.log('loading ', loading)
      let toast = undefined;

      loading.present().then(() => {

        const httpOptions = {
          headers: new HttpHeaders({ 
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Headers': 'Origin'
          })
        };

        this.http.post(Constants.BASE_URL + '/user/login/', JSON.stringify(data), httpOptions)
          .subscribe(resp => {
            console.log('resp ', resp);
            sessionStorage.setItem('user', JSON.stringify(resp))
            this.navCtrl.setRoot(DashboardPage)

          }, err => {
            console.log('Error ', err)

            toast = this.toastCtrl.create({
              message: err.error['error message'],
              cssClass: 'toastFail',
              duration: 2000
            })
            toast.present()
          })
      })

      loading.dismiss(() => {
        if (toast !== undefined)
          toast.present()
      })
    }
  }

}
