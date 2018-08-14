import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ChatExchange } from '../../models/chat-exchange';
import { environment } from '../../../environments/environment';
import { JSONReaderService } from '../../services/jsonreader.service';
import { Contact } from '../../models/contact';
import { Observable } from 'rxjs';
import { element } from 'protractor';
import * as $ from 'jquery';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnChanges {

  /* available chats shown in contacts template -> selection is */
  @Input() selectedChat: string = null;
  @Input() picture: string = null;

  private parser: DOMParser;
  //private document: Document;
  private chat: Array<ChatExchange>;
  private chatBubbles: [Element];

  private contactsMap: Map<string, string>;


  constructor(private jsonReader: JSONReaderService) {
    this.parser = new DOMParser();
    this.chat = new Array<ChatExchange>();
    this.contactsMap = new Map<string, string>();
   }

  
  ngOnChanges() {
    this.initChatData();
  }

  private initChatData() {
    /*
    // init chat member map (username mapped to userpic) 
    this.getContacts().subscribe((ret: Contact) => {
      let response = ret["contacts"];
      let members: [any];

      // find current chat save its members temporarily 
      for (let i = 0; i < response.length; i++) {
        if (response[i]["file"] == this.selectedChat) {
          members = response[i]["members"];
        }
      }

      for (let i = 0; i < members.length; i++) {
        this.contactsMap.set(members[i]["user"], members[i]["pic"]);
      }
    }) */
    
    
    /* open selcted html file (parsed chat) and create datastructure (array) that possess chat's messages  */
    var client = new XMLHttpRequest();
    client.open('GET', environment.chatFolder + this.selectedChat);
    client.responseType = "document";
    client.onreadystatechange = () => {
      /*
      let text = client.responseText;
      this.document = this.parser.parseFromString(text, "text/html");
      this.chatBubbles = Array.prototype.slice.call(this.document.getElementsByClassName("chatBubble"),0);  
      
      for (let i = 0; i < this.chatBubbles.length; i++) {
        let sender: string = this.chatBubbles[i].getElementsByClassName("sender")[0].textContent;
        let attr: string = this.chatBubbles[i].getAttributeNode("class").value.replace("chatBubble ", "");
        let senderPic: string =  this.contactsMap.get(sender);

        /// only otherUsers (i.e. not main user) have a profile picture
        if (attr == 'otherUser' && senderPic == undefined) {
          alert("BEWARE: PIC DECLARATION MISSING IN CONFIQFILE FOR CHAT MEMBER {" + sender + "} - SET DEfAULT");
          senderPic = environment.picFolder + "default/avatar.svg";
        } else if (attr == 'otherUser') {
          senderPic = environment.picFolder + senderPic;
        }

        this.chat[i] = new ChatExchange(sender, this.chatBubbles[i].getElementsByClassName("message")[0].textContent, attr, i, senderPic);
      } */
      let html: Document = client.response;
      
      if (html != null) {
        let chat = html.getElementById("chat");
        if (chat != null) {
          $('#chatContainer').html(chat.outerHTML);
        } 
      }
    }

    client.send();
  }

  private getContacts(): Observable<Contact> {
    let filename;

    if (environment.debug) {
      filename = environment.contactsFileDebug;
    } else {
      filename = environment.contactsFileProd;
    }

    return this.jsonReader.readFile(filename);
  }
}
