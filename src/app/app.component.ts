import { Component, OnInit } from '@angular/core';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { User } from './models/user.model';
import { MENU_ITEMS } from './pages/pages-menu';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private authService: NbAuthService) {
    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {
        if (token.isValid()) {
          UserService.user = token.getPayload();
          if (UserService.user.role != 'admin') {
            MENU_ITEMS.forEach((item) => {
              if (item.title == 'Importar') item.hidden = true
            })
          }
        }
      });
  }
}
