import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { take, map } from 'rxjs/operators';

export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  image: string;
}

export const UsersServiceMock = {
  items$: of([]),
  find: (id: string) => of(null)
};

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  public items$ = new BehaviorSubject<User[]>([]);

  constructor() {
    const users: User[] = [1, 2].map(n => {
      return {
        _id: `book-id-${n}`,
        name: `Autor número ${n}`,
        email: `contact${n}@angelxehg.com`,
        role: 'user',
        image: 'https://github.com/angelxehg.png?size=150'
      };
    });
    this.items$.next(users);
  }

  public find(id: string): Promise<User> {
    return this.items$.pipe(
      take(1),
      map(all => {
        const item = all.find(e => e._id === id);
        return item;
      })
    ).toPromise();
  }
}
