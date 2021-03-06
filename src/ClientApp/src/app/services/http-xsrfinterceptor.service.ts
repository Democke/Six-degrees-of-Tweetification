import { Injectable } from '@angular/core';
import {
    HttpXsrfTokenExtractor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
/**
 * @example Intercepts front-end http traffic and adds an anti XSRF Token to HTTP headers
 */
@Injectable()
export class HttpXsrfInterceptorService implements HttpInterceptor {
    constructor(private tokenService: HttpXsrfTokenExtractor) {}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const headerName = 'X-XSRF-TOKEN';
        const lcUrl = req.url.toLowerCase();
        if (req.method === 'GET' || req.method === 'HEAD') {
            return next.handle(req);
        }
        // DO NOT skip absolute URLs.
        const token = this.tokenService.getToken();

        // Be careful not to overwrite an existing header of the same name.
        if (token !== null && !req.headers.has(headerName)) {
            req = req.clone({ headers: req.headers.set(headerName, token) });
        }
        return next.handle(req);
    }
}
