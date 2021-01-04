import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Disease } from '../models/disease.model';

@Injectable({
  providedIn: 'root',
})
export class DiseaseService {

  constructor(private http: HttpClient) { }

  GetAllDisease(): Promise<Disease[]>  {
    return this.http.get<Disease[]>('http://localhost:8080/diseases').toPromise()
  }

  CreateDisease(disease: Disease): Promise<any> {
    return this.http.post('http://localhost:8080/create_disease', disease).toPromise()
  }

  UpdateDisease(disease: Disease): Promise<any>  {
    return this.http.put('http://localhost:8080/update_disease', disease).toPromise()
  }

  DeleteDisease(id: number): Promise<any>  {
    return this.http.delete(`http://localhost:8080/delete_disease/${id}`).toPromise()
  }

}
