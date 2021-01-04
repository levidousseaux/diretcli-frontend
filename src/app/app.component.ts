import { Component, OnInit } from '@angular/core';
import { NbSidebarService, NbThemeService } from '@nebular/theme';
import { MENU_ITEMS } from './app-menu';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  menu = MENU_ITEMS
  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    }
  ];

  currentTheme = 'default';

  constructor(private sidebarService: NbSidebarService,
              private themeService: NbThemeService,) {
    this.themeService.onThemeChange()
          .subscribe((theme: any) => {
            console.log(`Theme changed to ${theme.name}`);
          });
  }

  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }
}
