import { Component, OnInit } from '@angular/core';
import { Contact } from '../../models/contact';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { JSONReaderService } from '../../services/jsonreader.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  private contactsExist: boolean;
  private contacts: Array<Contact>;

  private selectedChat: Subject<string>;
  public selectedChat$: Observable<string>;

  constructor(private jsonReader: JSONReaderService) {
    this.contacts = new Array<Contact>();
    this.selectedChat = new Subject<string>();
    this.selectedChat$ = this.selectedChat.asObservable();
  }

  ngOnInit() {
    this.initContacts();
  }

  private initContacts() {
    this.getContacts().subscribe((ret: Contact) => {
      let response: [any] = ret["contacts"];
      
      for (let i = 0; i < response.length; i++) {
        this.contacts.push(new Contact(response[i]["name"], response[i]["file"]));
      }

      if (this.contacts.length == 0) {
        this.contactsExist = false;
      } else {
        this.contactsExist = true;
      }
    })
  }

  private getContacts(): Observable<Contact> {
    let fileName: string;

    if (environment.debug) {
      fileName = environment.contactsFileDebug;
    } else {
      fileName = environment.contactsFileProd;
    }

    return this.jsonReader.readFile(fileName);
  }

  private import() {
    alert("IMPLEMENT IMPORT");
  }

  private merge() {
    alert("IMPLEMENT MERGE");
  }

  private click(data: string) {
    this.selectedChat.next(data);
  }
}
