import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ToastController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Policy } from '../../modals/Policy';
import { PolicyProvider } from '../../providers/providers-policy/providers-policy';
import { CreateClaimPage } from '../create-claim/create-claim';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { Constants } from '../../modals/Constants';
import { MyClaimPage } from '../my-claim/my-claim';

@Component({
  selector: 'page-my-policy',
  templateUrl: 'my-policy.html',
})
export class MyPolicyPage {

  //data members
  username: string = '';
  myPolicies: Policy[] = []

  //methods
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private policyService: PolicyProvider,
    private modalCtrl: ModalController,
    private http: HttpClient,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController) {
  }

  createClaim(id: any) {
    console.log('Policy Id : ' + id);
    sessionStorage.setItem('policyId', id)
    let modal = this.modalCtrl.create(CreateClaimPage)
    modal.present();

    modal.onDidDismiss(data=>{
      this.navCtrl.setRoot(MyClaimPage);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyPolicyPage');

    //Fetch username from session
    let user = sessionStorage.getItem('user')
    this.username = JSON.parse(user).user_id

    let data = {
      user_id: this.username
    }

    let errorFound: boolean = false
    let toastFail;

    //loading component
    let loadingMyPolicies = this.loadingCtrl.create({
      content: "Loading new policies",
    })
    loadingMyPolicies.present().then(() => {
      //Fetch All Subscribed Policies)
     console.log('jsonData', JSON.stringify(data))
      this.http.post(Constants.BASE_URL+'/insurance/getallpolicy/', JSON.stringify(data))
        .subscribe((resp: Policy[]) => {
          console.log('resp ', resp);
          resp.map(policy => {
            policy.startDate = new Date(policy.startDate)
            policy.endDate = new Date(policy.endDate)
            policy.createdAt = new Date(policy.createdAt) 
            this.myPolicies.push(policy)
            console.log('Policy ',policy)
          })
          console.log('this.myPolicies ', this.myPolicies)

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
    loadingMyPolicies.dismiss(() => {
      if (errorFound)
        toastFail.present()
    })
  }


}
