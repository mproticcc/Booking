import { take } from 'rxjs';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Hotel } from '../../models/hotel.model';
import { HotelService } from '../../services/hotel.service';
import { ReservationService } from '../../services/reservation.service';
import { Reservation } from '../../models/reservation.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-reservation-dialog',
  templateUrl: './create-reservation-dialog.component.html',
  styleUrls: ['./create-reservation-dialog.component.scss'],
})
export class CreateReservationDialogComponent implements OnInit {
  reservationForm = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[A-Z][a-zA-Z]+$/),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[A-Z][a-zA-Z]+$/),
    ]),
    dateFrom: new FormControl('', [Validators.required]),
    dateTo: new FormControl('', [Validators.required]),
    hotels: new FormControl('', Validators.required),
  });

  hotels?: Hotel[];

  private registrationID: number = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {},
    private hotelService: HotelService,
    private reservationService: ReservationService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getAllHotels();
    this.getLastRegistrationID();
  }

  saveReservation(): void {
    const reservation: Reservation = {
      id: this.registrationID,
      firstName: this.reservationForm.value.firstName,
      lastName: this.reservationForm.value.lastName,
      hotel: +this.reservationForm.value.hotels,
      dateFrom: this.reservationForm.value.dateFrom,
      dateTo: this.reservationForm.value.dateTo,
      deletedAt: null,
    };

    this.reservationService
      .createReservation(reservation)
      .pipe(take(1))
      .subscribe(() => {
        this._snackBar.open('Booking successful', 'Close', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 2000,
          panelClass: ['blue-snackbar'],
        });

        this.reservationService.madeReservation$.next(true);
      });
  }

  private getAllHotels(): void {
    this.hotelService
      .getAll()
      .pipe(take(1))
      .subscribe((hotels) => (this.hotels = hotels));
  }

  private getLastRegistrationID() {
    this.reservationService
      .getAll()
      .pipe(take(1))
      .subscribe((registrations: Reservation[]) => {
        this.registrationID = registrations[registrations.length - 1].id + 1;
      });
  }
}
