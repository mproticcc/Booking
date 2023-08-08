import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelsComponent } from './components/hotels/hotels.component';
import { HotelOverviewComponent } from './components/hotel-overview/hotel-overview.component';
import { HotelCardComponent } from './components/hotel-card/hotel-card.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { HotelsRoutingModule } from './hotels-routing.module';

const COMPONENTS = [
  HotelsComponent,
  HotelOverviewComponent,
  HotelCardComponent,
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [CommonModule, SharedModule, RouterModule, HotelsRoutingModule],
  exports: [...COMPONENTS],
})
export class HotelsModule {}
