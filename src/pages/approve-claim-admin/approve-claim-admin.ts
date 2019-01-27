import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Claim } from '../../modals/Claim';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { Constants } from '../../modals/Constants';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'page-approve-claim-admin',
  templateUrl: 'approve-claim-admin.html',
})
export class ApproveClaimAdminPage {

  claims: Claim[] = []

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private http: HttpClient) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ApproveClaimAdminPage');

    //fetch all claims to approved from db
    this.http.get(Constants.BASE_URL + '/claim/getclaimsforadmin/')
        .subscribe((resp: Claim[]) => {
          console.log('resp ', resp);
          resp.map(claim => {
            claim.createdAt = new Date(claim.createdAt) 
            this.claims.push(claim)
          })
          console.log('this.claims ', this.claims)
          
        }, err => {
          console.log('Error ', err)
        })
  }

  approveClaim(claim: Claim) {
    console.log('approveClaim ApproveClaimAdminPage ', claim)
    if (this.approveConfirm(claim)) {
      claim.isApproved = true

      //save in DB
      console.log('jsonData', JSON.stringify(claim))
      this.http.post(Constants.BASE_URL + '/claim/updateclaim/', JSON.stringify(claim))
        .subscribe(resp => {
          console.log('resp ', resp);
          //remove from Array
          this.claims = this.claims.filter((claimFromArr) => claimFromArr.claimId !== claim.claimId)
        }, err => {
          console.log('Error ', err)
        })


    }
  }

  approveConfirm(claim: Claim) {

    const confirm = this.alertCtrl.create({
      title: 'Approve',
      message: 'Do you want to approve claim ' + claim.claimName,
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Disagree clicked');
            return false
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
