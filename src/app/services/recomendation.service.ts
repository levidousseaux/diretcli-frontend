import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recomendation } from '../models/recomendation.model';
import { environment } from 'src/environments/environment';
import { Subcategory } from '../models/subcategory';
import { SourceService } from './sources.service';
import { Source } from '../models/source.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class RecomendationService {

  constructor(private http: HttpClient, private sourceService: SourceService) { }

  async GetRecomendationByDisease(diseaseId: number): Promise<Map<string, Map<string, Recomendation[]>>>  {

    let recomendationMap: Map<string, Map<string, Recomendation[]>> = new Map<string, Map<string, Recomendation[]>>()
    this.http.get<Recomendation[]>(`${environment.backend_endpoint}/recomendations/${diseaseId}`).subscribe(async (recomendations) => {
      await recomendations.forEach(async recomendation => {
        recomendation.sources = []
        await this.sourceService.GetByRecomendationId(recomendation.id).then(res => {
          recomendation.sources = res
        })

        if (recomendationMap.has(recomendation.category)) {
          let subcategoryMap = await recomendationMap.get(recomendation.category)

          if (subcategoryMap.has(recomendation.subcategory))
            subcategoryMap.get(recomendation.subcategory).push(recomendation)
          else
            subcategoryMap.set(recomendation.subcategory, [recomendation] )

        } else {
          recomendationMap.set(recomendation.category, new Map<string, Recomendation[]>());
          recomendationMap.get(recomendation.category).set( recomendation.subcategory, [ recomendation ])
        }
      })
    })
    return recomendationMap
  }

  CreateRecomendation(recomendation: Recomendation): Promise<any> {
    recomendation.user = UserService.user.name
    return this.http.post(`${environment.backend_endpoint}/recomendations/create`, recomendation, {observe: 'response'}).toPromise()
  }

  CreateRecomendations(recomendations: Recomendation[]): Promise<any> {
    recomendations.forEach(recomendation => recomendation.user = UserService.user.name)
    return this.http.post(`${environment.backend_endpoint}/recomendations/import`, recomendations, {observe: 'response'}).toPromise()
  }

  async UpdateRecomendation(recomendation: any): Promise<any>  {
    recomendation.image.data = []
    return await this.http.put(`${environment.backend_endpoint}/recomendations/update`, recomendation, {observe: 'response'}).toPromise()
  }

  DeleteRecomendation(recomendation: Recomendation): Promise<any>  {
    return this.http.delete(`${environment.backend_endpoint}/recomendations/delete/${recomendation.id}`, {observe: 'response'}).toPromise()
  }

  async UploadImage(fd: FormData): Promise<any>  {
    return await this.http.post(`${environment.backend_endpoint}/recomendations/upload`, fd, {observe: 'response'}).toPromise()
  }

  DeleteImage(id: number): Promise<any>  {
    return this.http.delete(`${environment.backend_endpoint}/recomendations/image/${id}`, {observe: 'response'}).toPromise()
  }

  async SubmitSource(source: Source): Promise<any>  {
    return await this.http.post(`${environment.backend_endpoint}/sources`, source, {observe: 'response'}).toPromise()
  }

  async DeleteSource(id_source: number): Promise<any>  {
    return await this.http.delete(`${environment.backend_endpoint}/sources/${id_source}`, {observe: 'response'}).toPromise()
  }

}
