import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../interfaces/contact-interface';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
})
export class ContactListComponent implements OnInit {
  public contacts: Contact[] = [];
  public filteredContacts: Contact[] = [];
  public faMagnifyingGlass = faMagnifyingGlass;
  public searchForm: FormGroup = new FormGroup({
    contactSearched: new FormControl(''),
  });

  constructor(private contactService: ContactService, private fb: FormBuilder) {
    this.initForm();
    this.searchForm
      .get('contactSearched')
      ?.valueChanges.subscribe((searchTerm: string) => {
        this.filterContacts(searchTerm);
      });
  }

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
          contact.phone.includes(searchTerm)
        );
      });
    } else {
      this.filteredContacts = [...this.contacts]; // If no search term is provided, display all contacts.
    }
  }

  private initForm() {
    this.searchForm = this.fb.group({
      contactSearched: [''],
    });
  }
}
