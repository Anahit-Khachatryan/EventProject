import { Router } from '@angular/router';
import {environment} from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AuthResponseData } from '../models/authResponseData';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }


  login(auth) {
    return this.http.post<AuthResponseData>(
      `${environment.apiUrl}/login`, auth
    )
      .pipe(
        catchError(this.handleError))
  }
  logout() {

    localStorage.clear();
    this.router.navigate(['/login']);

  }

  isAuthenticated() {
    return !!localStorage.getItem('token');
  }

  isAdmin() {
    return !!localStorage.getItem('isAdmin');
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error accured!';
    if (!errorRes.error) {
      return throwError(errorMessage);
    }

    switch (errorRes.error.message) {

      case 'User not found':
        errorMessage = 'This email does not exist.';
        break;
      case "Invalid password":
        errorMessage = 'This password not correct.';
        break;

    }

    return throwError(errorMessage);
  }
}
