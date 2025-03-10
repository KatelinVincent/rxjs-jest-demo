import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, debounceTime, map, Observable, of, switchMap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SearchService {
  private API_URL = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) {}

  searchUsers(query: string): Observable<any[]> {
    if (!query.trim()) {
      return of([]); // Return empty array if query is empty
    }

    return this.http.get<any[]>(`${this.API_URL}?q=${query}`).pipe(
      debounceTime(500), // Reduce API calls
      map(users => users.slice(0, 5)), // Limit results
      catchError(() => of([])) // Handle errors
    );
  }
}
