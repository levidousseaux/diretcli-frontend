import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NbLoginComponent } from '@nebular/auth';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  providers: [HttpClient]
})
export class LoginComponent extends NbLoginComponent {

  setUser() {
    UserService.get(this.user.email);
  }
}
