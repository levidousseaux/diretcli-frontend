import { Component, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'app-diseases',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

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

  constructor(private themeService: NbThemeService) {
    this.themeService.changeTheme('default');

   }

  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }


}
