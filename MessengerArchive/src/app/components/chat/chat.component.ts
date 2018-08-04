import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ChatExchange } from '../../models/chat-exchange';

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
  private chat: [ChatExchange] = [null];
  private chatBubbles: [Element];


  constructor() {
    this.parser = new DOMParser();
   }

  ngOnChanges() {
    /* open selcted html file (parsed chat) and create datastructure (array) that possess chat's messages  */
    var client = new XMLHttpRequest();
    client.open('GET', this.selectedChat);
    client.onreadystatechange = () => {
      let text = client.responseText;
      this.document = this.parser.parseFromString(text, "text/html");
      this.chatBubbles = Array.prototype.slice.call(this.document.getElementsByClassName("chatBubble"),0);
      
      /* TODO: Bug in the following line -> error produces upon selection of a chat */
      for (let i = 0; i < this.chatBubbles.length; i++) {
       this.chat[i] = new ChatExchange(this.chatBubbles[i].getElementsByClassName("sender")[0].textContent, this.chatBubbles[i].getElementsByClassName("message")[0].textContent);
      }

    }

    client.send();

  }


}
