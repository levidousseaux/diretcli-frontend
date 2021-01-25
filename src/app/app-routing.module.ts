import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DiseasesComponent } from './pages/diseases/diseases.component';
import { LoginComponent } from './pages/login/login.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { RecomendationComponent } from './pages/recomendation/recomendation.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'disease', component: DiseasesComponent },
    { path: 'recomendation', component: RecomendationComponent },
    { path: '**', component: PageNotFoundComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
