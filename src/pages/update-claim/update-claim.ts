import { Component } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Claim } from '../../modals/Claim';
import { MyClaimPage } from '../my-claim/my-claim';
import { Constants } from '../../modals/Constants';

@Component({
  selector: 'page-update-claim',
  templateUrl: 'update-claim.html',
})
export class UpdateClaimPage {
  claim: Claim

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public toastCtrl: ToastController,
    private http: HttpClient) {

    let claimId = sessionStorage.getItem('claimId');

    this.getClaimFromId(claimId)
    console.log('this.claim ', this.claim)
  }

  getClaimFromId(claimId){
    console.log('getClaimFromId UpdateClaimPage');
    
    let toastFail = this.toastCtrl.create({
      message: 'No Record Found for Claim Id ' + claimId,
      duration: 2000,
      cssClass: 'toastFail',
    })

    this.http.post(Constants.BASE_URL+'/claim/getclaimbyid/', JSON.stringify(this.claim))
    .subscribe(resp => {
      console.log('resp ', resp);
  
      },err => {
        console.log('Error ', err)
        
        toastFail.present()
      })

      toastFail.dismiss(() => {
        this.closeClaimForm()
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdateClaimPage');
  }

  closeClaimForm(){
    console.log('closeClaimForm UpdateClaimPage');

    sessionStorage.removeItem('claimId');
    this.navCtrl.setRoot(MyClaimPage)
  }

  updateClaim(){
    console.log('updateClaim UpdateClaimPage');

    let toast = this.toastCtrl.create({
      message: 'Claim updated successfully',
      duration: 2000,
      cssClass: 'toastSuccess'
    })

    //Fetch username from session and setting default values for variables
    let user = sessionStorage.getItem('user')
    this.claim.user_id = JSON.parse(user).user_id
    this.claim.status = 'In Progress'
    this.claim.isApproved = false

    //save in DB
    console.log('jsonData', JSON.stringify(this.claim))

    this.http.post(Constants.BASE_URL+'/claim/updateclaim/', JSON.stringify(this.claim))
    .subscribe(resp => {
      console.log('resp ', resp);
      toast.present()

    },err => {
        console.log('Error ', err)

        toast = this.toastCtrl.create({
          message: err.error['error'],
          duration: 2000,
          cssClass: 'toastFail',
        })
        toast.present()
      })

    toast.onDidDismiss(() =>{
      this.closeClaimForm()  
    })
    

  }

}
