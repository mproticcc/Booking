import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationRoutingModule } from './reservation-routing.module';
import { ReservationsComponent } from './components/reservations/reservations.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';

const COMPONENTS = [ReservationsComponent];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [CommonModule, ReservationRoutingModule, RouterModule, SharedModule],
  exports: [...COMPONENTS],
})
export class ReservationModule {}
