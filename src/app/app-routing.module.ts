import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { PagesRoutingModule } from './pages/pages-routing.module';

const routes: Routes = [
    {
      path: 'auth',
      loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    },
    {
      path: 'pages',
      loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),
    },
    { path: '**', component: PageNotFoundComponent, canActivate: [AuthGuard]},
];

@NgModule({
    imports: [RouterModule.forRoot(routes), PagesRoutingModule],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class AppRoutingModule { }
