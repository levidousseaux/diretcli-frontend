import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Comment } from '../models/comment.model';

@Injectable({
  providedIn: 'root',
})
export class CommentService {

  constructor(private http: HttpClient) { }

  GetByRecomendationId(id_disease: number): Promise<Comment[]>  {
    return this.http.get<Comment[]>(`${environment.backend_endpoint}/comments/${id_disease}`).toPromise()
  }

  Create(comment: Comment): Promise<any> {
    return this.http.post(`${environment.backend_endpoint}/comments`, comment, {observe: 'response'}).toPromise()
  }

  Delete(id: number): Promise<any>  {
    return this.http.delete(`${environment.backend_endpoint}/comments/${id}`, {observe: 'response'}).toPromise()
  }

}
