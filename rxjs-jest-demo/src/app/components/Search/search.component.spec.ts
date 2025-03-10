import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { SearchComponent } from './search.component';
import { SearchService } from '../../services/search/search.service';
import { ReactiveFormsModule } from '@angular/forms';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let mockSearchService: jasmine.SpyObj<SearchService>;

  beforeEach(() => {
    mockSearchService = jasmine.createSpyObj('SearchService', ['searchUsers']);

    TestBed.configureTestingModule({
      declarations: [SearchComponent],
      imports: [ReactiveFormsModule],
      providers: [{ provide: SearchService, useValue: mockSearchService }]
    });

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
  });

  it('should update results when search input changes', () => {
    const mockUsers = [{ id: 1, name: 'Alice' }];
    mockSearchService.searchUsers.and.returnValue(of(mockUsers));

    component.searchControl.setValue('Alice');
    fixture.detectChanges();

    expect(component.results).toEqual(mockUsers);
  });
});
