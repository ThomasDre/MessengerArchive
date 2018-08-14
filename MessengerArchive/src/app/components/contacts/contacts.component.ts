import { Component, OnInit } from '@angular/core';
import { Contact } from '../../models/contact';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { JSONReaderService } from '../../services/jsonreader.service';
import { ParsePlainChatService } from '../../services/parse-plain-chat.service';

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

  private picture: Subject<string>;
  public picture$: Observable<string>;

  constructor(private jsonReader: JSONReaderService, private chatParser: ParsePlainChatService) {
    this.contacts = new Array<Contact>();
    this.selectedChat = new Subject<string>();
    this.selectedChat$ = this.selectedChat.asObservable();
    this.picture = new Subject<string>();
    this.picture$ = this.picture.asObservable();
  }

  ngOnInit() {
    this.initContacts();
  }

  private initContacts() {
    this.getContacts().subscribe((ret: Contact) => {
      let response: [any] = ret["contacts"];
      
      for (let i = 0; i < response.length; i++) {
        /* load only contacts that have an existing chat */
        if (response[i]["file"] != "") {
          this.contacts.push(new Contact(response[i]["name"], response[i]["file"], environment.picFolder + response[i]["pic"]));
        }
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

  private selectChat(data: Contact) {
    this.selectedChat.next(data.file);
    this.picture.next(data.pic);
  }
}
