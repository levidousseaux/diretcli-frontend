import { Component, OnInit } from '@angular/core';
import { Disease } from 'src/app/models/disease.model';
import { Recomendation } from 'src/app/models/recomendation.model';
import { DiseaseService } from 'src/app/services/disease.service';
import { NotificationService } from 'src/app/services/notification.service';
import { RecomendationService } from 'src/app/services/recomendation.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-diseases',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss']
})
export class ImportComponent implements OnInit {

  diseases: Disease[]
  dialogItem: Disease
  recomendations: Recomendation[] = []
  selectedDisease: number
  title: string
  accordionType: string
  exceltoJson: any = {};

  constructor(private diseaseService: DiseaseService, private recomendationService: RecomendationService, private toastrService: NotificationService) { }

  ngOnInit(): void {
    this.GetDiseases()
  }

  GetDiseases() {
    this.diseaseService.GetAllDisease().then(response => { this.diseases = response })
  }

  onFileChange(event: any) {
    this.toastrService.showToast('primary', 'Iniciando operação...')
    this.exceltoJson = {};
    let headerJson = {};
    const target: DataTransfer = <DataTransfer>(event.target);
    const reader: FileReader = new FileReader();

    reader.readAsBinaryString(target.files[0]);
    reader.onload = (e: any) => {
      const binarystr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws);
      this.exceltoJson['sheet'] = data;
      const headers = this.get_header_row(ws);
      headerJson['header'] = headers;
      this.jsonToRecomendation(this.exceltoJson.sheet);
    };
    event.target.value = '';
  }

  get_header_row(sheet) {
    var headers = [];
    var range = XLSX.utils.decode_range(sheet['!ref']);
    var C, R = range.s.r;

    for (C = range.s.c; C <= range.e.c; ++C) {
      var cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })]
      var hdr = "UNKNOWN " + C;
      if (cell && cell.t) {
        hdr = XLSX.utils.format_cell(cell);
        headers.push(hdr);
      }
    }
    return headers;
  }

  async jsonToRecomendation(json: any[]) {
    try {
      await json.forEach(recomendation => {
        this.recomendations.push(new Recomendation(this.selectedDisease, recomendation.category, recomendation.subcategory, recomendation.sequence, recomendation.title, recomendation.value))
      })
      console.log(this.recomendations)
      await this.recomendationService.CreateRecomendations(this.recomendations).then(res => {
        if (res.status == 200) {
          this.toastrService.showToast('success', 'Foram inseridas ' + this.recomendations.length +' com sucesso!')
        }
        else {
          this.toastrService.showToast('danger', 'Ocorreu um erro na importação!')
        }
      })
    } catch(error) {
      console.log(error)
      this.toastrService.showToast('danger', 'Ocorreu um erro na importação!')
    }
    this.recomendations = []
  }

}
