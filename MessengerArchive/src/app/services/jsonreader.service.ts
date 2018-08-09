import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from '../models/contact';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class JSONReaderService {

  constructor(private http: HttpClient) { }

  public readFile(fileName: string): Observable<Contact> {
    return this.http.get<Contact>(environment.contactFolder + fileName);
  }
}
