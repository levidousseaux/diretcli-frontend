import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { InjectorInstance } from '../app.module';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  static user: User;

  static get(email: string): Promise<any>  {
    const http =  InjectorInstance.get<HttpClient>(HttpClient);
    return http.get<User>(`${environment.backend_endpoint}/user/${email}`).toPromise().then(res => {
      this.user = res
    })
  }

}
