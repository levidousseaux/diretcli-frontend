import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recomendation } from '../models/recomendation.model';
import { environment } from 'src/environments/environment';
import { Subcategory } from '../models/subcategory';

@Injectable({
  providedIn: 'root',
})
export class RecomendationService {

  constructor(private http: HttpClient) { }

  async GetRecomendationByDisease(diseaseId: number): Promise<Map<string, Subcategory[]>>  {

    let recomendationMap: Map<string, Subcategory[]> = new Map<string, Subcategory[]>()
    this.http.get<Recomendation[]>(`${environment.backend_endpoint}/recomendations/${diseaseId}`).subscribe(async (recomendations) => {
      await recomendations.forEach(async recomendation => {
        if (recomendationMap.has(recomendation.category)) {
          let sublist = await recomendationMap.get(recomendation.category)
          let inserted = false

          await sublist.forEach((sub) => {
            if (sub.name == recomendation.subcategory) {
              sub.recomendations.push(recomendation)
              inserted = true
            }
          })

          if(!inserted)
            sublist.push( new Subcategory(recomendation))

          } else {
            recomendationMap.set(recomendation.category, [ new Subcategory(recomendation) ]);
          }
      })
    })
    return recomendationMap
  }

  CreateRecomendation(recomendation: Recomendation): Promise<any> {
    return this.http.post(`${environment.backend_endpoint}/recomendations/create`, recomendation, {observe: 'response'}).toPromise()
  }

  CreateRecomendations(recomendations: Recomendation[]): Promise<any> {
    return this.http.post(`${environment.backend_endpoint}/recomendations/import`, recomendations, {observe: 'response'}).toPromise()
  }

  UpdateRecomendation(recomendation: Recomendation): Promise<any>  {
    return this.http.put(`${environment.backend_endpoint}/recomendations/update`, recomendation, {observe: 'response'}).toPromise()
  }

  DeleteRecomendation(recomendation: Recomendation): Promise<any>  {
    return this.http.delete(`${environment.backend_endpoint}/recomendations/delete/${recomendation.id}`, {observe: 'response'}).toPromise()
  }

}
