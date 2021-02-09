import { ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NbDialogService, NbWindowRef, NbWindowService } from '@nebular/theme';
import { Subcategory } from 'src/app/models/subcategory';
import { Disease } from 'src/app/models/disease.model';
import { Recomendation } from 'src/app/models/recomendation.model';
import { DiseaseService } from 'src/app/services/disease.service';
import { RecomendationService } from 'src/app/services/recomendation.service';
import { environment } from 'src/environments/environment';
import { NotificationService } from 'src/app/services/notification.service';
import { Comment } from 'src/app/models/comment.model';
import { CommentService } from 'src/app/services/comment.service';
import { Source } from 'src/app/models/source.model';

@Component({
  selector: 'app-recomendation',
  templateUrl: './recomendation.component.html',
  styleUrls: ['./recomendation.component.scss'],
})
export class RecomendationComponent implements OnInit {

  @ViewChild('accordion') accordion
  diseases: Disease[]
  recomendations: any[] = []
  comments: Comment[] = []
  sources: Comment[] = []
  comment: Comment = new Comment()
  selectedSubcategory: string
  selectedDisease: number
  dialogItem: Recomendation
  createItem: Recomendation
  title: string
  accordionType: string
  recomendationMap: Map<string, Map<string, Recomendation[]>> = new Map<string, Map<string, Recomendation[]>>()
  selectedDiseaseName: string
  windowRef: NbWindowRef
  imageFile: File = null
  selectedRecomendation: number
  sourceItem: Source = new Source()

  constructor(private diseaseService: DiseaseService, private commentService: CommentService, private recomendationService: RecomendationService, private dialogService: NbDialogService, private windowService: NbWindowService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.GetDiseases()
  }

  GetDiseases() {
    this.diseaseService.GetAllDisease().then(response => { this.diseases = response })
  }

  async GetRecomendations() {
    this.recomendationMap = new Map<string, Map<string, Recomendation[]>>()
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

  async GetComments(id: number) {
    await this.commentService.GetByRecomendationId(id).then(response => { this.comments = response })
  }

  async SendComment() {
    this.comment.user = 'Levi Melo'
    this.comment.id_recomendation = this.selectedRecomendation
    await this.commentService.Create(this.comment).then(res => {
        this.GetComments(this.selectedRecomendation)
        if (res.status == 201) {
          this.notificationService.showToast('success', 'Comentário criado com sucesso!')
        }
        else {
          this.notificationService.showToast('danger', 'Ocorreu um erro na criação da recomendação!')
        }
        this.comment = new Comment()
      })
  }

  async DeleteComment(id: number) {
    await this.commentService.Delete(id).then(res => {
      this.GetComments(this.selectedRecomendation)
      if (res.status == 200) {
        this.notificationService.showToast('success', 'Comentário excluido com sucesso!')
      }
      else {
        this.notificationService.showToast('danger', 'Ocorreu um erro!')
      }
    })
  }

  async SubmitSource() {
    this.sourceItem.id_recomendation = this.selectedRecomendation
    await this.recomendationService.SubmitSource(this.sourceItem).then(res => {
        this.GetRecomendations()
        if (res.status == 201) {
          this.notificationService.showToast('success', 'Comentário criado com sucesso!')
        }
        else {
          this.notificationService.showToast('danger', 'Ocorreu um erro na criação da recomendação!')
        }
        this.sourceItem = new Source()
        this.windowRef.close()
      })
  }

  async DeleteSource(id: number) {
    await this.recomendationService.DeleteSource(id).then(res => {
      if (res.status == 200) {
        this.notificationService.showToast('success', 'Comentário excluido com sucesso!')
      }
      else {
        this.notificationService.showToast('danger', 'Ocorreu um erro!')
      }
      this.GetRecomendations()
      this.windowRef.close()
    })
  }

  async SubmitRecomendation() {
    if (this.accordionType == 'create') {
      await this.recomendationService.CreateRecomendation(this.dialogItem)
        .then(res => {
          if (res.status == 200) {
            this.notificationService.showToast('success', 'Recomendação criada com sucesso!')
          }
          else {
            this.notificationService.showToast('danger', 'Ocorreu um erro na criação da recomendação!')
          }
        })
    } else {
      const fd: FormData = new FormData()
      if (this.imageFile != null) {
        fd.append('upload', this.imageFile, this.imageFile.name)
        fd.append('id', this.dialogItem.id.toString())
        await this.recomendationService.UploadImage(fd).then(
          res => {
            if (res.status != 200) {
              this.notificationService.showToast('danger', 'Ocorreu um erro no upload de imagem!')
            }
          })
      }

      await this.recomendationService.UpdateRecomendation(this.dialogItem).then(res => {
        if (res.status == 200) {
          this.notificationService.showToast('success', 'Recomendação atualizada com sucesso!')
        }
        else {
          this.notificationService.showToast('danger', 'Ocorreu um erro na criação da recomendação!')
        }
      })
    }
    setTimeout(()=> { window.location.reload(); }, 1000)
  }

  getImageUrl(recomendation):string {
    return `${environment.backend_endpoint}/recomendations/image/${recomendation.id}`
  }

  async removeImage() {
    await this.recomendationService.DeleteImage(this.dialogItem.id).then(res => {
      if (res.status == 200) {
        this.notificationService.showToast('success', 'Image removida!')
      }
      else {
        this.notificationService.showToast('danger', 'Ocorreu um erro na criação da recomendação!')
      }
    }, error => {
      console.log('errooo')
    })
  }

  onSelectImage(event) {
    this.imageFile = <File>event.target.files[0]
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
