import { Component, OnInit } from '@angular/core';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrService } from '@nebular/theme';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isRegisterPage: boolean = false;
  user: User = new User()

  constructor(public authService: AuthService, private userService: UserService) {}

  ngOnInit(): void {  }

  async onSubmit()  {
    if(this.isRegisterPage) {
      this.user.role = 'admin'
      await this.userService.createUser(this.user).then(res => {
        if (res.status == 201) {
          //this.showToast('success', 'Usuário criado com sucesso')
        } else {
          //this.showToast('danger', 'Ocorreu um erro ao criar o usuário. Tente novamente')
        }
      });
      this.isRegisterPage = false;
      this.user = new User();
    } else
      this.authService.login(this.user);
  }

  registerBlock() {
    if(this.isRegisterPage)  this.isRegisterPage = false;
    else this.isRegisterPage = true;
  }

}
