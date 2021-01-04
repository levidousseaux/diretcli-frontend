import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recomendation } from '../models/recomendation.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RecomendationService {

  constructor(private http: HttpClient) { }

  GetRecomendationByDisease(diseaseId: number): Promise<Recomendation[]>  {
    return this.http.get<Recomendation[]>(`${environment.backend_endpoint}/recomendations/${diseaseId}`).toPromise()
  }

  CreateRecomendation(recomendation: Recomendation): Promise<any> {
    console.log(recomendation)
    return this.http.post(`${environment.backend_endpoint}/create_recomendation`, recomendation).toPromise()
  }


  UpdateRecomendation(recomendation: Recomendation): Promise<any>  {
    return this.http.put(`${environment.backend_endpoint}/update_recomendation`, recomendation).toPromise()
  }

  DeleteRecomendation(recomendation: Recomendation): Promise<any>  {
    return this.http.delete(`${environment.backend_endpoint}/delete_recomendation/${recomendation.id}`).toPromise()
  }

}
