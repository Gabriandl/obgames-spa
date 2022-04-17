import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AccountService } from '../services/account.service';
import { NotifierService } from '../services/notifier.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private accountService: AccountService,
    public notifierService: NotifierService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    const token = this.accountService.getAuthorizationToken();
    let request: HttpRequest<any> = req;

    if (token && !this.accountService.isTokenExpired(token)) {
      // O request é imutavel, ou seja, não é possível mudar nada
      // Faço o clone para conseguir mudar as propriedades
      // Passo o token de autenticação no header
      request = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
    }

    // retorno o request com o erro tratado
    return next.handle(request)
      .pipe(
        catchError(err => {
          if (err.error instanceof ErrorEvent) {
            // Erro de client-side ou de rede
          
            this.notifierService.showAllertNotification(err.error.message);
          } else {
            // Erro retornando pelo backend
            this.notifierService.showAllertNotification(err.error.message);
          }
          // retornar um observable com uma mensagem amigavel.
          return throwError('Ocorreu um erro, tente novamente');
        })
      );
  }
}
