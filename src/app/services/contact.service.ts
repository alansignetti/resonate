import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from '../interfaces/contact-interface';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private contactsURL = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) {}

  public getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.contactsURL);
  }
}
