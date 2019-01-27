import { Component } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Claim } from '../../modals/Claim';
import { MyClaimPage } from '../my-claim/my-claim';
import { Constants } from '../../modals/Constants';

@Component({
  selector: 'page-create-claim',
  templateUrl: 'create-claim.html',
})
export class CreateClaimPage {

  claim: Claim

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public toastCtrl: ToastController,
    private http: HttpClient) {

    let policyId = sessionStorage.getItem('policyId');

    this.claim = new Claim();
    if(policyId !== undefined){
      this.claim.policyId=policyId;
    }
    console.log('this.claim ', this.claim)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateClaimPage');
  }

  closeClaimForm(){
    console.log('closeClaimForm CreateClaimPage');

    sessionStorage.removeItem('policyId');
    this.navCtrl.pop();
  }

  createNewClaim(){
    console.log('createNewClaim CreateClaimPage');

    let toast = this.toastCtrl.create({
      message: 'Claim created successfully',
      duration: 3000,
      cssClass: 'toastSuccess'
    })

    //Fetch username from session and setting default values for variables
    let user = sessionStorage.getItem('user')
    this.claim.user_id = JSON.parse(user).user_id
    this.claim.status = 'In Progress'
    this.claim.isApproved = false

    //save in DB
    console.log('jsonData', JSON.stringify(this.claim))

    this.http.post(Constants.BASE_URL+'/claim/createclaim/', JSON.stringify(this.claim))
    .subscribe(resp => {
      console.log('resp ', resp);
      toast.present()

    },err => {
        console.log('Error ', err)

        toast = this.toastCtrl.create({
          message: err.error['error message'],
          duration: 3000,
          cssClass: 'toastFail',
        })
        toast.present()
      })

    toast.onDidDismiss(() =>{
      this.navCtrl.setRoot(MyClaimPage, {}, {animate: true, direction: 'forward'});
    })
    

  }

}
