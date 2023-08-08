import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DescriptionLimitPipe } from './pipes/description-limit.pipe';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { TableOfReservationsComponent } from './components/table-of-reservations/table-of-reservations.component';
import { SearchComponent } from './components/search/search.component';
import { MaterialModule } from './material/material.module';
import { CreateReservationDialogComponent } from './components/create-reservation-dialog/create-reservation-dialog.component';
import { StarsMakerPipe } from './pipes/stars-maker.pipe';

const PIPES = [DescriptionLimitPipe, StarsMakerPipe];
const COMPONENTS = [
  NotFoundComponent,
  TableOfReservationsComponent,
  SearchComponent,
  CreateReservationDialogComponent,
];

@NgModule({
  declarations: [...PIPES, ...COMPONENTS],
  imports: [CommonModule, MaterialModule],
  exports: [...PIPES, ...COMPONENTS],
})
export class SharedModule {}
