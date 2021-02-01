import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DiseasesComponent } from './diseases/diseases.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RecomendationComponent } from './recomendation/recomendation.component';
import { NbAccordionModule, NbButtonModule, NbCardModule, NbDialogModule, NbIconModule, NbInputModule, NbLayoutModule, NbListModule, NbMenuModule, NbSelectModule, NbSidebarModule, NbToastrModule, NbToastrService, NbWindowModule } from '@nebular/theme';
import { ImportComponent } from './import/import.component';
import { SettingsComponent } from './settings/settings.component';
import { NbAuthModule } from '@nebular/auth';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';

@NgModule({
  declarations: [
    PageNotFoundComponent,
    DiseasesComponent,
    RecomendationComponent,
    ImportComponent,
    SettingsComponent,
    PagesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NbSidebarModule,
    NbButtonModule,
    NbIconModule,
    NbCardModule,
    NbAccordionModule,
    NbSelectModule,
    NbDialogModule,
    NbInputModule,
    NbListModule,
    NbWindowModule,
    NbLayoutModule,
    NbAuthModule,
    NbMenuModule,
    PagesRoutingModule
  ],
  exports: [
    PageNotFoundComponent,
    DiseasesComponent,
    RecomendationComponent
  ]
})
export class PagesModule { }
