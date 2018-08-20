import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private readonly serverURL;

  constructor(private http: HttpClient) {
    this.serverURL = environment.server;
   }

   public saveChat(document: Document, isGroup: string, chatName: string, chatMembers: string[]): Observable<Object> {
     return this.http.post(this.serverURL + "/saveChat", document.getElementById("find").outerHTML, { params: { ["group"]: isGroup, ["name"]: chatName, ["members"]: chatMembers }});
   }
}
