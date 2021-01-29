import { Injectable } from '@angular/core';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrService } from '@nebular/theme';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {

  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  constructor(private toastrService: NbToastrService) { }

  showToast(status: NbComponentStatus, message) {
    this.toastrService.show(
      '',
      message,
      {
        status: status,
        position: this.position
      });
  }

}
