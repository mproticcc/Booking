import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateReservationDialogComponent } from 'src/app/shared/components/create-reservation-dialog/create-reservation-dialog.component';
import { AuthorizationService } from 'src/app/shared/services/authorization.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss'],
})
export class ReservationsComponent implements OnInit {
  isAdmin: boolean = false;

  constructor(
    private dialog: MatDialog,
    private authService: AuthorizationService
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
  }

  createReservation(): void {
    this.dialog.open(CreateReservationDialogComponent, {
      data: {},
      position: { top: '40px' },
      width: '50%',
    });
  }
}
