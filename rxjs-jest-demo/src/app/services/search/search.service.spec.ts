import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SearchService } from './search.service';

describe('SearchService', () => {
  let service: SearchService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SearchService]
    });

    service = TestBed.inject(SearchService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should return search results', () => {
    const mockUsers = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
    
    service.searchUsers('Alice').subscribe(users => {
      expect(users.length).toBe(2);
      expect(users).toEqual(mockUsers);
    });

    const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/users?q=Alice');
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });

  it('should return empty array if query is empty', () => {
    service.searchUsers('').subscribe(users => {
      expect(users).toEqual([]);
    });
  });
});
