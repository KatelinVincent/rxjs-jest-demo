import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SearchService } from '../../services/search/search.service';
import { debounceTime, filter, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [NgFor, ReactiveFormsModule, HttpClientModule],
  templateUrl: './search.component.html', 
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchControl = new FormControl('');
  results: any[] = [];

  constructor(private searchService: SearchService) {
    this.searchControl.valueChanges.pipe(
      debounceTime(500),
      filter(query => query !== null),
      switchMap(query => this.searchService.searchUsers(query as string))
    ).subscribe(users => this.results = users);
  }
}