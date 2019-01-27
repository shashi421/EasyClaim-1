import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Chat } from '../../modals/Chat';


@Injectable()
export class ChatProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ChatProvider Provider');
  }

  returnResponse(chat:Chat){
    return new Chat('Hi', new Date(), 'bot')
  }

}
