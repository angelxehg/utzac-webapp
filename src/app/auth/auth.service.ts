import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import { JwtHelperService } from "@auth0/angular-jwt";
import { map } from 'rxjs/operators';
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

interface TokenResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api = 'http://localhost:8000';

  private currentUser: User;

  constructor(private http: HttpClient, private router: Router) {
    const token = localStorage.getItem('JWT_TOKEN');
    if (token) {
      this.currentUser = this.solveToken(token);
    }
  }

  public user(): User {
    if (!this.currentUser) {
      return null;
    }
    return this.currentUser;
  }

  private solveToken(token: string): User {
    return {
      _id: 'x',
      name: 'Angel Hurtado',
      email: 'contact@angelxehg.com',
      role: 'admin',
      image: 'https://github.com/angelxehg.png?size=150'
    };
  }

  public login(credential: Credential): Promise<User> {
    return this.http.post<TokenResponse>(`${this.api}/api/auth/login`, credential).pipe(
      map(response => {
        this.currentUser = this.solveToken(response.token);
        localStorage.setItem('JWT_TOKEN', response.token);
        return this.currentUser;
      })
    ).toPromise();
  }

  public register(credential: Credential): void {
    if (credential.password === '') {
      return;
    }
    if (credential.password !== credential.passwordConfirmation) {
      return;
    }
  }

  public logout(): void {
    this.currentUser = null;
    localStorage.removeItem('JWT_TOKEN');
    this.router.navigateByUrl('/auth');
  }
}
