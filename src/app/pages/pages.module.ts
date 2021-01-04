import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DiseasesComponent } from './diseases/diseases.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RecomendationComponent } from './recomendation/recomendation.component';
import { NbAccordionModule, NbButtonModule, NbCardModule, NbDialogModule, NbIconModule, NbInputModule, NbLayoutModule, NbSelectModule, NbSidebarModule } from '@nebular/theme';




@NgModule({
  declarations: [PageNotFoundComponent, DiseasesComponent, RecomendationComponent],
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
    NbInputModule
  ],
  exports: [
    PageNotFoundComponent,
    DiseasesComponent,
    RecomendationComponent
  ]
})
export class PagesModule { }
