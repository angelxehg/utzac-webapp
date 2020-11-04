import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, EMPTY } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  skip = ['/auth/login', '/auth/register'];

  constructor(private auth: AuthService) { }

  skipRequest(request: HttpRequest<any>): boolean {
    let skip = false;
    this.skip.forEach(url => {
      if (request.url.includes(url)) {
        console.log('Skip request');
        return skip = true;
      }
    });
    return skip;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let request = req;
    if (this.skipRequest(request)) {
      return next.handle(request);
    }
    const token = this.auth.token();
    if (!token) {
      console.error('No token! canceling request!');
      return EMPTY;
    }
    console.log('Request intercepted');
    request = req.clone({
      setHeaders: { authorization: `${token}` }
    });
    return next.handle(request);
  }
}
