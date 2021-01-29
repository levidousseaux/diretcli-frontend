import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

    loggedIn: boolean = false;
    error: boolean;
    user: User

    get isLoggedIn() {
      return this.loggedIn;
    }

    get isInError() {
      return this.error;
    }

    constructor(private router: Router, private http: HttpClient) { }

    login(user: User) {
      user.role = 'role'
      // this.http.post(`${environment.backend_endpoint}/auth/login`, user, {observe: 'response'})
      //   .subscribe(res => {
      //     this.loggedIn = true
      //     this.router.navigate(['/disease'])
      // })
      this.loggedIn = true
      this.router.navigate(['/disease'])
    }

    logout() {
        this.loggedIn = false;
        this.router.navigate(['/login']);
    }

}
