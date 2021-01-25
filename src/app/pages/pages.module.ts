import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DiseasesComponent } from './diseases/diseases.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RecomendationComponent } from './recomendation/recomendation.component';
import { NbAccordionModule, NbButtonModule, NbCardModule, NbDialogModule, NbIconModule, NbInputModule, NbLayoutModule, NbListModule, NbSelectModule, NbSidebarModule, NbWindowModule } from '@nebular/theme';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';




@NgModule({
  declarations: [PageNotFoundComponent, DiseasesComponent, RecomendationComponent, LoginComponent, RegisterComponent],
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
    LoginComponent,
    RegisterComponent
  ]
})
export class PagesModule { }
