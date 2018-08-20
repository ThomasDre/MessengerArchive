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

  constructor(private jsonReader: JSONReaderService) {
  
   }
  
  ngOnChanges() {
    this.initChatData();
  }

  private initChatData() {
    
    /* open selcted html file (parsed chat) and return DOCUMENT type of it  */

    if (this.selectedChat != null) {

    
      var client = new XMLHttpRequest();
      client.open('GET', environment.chatFolder + this.selectedChat);
      client.responseType = "document";
      client.onreadystatechange = () => {
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
