import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Policy } from '../../modals/Policy';


@Injectable()
export class PolicyProvider {

  constructor(public http: HttpClient) {
    console.log('Hello PolicyProvider Provider');
  }

  getDummyNewPolicies(){
    return [new Policy(12345, 'Policy1', new Date(), new Date(), 12300.45, new Date()),
            new Policy(13454, 'Policy2', new Date(), new Date(), 13400.45, new Date()),
            new Policy(15345, 'Policy3', new Date(), new Date(), 11250.45, new Date()),
            new Policy(22124, 'Policy4', new Date(), new Date(), 42300.45, new Date()),
            new Policy(23554, 'Policy5', new Date(), new Date(), 53600.45, new Date()),
            new Policy(35645, 'Policy6', new Date(), new Date(), 31250.45, new Date()),
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
