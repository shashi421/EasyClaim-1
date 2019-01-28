import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Policy } from '../../modals/Policy';


@Injectable()
export class PolicyProvider {

  constructor(public http: HttpClient) {
    console.log('Hello PolicyProvider Provider');
  }

  getDummyNewPolicies(){
    return [
    ]
  }

  getAllNewPolicy(){
    this.sleep(3000)
    return this.getDummyNewPolicies();
  }


  sleep(miliseconds ) {
    let currentTime = new Date().getTime();
 
    while (currentTime + miliseconds >= new Date().getTime()) {
    }
 }
}
