import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { DiseasesComponent } from './pages/diseases/diseases.component';
import { ImportComponent } from './pages/import/import.component';
import { LoginComponent } from './pages/login/login.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { RecomendationComponent } from './pages/recomendation/recomendation.component';
import { SettingsComponent } from './pages/settings/settings.component';

const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'disease', component: DiseasesComponent, canActivate: [AuthGuard] },
    { path: 'recomendation', component: RecomendationComponent, canActivate: [AuthGuard] },
    { path: 'import', component: ImportComponent, canActivate: [AuthGuard] },
    { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
    { path: '**', component: PageNotFoundComponent, canActivate: [AuthGuard]}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class AppRoutingModule { }
