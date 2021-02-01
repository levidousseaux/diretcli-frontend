import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../guards/auth.guard";
import { DiseasesComponent } from "./diseases/diseases.component";
import { ImportComponent } from "./import/import.component";
import { PagesComponent } from "./pages.component";
import { RecomendationComponent } from "./recomendation/recomendation.component";
import { SettingsComponent } from "./settings/settings.component";

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    { path: 'diseases', component: DiseasesComponent, canActivate: [AuthGuard] },
    { path: 'recomendations', component: RecomendationComponent, canActivate: [AuthGuard] },
    { path: 'import', component: ImportComponent, canActivate: [AuthGuard] },
    { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
