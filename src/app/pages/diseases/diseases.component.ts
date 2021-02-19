import { Component, OnInit, TemplateRef } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { Disease } from 'src/app/models/disease.model';
import { DiseaseService } from 'src/app/services/disease.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-diseases',
  templateUrl: './diseases.component.html',
  styleUrls: ['./diseases.component.scss']
})
export class DiseasesComponent implements OnInit {

  diseases: Disease[]
  dialogItem: Disease
  selectedDisease: number
  title: string
  accordionType: string
  user = UserService.user

  constructor(private diseaseService: DiseaseService, private dialogService: NbDialogService) { }

  ngOnInit(): void {
    this.GetDiseases()
  }

  GetDiseases() {
    this.diseaseService.GetAllDisease().then(response => { this.diseases = response })
  }

  async SubmitDisease() {
    if (this.accordionType == 'create') {
      await this.diseaseService.CreateDisease(this.dialogItem)
    } else {
      await this.diseaseService.UpdateDisease(this.dialogItem)
    }
    this.GetDiseases()
  }

  DeleteDisease(id: number) {
    this.diseaseService.DeleteDisease(id).then( () => {
      this.GetDiseases()
    })
  }

  SetDialogItem(editItem: Disease) {
    if (editItem != null) {
      this.dialogItem = editItem
      this.title = 'Editar Doença'
      this.accordionType = 'edit'
    } else {
      this.dialogItem = new Disease()
      this.title = 'Criar nova Doença'
      this.accordionType = 'create'
    }
  }

  open(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog, {
      context: {
        title: 'This is a title passed to the dialog component',
      },
    });
  }
}
