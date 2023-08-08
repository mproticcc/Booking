import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HotelOverviewComponent } from './components/hotel-overview/hotel-overview.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { HotelsComponent } from './components/hotels/hotels.component';

const routes: Routes = [
  {
    path: '',
    component: HotelsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ':hotelId',
    canActivate: [AuthGuard],
    component: HotelOverviewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HotelsRoutingModule {}
