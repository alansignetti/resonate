import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../interfaces/contact-interface';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
})
export class ContactListComponent implements OnInit {
  public contacts: Contact[] = [];
  public filteredContacts: Contact[] = [];
  public faMagnifyingGlass = faMagnifyingGlass;

  constructor(private contactService: ContactService) {}

  public ngOnInit() {
    this.contactService.getContacts().subscribe((response: Contact[]) => {
      this.contacts = response;
      this.filteredContacts = [...response]; // Initially, shows all contacts
    });
  }

  // Filter function
  public filterContacts(searchEvent: any) {
    const searchTerm = searchEvent.target.value;
    if (searchTerm) {
      this.filteredContacts = this.contacts.filter((contact) => {
        return (
          contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          contact.phone.includes(searchTerm)
        );
      });
    } else {
      this.filteredContacts = [...this.contacts]; // If no search term is provided, display all contacts.
    }
  }
}
