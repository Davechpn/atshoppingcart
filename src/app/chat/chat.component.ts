import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  chat_open:boolean;
  message;
  decoder;
  messages = []
  constructor(private fns:AngularFireFunctions) { 
    this.decoder = this.fns.httpsCallable("decode");
  }

  ngOnInit() {
    this.chat_open = false  
  }

  closeChat(){
    this.chat_open = false
  }

  openChat(){
    this.chat_open = true
  }
  sendMessage(){
    //const sendMsg  =  "asgas"
    console.log("sendng massage:"+ this.message)
    this.messages.push({
      msg:this.message,admin:false
    })
    this.decoder({'message':this.message}).subscribe(x=>{ this.messages.push({
      msg:x,admin:true
    })})
    this.message = "";
  }

}
