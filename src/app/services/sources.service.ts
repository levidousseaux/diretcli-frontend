import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Comment } from '../models/comment.model';
import { Source } from '../models/source.model';

@Injectable({
  providedIn: 'root',
})
export class SourceService {

  constructor(private http: HttpClient) { }

  GetByRecomendationId(id_disease: number): Promise<Source[]>  {
    return this.http.get<Source[]>(`${environment.backend_endpoint}/sources/${id_disease}`).toPromise()
  }

  Create(source: Source): Promise<any> {
    return this.http.post(`${environment.backend_endpoint}/sources`, source, {observe: 'response'}).toPromise()
  }

  Delete(id: number): Promise<any>  {
    return this.http.delete(`${environment.backend_endpoint}/sources/${id}`, {observe: 'response'}).toPromise()
  }

}
