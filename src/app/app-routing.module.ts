import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DiseasesComponent } from './pages/diseases/diseases.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { RecomendationComponent } from './pages/recomendation/recomendation.component';

const routes: Routes = [
    { path: 'disease', component: DiseasesComponent },
    { path: 'recomendation', component: RecomendationComponent },
    {path: '', redirectTo: '/disease', pathMatch: 'full'},
    {path: '**', component: PageNotFoundComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
