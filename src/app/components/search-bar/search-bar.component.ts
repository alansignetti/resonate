import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  @Output() searchValueChanged = new EventEmitter<string>();
  public searchForm: FormGroup = new FormGroup({
    // Reactive Forms combined with Angular Material
    contactSearched: new FormControl(''),
  });

  constructor(private fb: FormBuilder) {
    this.initForm();
    this.searchForm
      .get('contactSearched')
      ?.valueChanges.subscribe((searchTerm: string) => {
        this.searchValueChanged.emit(searchTerm);
      });
  }
  ngOnInit(): void {}

  private initForm() {
    this.searchForm = this.fb.group({
      contactSearched: [''],
    });
  }
}
