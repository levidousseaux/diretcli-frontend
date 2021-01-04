import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recomendation } from '../models/recomendation.model';

@Injectable({
  providedIn: 'root',
})
export class RecomendationService {

  constructor(private http: HttpClient) { }

  GetRecomendationByDisease(diseaseId: number): Promise<Recomendation[]>  {
    return this.http.get<Recomendation[]>(`http://localhost:8080/recomendations/${diseaseId}`).toPromise()
  }

  CreateRecomendation(recomendation: Recomendation): Promise<any> {
    console.log(recomendation)
    return this.http.post('http://localhost:8080/create_recomendation', recomendation).toPromise()
  }


  UpdateRecomendation(recomendation: Recomendation): Promise<any>  {
    return this.http.put('http://localhost:8080/update_recomendation', recomendation).toPromise()
  }

  DeleteRecomendation(recomendation: Recomendation): Promise<any>  {
    return this.http.delete(`http://localhost:8080/delete_recomendation/${recomendation.id}`).toPromise()
  }

}
