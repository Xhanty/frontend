import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { authGuard } from './auth.guard';
@NgModule({
    imports: [
        RouterModule.forRoot([
            // Aqui configuramos las rutas auque cada componente puede tener este archivo

            { path: '', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule), canActivate: [authGuard] },
            { path: 'contact', loadChildren: () => import('./demo/components/contactus/contactus.module').then(m => m.ContactusModule), canActivate: [authGuard] },
            {
                path: 'dashboard', component: AppLayoutComponent,
                children: [
                    { path: '', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },

                    // Rutas para admin
                    { path: 'subjects', loadChildren: () => import('./demo/components/subjects/subjects.module').then(m => m.SubjectsModule) },
                    { path: 'users', loadChildren: () => import('./demo/components/users/users.module').then(m => m.UsersModule) },

                    { path: 'pages', loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule) }
                ], canActivate: [authGuard]
            },
            { path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },
            { path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload', useHash: true })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
