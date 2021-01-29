import { Component, OnInit } from '@angular/core';
import { NbSidebarService, NbThemeService } from '@nebular/theme';
import { MENU_ITEMS } from './app-menu';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  menu = MENU_ITEMS

  constructor(private sidebarService: NbSidebarService,
              public authService: AuthService) {
  }

  ngOnInit() {
  }

  isLoggedIn() {
    return this.authService.isLoggedIn;
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }
}
