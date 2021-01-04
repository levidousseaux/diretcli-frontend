import { ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { Disease } from 'src/app/models/disease.model';
import { Recomendation } from 'src/app/models/recomendation.model';
import { DiseaseService } from 'src/app/services/disease.service';
import { RecomendationService } from 'src/app/services/recomendation.service';

@Component({
  selector: 'app-recomendation',
  templateUrl: './recomendation.component.html',
  styleUrls: ['./recomendation.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecomendationComponent implements OnInit {

  @ViewChild('accordion') accordion
  diseases: Disease[]
  recomendations: Recomendation[]
  selectedDisease: number
  dialogItem: Recomendation
  createItem: Recomendation
  title: string
  accordionType: string
  selectedDiseaseName: string
  types = ["Rastreio", "Diagnóstico", "Tratamento", "Monitoramento", "Comorbidade", "Idoso"]

  constructor(private diseaseService: DiseaseService, private recomendationService: RecomendationService, private dialogService: NbDialogService) { }

  ngOnInit(): void {
    this.GetDiseases()
  }

  GetDiseases() {
    this.diseaseService.GetAllDisease().then(response => { this.diseases = response })
  }

  GetRecomendations() {
    this.recomendationService.GetRecomendationByDisease(this.selectedDisease).then(response => {
      this.recomendations = response
      this.accordion.closeAll()
    })
  }

  GetRecomendationsByType(type: string): Recomendation[] {
    if (this.recomendations) {
      return this.recomendations.filter(recomendation => recomendation.type === type)
    }
    return null
  }

  SetDiseaseName() {
    this.selectedDiseaseName = this.diseases.find((disease) => disease.id == this.selectedDisease).name
  }

  SetDialogItem(editItem: Recomendation) {
    if (editItem != null) {
      this.dialogItem = editItem
      this.title = 'Editar Recomendação'
      this.accordionType = 'edit'
    } else {
      this.dialogItem = new Recomendation()
      this.dialogItem.id_disease = this.selectedDisease
      this.title = 'Criar nova Recomendação'
      this.accordionType = 'create'
    }
  }

  async DeleteRecomendation(recomendation: Recomendation) {
    await this.recomendationService.DeleteRecomendation(recomendation)
    this.GetRecomendations()
  }
  async SubmitRecomendation() {
    if (this.accordionType == 'create') {
      await this.recomendationService.CreateRecomendation(this.dialogItem)
    } else {
      await this.recomendationService.UpdateRecomendation(this.dialogItem)
    }
    this.GetRecomendations()
  }

  open(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog, {
      context: {
        title: 'This is a title passed to the dialog component',
      },
    });
  }
}
