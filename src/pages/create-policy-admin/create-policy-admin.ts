import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Policy } from '../../modals/Policy';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../../modals/Constants';
import { HomePage } from '../home/home';
import { PolicyAdminPage } from '../policy-admin/policy-admin';
import { AdminHomePage } from '../admin-home/admin-home';


@Component({
  selector: 'page-create-policy-admin',
  templateUrl: 'create-policy-admin.html',
})
export class CreatePolicyAdminPage {

  policy: Policy= new Policy()
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public toastCtrl: ToastController,
    public http: HttpClient) {
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreatePolicyAdminPage');
  }

  closeCreatePolicyForm(){
    console.log('closeCreatePolicyForm CreatePolicyAdminPage')
    this.navCtrl.setRoot(HomePage)
  }

  createNewPolicy(){
    console.log('createNewPolicy CreatePolicyAdminPage', this.policy);

    console.log('data ', this.policy)

    let toastSuccess = this.toastCtrl.create({
      message: 'Record created',
      cssClass: 'toastSuccess',
      duration: 2000,
    })

    this.http.post(Constants.BASE_URL+'/insurance/createpolicyforadmin/', JSON.stringify(this.policy))
    .subscribe(resp => {
      console.log('resp ', resp);
      toastSuccess.present()
    },err => {
        console.log('Error ', err)

        let toastFail = this.toastCtrl.create({
          message: err.error['error message'],
          cssClass: 'toastFail',
        })
        toastFail.present()
      })

      toastSuccess.onDidDismiss(()=>{
        this.navCtrl.setRoot(AdminHomePage)
      })
  }

}
