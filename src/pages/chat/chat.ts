import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Chat } from '../../modals/Chat';
import { ChatProvider } from '../../providers/chat/chat';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../../modals/Constants';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { CreateClaimPage } from '../create-claim/create-claim';
import { UpdateClaimPage } from '../update-claim/update-claim';
import { MyPolicyPage } from '../my-policy/my-policy';


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
    public http: HttpClient,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
    
    this.http.post(Constants.BASE_URL + '/dialogflow/idealweight/', {"question":"hello"})
    .subscribe((resp:string) => {
      this.chats.push(new Chat(resp, new Date(), 'bot'))
      console.log('resp ', resp);
    }, err => {
      console.log('Error ', err)
    })


  }

  openUrl(chat: Chat){
    window.open(chat.msg, '_system')
  }

  send() {
    let chat = new Chat(this.msg, new Date(), 'user')
    this.chats.push(chat)

    let data = { question: this.msg }

    console.log('jsonData', JSON.stringify(data))

    let loadingCreate = this.loadingCtrl.create({
      content: 'Redirecting to Create Claim Page',
      duration: 2000
    })
    
    let loadingUpdate = this.loadingCtrl.create({
      content: 'Redirecting to Update Claim Page',
      duration: 2000
    })

    loadingCreate.dismiss(() => {
      this.navCtrl.setRoot(MyPolicyPage)
    })

    loadingUpdate.dismiss(() => {
      this.navCtrl.setRoot(UpdateClaimPage)
    })

    this.http.post(Constants.BASE_URL + '/dialogflow/idealweight/', JSON.stringify(data))
      .subscribe((resp:string) => {

        this.chatHandler(resp, loadingCreate, loadingUpdate)

        console.log('resp ', resp);
      }, err => {
        console.log('Error ', err)
      })

    this.msg = ''
    this.content.scrollToBottom(300);//300ms animation speed
  }

  chatHandler(msg:string, loadingCreate, loadingUpdate){
    let isValidMsg: boolean = msg !== undefined || msg !== null
 
    if(isValidMsg && msg.toLowerCase().startsWith('update') && msg.split(' ').length === 2){
      let arr = msg.split(' ')
      sessionStorage.setItem('claimId', arr[1])
      loadingUpdate.present()
 
    }else if(isValidMsg && msg.toLowerCase().startsWith('create') && msg.split(' ').length === 1){
      loadingCreate.present()
 
    }else if(isValidMsg){
      let chat = new Chat(msg, new Date(), 'bot')
      this.chats.push(chat)
    }
  }
}
