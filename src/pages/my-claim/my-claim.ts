import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ToastController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Claim } from '../../modals/Claim';
import { ClaimProvider } from '../../providers/claim/claim';
import { DashboardPage } from '../dashboard/dashboard';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { Constants } from '../../modals/Constants';

@Component({
  selector: 'page-my-claim',
  templateUrl: 'my-claim.html',
})
export class MyClaimPage {

  claims: Claim[] = []

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private claimSrvc: ClaimProvider,
    private http: HttpClient,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
  ) {
  }

  createNewClaim(){
    console.log('createNewClaim MyClaimPage');
    this.navCtrl.push(DashboardPage)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyClaimPage');

    //Fetch username from session
    let user = sessionStorage.getItem('user')

    let data = {
      user_id: JSON.parse(user).user_id
    }

    let errorFound: boolean = false
    let toastFail;

    //loading component
    let loadingClaims = this.loadingCtrl.create({
      content: "Loading Claims",
    })
    loadingClaims.present().then(() => {
      //Fetch All  claims
      console.log('jsonData', JSON.stringify(data))
      this.http.post(Constants.BASE_URL+'/claim/getclaims/', JSON.stringify(data))
        .subscribe((resp: Claim[]) => {
          console.log('resp ', resp);
          resp.map(claim => {
            claim.createdAt = new Date(claim.createdAt) 
            this.claims.push(claim)
          })
          console.log('this.claims ', this.claims)

        }, err => {
          console.log('Error ', err)
          toastFail = this.toastCtrl.create({
            message: err.error['error message'],
            cssClass: 'toastFail',
            duration: 3000
          })

          errorFound = true
        })
    })
    loadingClaims.dismiss(() => {
      if (errorFound)
        toastFail.present()
    })
  }


}
