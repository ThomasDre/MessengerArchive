import { Component, OnInit, ViewChild } from '@angular/core';
import { ContactsComponent } from '../contacts/contacts.component';
import { ChatComponent } from '../chat/chat.component';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  @ViewChild(ContactsComponent)
  private contactsComponent: ContactsComponent;

  @ViewChild(ChatComponent)
  private chatComponent: ChatComponent;

  private selectedChat: string;

  constructor() { 
    
  }

  ngOnInit() {
    this.contactsComponent.selectedChat$.subscribe(data => {
      this.selectedChat = data;
    })
  }

}
