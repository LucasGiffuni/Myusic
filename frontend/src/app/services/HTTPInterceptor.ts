import { Injectable, inject, Optional } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { CookieService } from './cookie.service';
@Injectable()
export class HTTPInterceptor implements HttpInterceptor {

  cookieService: CookieService = inject(CookieService);

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.cookieService.get("SESSIONID");
    req = req.clone({
      url:  req.url,
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next.handle(req);
  }
}
