import { Component } from '@angular/core';
import { NbSidebarService } from '@nebular/theme';
import { MENU_ITEMS } from './pages-menu';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
})
export class PagesComponent {

  menu = MENU_ITEMS

  constructor(private sidebarService: NbSidebarService) {
  }

  ngOnInit() {  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }
}
