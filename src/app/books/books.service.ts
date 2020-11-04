import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { find, map, switchMap, take } from 'rxjs/operators';

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

  public items$ = new BehaviorSubject<Book[]>([]);

  constructor() {
    const books: Book[] = [1, 2, 3, 4, 5].map(n => {
      return {
        _id: `book-id-${n}`,
        title: `Libro número ${n}`
      };
    });
    this.items$.next(books);
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
