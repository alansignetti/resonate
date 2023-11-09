import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../interfaces/contact-interface';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
})
export class ContactListComponent implements OnInit {
  public contacts: Contact[] = [];
  public filteredContacts: Contact[] = [];
  public panelOpenState = false;

  constructor(private contactService: ContactService) {}

  public ngOnInit() {
    this.contactService.getContacts().subscribe((response: Contact[]) => {
      this.contacts = response;
      this.filteredContacts = [...response]; // Initially, shows all contacts
    });
  }

  // Filter function
  public filterContacts(searchTerm: string) {
    if (searchTerm) {
      this.filteredContacts = this.contacts.filter((contact) => {
        return (
          contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          contact.phone.includes(searchTerm) ||
          contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          contact.username.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
    } else {
      this.filteredContacts = [...this.contacts]; // If no search term is provided, display all contacts.
    }
  }

  public onSearchValueChanged(searchTerm: string) {
    this.filterContacts(searchTerm);
  }
}
