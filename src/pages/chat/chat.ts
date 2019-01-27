import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Chat } from '../../modals/Chat';
import { ChatProvider } from '../../providers/chat/chat';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../../modals/Constants';


@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  @ViewChild('content') content: any;

  chats: Chat[] = [];
  msg: string = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private chatProvider: ChatProvider,
    public http: HttpClient) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }

  send() {
    let chat = new Chat(this.msg, new Date(), 'user')
    this.chats.push(chat)

    let data = { question: this.msg }

    console.log('jsonData', JSON.stringify(data))

    this.http.post(Constants.BASE_URL + '/dialogflow/idealweight/', JSON.stringify(data))
      .subscribe((resp:string) => {
        chat = new Chat(resp, new Date(), 'bot')
        this.chats.push(chat)
        console.log('resp ', resp);
      }, err => {
        console.log('Error ', err)
      })

    this.msg = ''
    this.content.scrollToBottom(300);//300ms animation speed
  }

}
