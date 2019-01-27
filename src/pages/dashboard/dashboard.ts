import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ToastController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Policy } from '../../modals/Policy';
import { PolicyProvider } from '../../providers/providers-policy/providers-policy';
import { CreateClaimPage } from '../create-claim/create-claim';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { MyPolicyPage } from '../my-policy/my-policy';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { Constants } from '../../modals/Constants';

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
  providers: [PolicyProvider,]
})
export class DashboardPage {

  //data members
  username: string = '';
  newPolicies: Policy[] = []

  //methods
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private policyService: PolicyProvider,
    private modalCtrl: ModalController,
    private http: HttpClient,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) {
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');

    //Fetch username from session
    let user = sessionStorage.getItem('user')
    this.username = JSON.parse(user).user_id

    let data = {
      user_id: this.username
    }

    let errorFound: boolean = false
    let toastFail;

    //loading component
    let loadingNewPolicies = this.loadingCtrl.create({
      content: "Loading new policies",
    })
    loadingNewPolicies.present().then(() => {
      //Fetch All Upcoming Policies)
      //this.newPolicies = this.policyService.getAllNewPolicy();
      console.log('jsonData', JSON.stringify(data))
      this.http.post(Constants.BASE_URL+'/insurance/getallnewpolicy/', JSON.stringify(data))
        .subscribe(resp => {
          console.log('resp ', resp);
          //this.newPolicies = this.newPolicies.concat(resp)
        }, err => {
          console.log('Error ', err)
          toastFail = this.toastCtrl.create({
            message: err.error['error message'],
            cssClass: 'toastFail',
            showCloseButton: true,
            closeButtonText: 'Ok'
          })

          errorFound = true
        })
    })
    loadingNewPolicies.dismiss(() => {
      if (errorFound)
        toastFail.present()
      this.navCtrl.setRoot(MyPolicyPage)
    })
  }


  addPolicy(id, name) {
    console.log('Policy Id : ' + id);

    //Confirming user wants to add policy
    if (this.isConfirmedToAdd(name)) {

      //Fetch username from session
      let user = sessionStorage.getItem('user')
      this.username = JSON.parse(user).user_id

      let data = {
        policyId: id,
        user_id: this.username
      }
      console.log('jsonData ', JSON.stringify(data))

      let toastSuccess = this.toastCtrl.create({
        message: 'Policy added',
        cssClass: 'toastSuccess',
        duration: 2000,
      })

      this.http.post('https://policyclaim.herokuapp.com/insurance/addnewpolicy/', JSON.stringify(data))
        .subscribe(resp => {
          console.log('resp ', resp);
          toastSuccess.present()
        }, err => {
          console.log('Error ', err)

          let toastFail = this.toastCtrl.create({
            message: err.error['error message'],
            cssClass: 'toastFail',
            showCloseButton: true,
            closeButtonText: 'Ok'
          })
          toastFail.present()
        })

      toastSuccess.onDidDismiss(() => {
        this.navCtrl.setRoot(MyPolicyPage)
      })
    }
  }


  isConfirmedToAdd(policyName) {
    const confirm = this.alertCtrl.create({
      title: 'Policy : ' + policyName,
      message: 'Do you want to add this policy in your list ? ',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Disagree clicked');
            return false;
          }
        },
        {
          text: 'Agree',
          handler: () => {
            console.log('Agree clicked');
            return true
          }
        }
      ]
    });
    confirm.present();
  }

}
