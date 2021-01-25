import { ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NbDialogService, NbWindowRef, NbWindowService } from '@nebular/theme';
import { Subcategory } from 'src/app/models/subcategory';
import { Disease } from 'src/app/models/disease.model';
import { Recomendation } from 'src/app/models/recomendation.model';
import { DiseaseService } from 'src/app/services/disease.service';
import { RecomendationService } from 'src/app/services/recomendation.service';

@Component({
  selector: 'app-recomendation',
  templateUrl: './recomendation.component.html',
  styleUrls: ['./recomendation.component.scss'],
})
export class RecomendationComponent implements OnInit {

  @ViewChild('accordion') accordion
  diseases: Disease[]
  recomendations: Recomendation[] = []
  selectedSubcategory: string
  selectedDisease: number
  dialogItem: Recomendation
  createItem: Recomendation
  title: string
  accordionType: string
  recomendationMap: Map<string, Subcategory[]> = new Map<string, Subcategory[]>()
  selectedDiseaseName: string
  windowRef: NbWindowRef

  constructor(private diseaseService: DiseaseService, private recomendationService: RecomendationService, private dialogService: NbDialogService, private windowService: NbWindowService) { }

  ngOnInit(): void {
    this.GetDiseases()
  }

  GetDiseases() {
    this.diseaseService.GetAllDisease().then(response => { this.diseases = response })
  }

  async GetRecomendations() {
    await this.recomendationService.GetRecomendationByDisease(this.selectedDisease).then(res => this.recomendationMap = res)
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

  SetRecomendationDialog(recomendations: Recomendation[]) {
    this.recomendations = recomendations
    this.selectedSubcategory = recomendations[0]?.subcategory
  }

  async DeleteRecomendation(recomendation: Recomendation) {
    await this.recomendationService.DeleteRecomendation(recomendation)
    this.GetRecomendations()
    this.windowRef.close()
  }
  async SubmitRecomendation() {
    if (this.accordionType == 'create') {
      await this.recomendationService.CreateRecomendation(this.dialogItem)
    } else {
      await this.recomendationService.UpdateRecomendation(this.dialogItem)
    }
    this.windowRef.close()
    await this.GetRecomendations()

  }

  open(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog, {
      context: {
        title: 'This is a title passed to the dialog component',
      }
    });
  }

  openWindow(dialog: TemplateRef<any>) {
    this.windowRef = this.windowService.open(dialog, { title: this.selectedSubcategory });
  }
}
