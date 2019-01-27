import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Claim } from '../../modals/Claim';


@Injectable()
export class ClaimProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ClaimProvider Provider');
  }

  getDummyClaim(){
    // return [
    //   new Claim(1111,11111,'Car', 'Clame-1', false, new Date()),
    //   new Claim(2222,11111,'Home', 'Clame-2', true, new Date()),
    //   new Claim(1111,2222,'Car', 'Clame-3', false, new Date()),
    //   new Claim(1111,11111,'Car', 'Clame-4', false, new Date()),
    // ]
    return []
  }

}
