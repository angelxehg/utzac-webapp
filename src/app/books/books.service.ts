import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { find, map, switchMap, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export interface Book {
  _id: string;
  title: string;
}

export const BooksServiceMock = {
  items$: of([]),
  find: (id: string) => of(null)
};

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private api = environment.apiUrl;

  public items$ = new BehaviorSubject<Book[]>([]);

  constructor(private http: HttpClient) {
    try {
      const books: Book[] = JSON.parse(localStorage.getItem('BOOKS'));
      this.items$.next(books);
    } catch (error) {
      localStorage.removeItem('BOOKS');
    }
  }

  public index(): Promise<Book[]> {
    return this.http.get<Book[]>(`${this.api}/books`).pipe(
      map(data => {
        this.items$.next(data);
        localStorage.setItem('BOOKS', JSON.stringify(data));
        return data;
      })
    ).toPromise();
  }

  public find(id: string): Promise<Book> {
    return this.items$.pipe(
      take(1),
      map(all => {
        const item = all.find(e => e._id === id);
        return item;
      })
    ).toPromise();
  }
}
