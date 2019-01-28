import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpClient} from '@angular/common/http';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { HomePage } from '../home/home';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { Constants } from '../../modals/Constants';

@Component({
  selector: 'page-forget-password',
  templateUrl: 'forget-password.html',
})
export class ForgetPasswordPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private http: HttpClient,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    private loadingCtrl: LoadingController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgetPasswordPage');
  }

  closeForgetPassword() {
    console.log('closeForgetPassword ForgetPasswordPage');
    this.navCtrl.pop();
  }

  validate(user) {
    console.log('validate ForgetPasswordPage');
    console.log('validate data  ', user.value)

    let loadingValidate = this.loadingCtrl.create({
      content: 'Validating, please wait'
    })
    loadingValidate.present().then(() =>{
      this.validateDataFromDb(user)
    })
    loadingValidate.dismiss();    
  }

  validateDataFromDb(user){
    let data = {
      user_id: user.value.username,
      dob: user.value.dob,
      postcode: user.value.postcode
    }
    console.log('data ', data)

    let jsonData = JSON.stringify(data)
    console.log(jsonData)

    this.http.post(Constants.BASE_URL+'/user/validateuser/', jsonData)
      .subscribe((resp) => {
        console.log('resp ', resp);

        this.setPassword(user.value.username)

      }, err => {
        console.log('Error ', err)

        let toastFail = this.toastCtrl.create({
          message: err.error['error message'],
          cssClass: 'toastFail',
          duration: 2000
        })
        toastFail.present()
      })
  }


  setPassword(user_id) {
    const prompt = this.alertCtrl.create({
      title: 'Set Password',
      message: "Enter a new password",
      inputs: [
        {
          name: 'Password',
          placeholder: 'Password',
          type: 'password'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: password => {
            this.navCtrl.setRoot(HomePage)
          }
        },
        {
          text: 'Save',
          handler: password => {
            console.log('Saved clicked');
            console.log('data ', password);

            let data = {
              user_id: user_id,
              password: password.Password
            }
            console.log('data ', data)

            let toastSuccess = this.toastCtrl.create({
              message: 'Password updated successfully',
              cssClass: 'toastSuccess',
              duration: 2000
            })

            this.http.put(Constants.BASE_URL+'/user/update/', JSON.stringify(data))
              .subscribe(resp => {
                console.log('resp ', resp);
                toastSuccess.present();

              }, err => {
                console.log('Error ', err)

                let toastUpdateFail = this.toastCtrl.create({
                  message: err.error['error message'],
                  cssClass: 'toastFail',
                  duration: 2000
                })
                toastUpdateFail.present()
              })

            toastSuccess.onDidDismiss(() => {
              console.log('Dismissed toast');
              this.closeForgetPassword();
            });

          }
        }
      ]
    });
    prompt.present();
  }

}


