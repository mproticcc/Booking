import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { LoginComponent } from './core/components/auth/login/login.component';
import { ShellLayoutComponent } from './core/components/shell/components/shell-layout/shell-layout.component';
import { AuthGuard } from './core/guards/auth.guard';
import { RegistrationComponent } from './core/components/auth/registration/registration.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: ShellLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'hotels',
        pathMatch: 'full',
      },
      {
        path: 'hotels',
        canLoad: [AuthGuard],
        loadChildren: () =>
          import('./features/hotels/hotels.module').then(
            (module) => module.HotelsModule
          ),
      },
      {
        path: 'reservations',
        canLoad: [AuthGuard],
        loadChildren: () =>
          import('./features/reservation/reservation.module').then(
            (module) => module.ReservationModule
          ),
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'registration',
    component: RegistrationComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
