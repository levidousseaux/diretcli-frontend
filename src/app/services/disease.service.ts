import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Disease } from '../models/disease.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DiseaseService {

  constructor(private http: HttpClient) { }

  GetAllDisease(): Promise<Disease[]>  {
    return this.http.get<Disease[]>(`${environment.backend_endpoint}/diseases`).toPromise()
  }

  CreateDisease(disease: Disease): Promise<any> {
    return this.http.post(`${environment.backend_endpoint}/create_disease`, disease).toPromise()
  }

  UpdateDisease(disease: Disease): Promise<any>  {
    return this.http.put(`${environment.backend_endpoint}/update_disease`, disease).toPromise()
  }

  DeleteDisease(id: number): Promise<any>  {
    return this.http.delete(`${environment.backend_endpoint}/delete_disease/${id}`).toPromise()
  }

}
