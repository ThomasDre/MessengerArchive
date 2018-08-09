import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ChatExchange } from '../../models/chat-exchange';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnChanges {

  /* available chats shown in contacts template -> selection is */
  @Input() selectedChat: string = null;

  private parser: DOMParser;
  private document: Document;
  private chat: Array<ChatExchange>;
  private chatBubbles: [Element];


  constructor() {
    this.parser = new DOMParser();
    this.chat = new Array<ChatExchange>();
   }

  
  ngOnChanges() {
    /* open selcted html file (parsed chat) and create datastructure (array) that possess chat's messages  */
    var client = new XMLHttpRequest();
    client.open('GET', environment.chatFolder + this.selectedChat);
    client.onreadystatechange = () => {
      let text = client.responseText;
      this.document = this.parser.parseFromString(text, "text/html");
      this.chatBubbles = Array.prototype.slice.call(this.document.getElementsByClassName("chatBubble"),0);
      
      for (let i = 0; i < this.chatBubbles.length; i++) {
        this.chat[i] = new ChatExchange(this.chatBubbles[i].getElementsByClassName("sender")[0].textContent, this.chatBubbles[i].getElementsByClassName("message")[0].textContent);
      }
    }

    client.send();
  }
}
