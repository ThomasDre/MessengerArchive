import { Component, OnInit, ViewChild } from '@angular/core';
import { ContactsComponent } from '../contacts/contacts.component';
import { ChatComponent } from '../chat/chat.component';

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

  constructor() { }

  ngOnInit() {
  }

}
