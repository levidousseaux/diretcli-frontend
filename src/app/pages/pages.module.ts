import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DiseasesComponent } from './diseases/diseases.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RecomendationComponent } from './recomendation/recomendation.component';
import { NbAccordionModule, NbButtonModule, NbCardModule, NbDialogModule, NbIconModule, NbInputModule, NbLayoutModule, NbListModule, NbSelectModule, NbSidebarModule, NbToastrModule, NbToastrService, NbWindowModule } from '@nebular/theme';
import { LoginComponent } from './login/login.component';
import { ImportComponent } from './import/import.component';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  declarations: [
    PageNotFoundComponent,
    DiseasesComponent,
    RecomendationComponent,
    LoginComponent,
    ImportComponent,
    SettingsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
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
    NbLayoutModule
  ],
  exports: [
    PageNotFoundComponent,
    DiseasesComponent,
    RecomendationComponent,
    LoginComponent
  ]
})
export class PagesModule { }
