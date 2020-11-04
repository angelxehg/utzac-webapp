import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { map, take } from 'rxjs/operators';

export interface Author {
  _id: string;
  name: string;
  country: string;
}

export const AuthorsServiceMock = {
  items$: of([]),
  find: (id: string) => of(null)
};

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {

  public items$ = new BehaviorSubject<Author[]>([]);

  constructor() {
    const authors: Author[] = [1, 2, 3].map(n => {
      return {
        _id: `book-id-${n}`,
        name: `Autor número ${n}`,
        country: 'Meméxico'
      };
    });
    this.items$.next(authors);
  }

  public find(id: string): Promise<Author> {
    return this.items$.pipe(
      take(1),
      map(all => {
        const item = all.find(e => e._id === id);
        return item;
      })
    ).toPromise();
  }
}
