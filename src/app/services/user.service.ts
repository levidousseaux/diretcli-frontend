import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private http: HttpClient) { }

  createUser(user: User): Promise<any>  {
    return this.http.post(`${environment.backend_endpoint}/user`, user, {observe: 'response'}).toPromise()
  }

}
