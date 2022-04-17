import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwt_decode from "jwt-decode";
import { Usuario } from '../models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl = 'https://obgames-api.herokuapp.com';


  constructor(private http: HttpClient) { }

  login(user: any) {
      return this.http.post<any>(`${this.apiUrl}/api/auth/signin`, user);
    
  }

  createAccount(usuario: Usuario) {
    return this.http.post<any>(`${this.apiUrl}/api/auth/signup`, usuario);
  }

  getAuthorizationToken() {
    const token = window.localStorage.getItem('token');
    return token;
  }

  getTokenExpirationDate(token: string): Date {
    const decoded: any = jwt_decode(token);

    const date = new Date(0);
    if (decoded.exp === undefined) {
      return date;
    }

    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if (!token) {
      return true;
    }

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) {
      return false;
    }

    return !(date.valueOf() > new Date().valueOf());
  }

  isUserLoggedIn() {
    const token = this.getAuthorizationToken();
    if (!token) {
      return false;
    } else if (this.isTokenExpired(token)) {
      return false;
    }

    return true;
  }
}
