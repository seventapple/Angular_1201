import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse, HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoadingService } from './modules/loading/loading.service';
import { catchError, tap } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs-compat/observable/ErrorObservable';
import { HttpService } from './services/http.service';

@Injectable()
export class AppInterceptor implements HttpInterceptor {

  constructor(private loadingService: LoadingService,
              private httpService: HttpService) {
  }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<any> {
    console.log('ApInterceptro: ' + req.url);
    this.loadingService.showWaiting();
    return next.handle(req).pipe(tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.loadingService.hideWaiting();
          console.log('------------------- Response OK -------------------');
          return event;
        }
      }
    ), catchError((error => {
      if (error instanceof HttpErrorResponse) {
        this.loadingService.hideWaiting();
        console.log('------------------- Response ERROR -------------------');
        const errInfo = this.httpService.analysisErrInfo(error);
        console.log('errorInfo' + JSON.stringify(errInfo));
        this.loadingService.hideWaiting();
        // session time out
        if (error.status === 401) {

        }
      }
      return ErrorObservable.create(error);
    })));
  }
}
