import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../users/users.service';

export const AuthServiceMock = {
  user: () => null,
  login: () => { },
  logout: () => { }
};

export interface Credential {
  name?: string;
  email: string;
  password: string;
  passwordConfirmation?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUser: User;

  constructor(private router: Router) {
    try {
      const user: User = JSON.parse(localStorage.getItem('USER_DATA'));
      this.currentUser = user;
    } catch (error) {
      this.currentUser = null;
    }
  }

  public user(): User {
    if (!this.currentUser) {
      return null;
    }
    return this.currentUser;
  }

  public login(credential: Credential): void {
    this.currentUser = {
      _id: 'x',
      name: 'Angel Hurtado',
      email: credential.email,
      role: 'admin',
      image: 'https://github.com/angelxehg.png?size=150'
    };
    localStorage.setItem('USER_DATA', JSON.stringify(this.currentUser));
    this.router.navigateByUrl('/app');
  }

  public register(credential: Credential): void {
    if (credential.password === '') {
      return;
    }
    if (credential.password !== credential.passwordConfirmation) {
      return;
    }
    this.currentUser = {
      _id: 'x',
      name: credential.name,
      email: credential.email,
      role: 'admin',
      image: 'https://github.com/angelxehg.png?size=150'
    };
    localStorage.setItem('USER_DATA', JSON.stringify(this.currentUser));
    this.router.navigateByUrl('/app');
  }

  public logout(): void {
    this.currentUser = null;
    localStorage.removeItem('USER_DATA');
    this.router.navigateByUrl('/auth');
  }
}
