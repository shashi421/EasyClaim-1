import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Policy } from '../../modals/Policy';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../../modals/Constants';
import { CreatePolicyAdminPage } from '../create-policy-admin/create-policy-admin';

@Component({
  selector: 'page-policy-admin',
  templateUrl: 'policy-admin.html',
})
export class PolicyAdminPage {

  myPolicies: Policy[] = []

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private http: HttpClient) 
    {
      console.log('ionViewDidLoad PolicyAdminPage constructor');
      this.fetchPolicies()
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad PolicyAdminPage');
    
  }

  fetchPolicies(){
    //fetch all policies available
    this.http.get(Constants.BASE_URL + '/insurance/getallpolicyforadmin/')
        .subscribe((resp: Policy[]) => {
          console.log('resp ', resp);
          resp.map(policy => {
            policy.startDate = new Date(policy.startDate)
            policy.endDate = new Date(policy.endDate)
            policy.createdAt = new Date(policy.createdAt) 
            this.myPolicies.push(policy)
          })
          console.log('this.claims ', this.myPolicies)
          
        }, err => {
          console.log('Error ', err)
        })
  }

  createNewPolicy(){
    console.log('createNewPolicy PolicyAdminPage');
    this.navCtrl.push(CreatePolicyAdminPage)
  }

}
