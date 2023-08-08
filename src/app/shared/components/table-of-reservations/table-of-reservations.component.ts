import { ReservationService } from './../../services/reservation.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Reservation } from '../../models/reservation.model';
import { Subject, take, takeUntil } from 'rxjs';
import { HotelService } from '../../services/hotel.service';
import { Hotel } from '../../models/hotel.model';
import { AuthorizationService } from '../../services/authorization.service';

@Component({
  selector: 'app-table-of-reservations',
  templateUrl: './table-of-reservations.component.html',
  styleUrls: ['./table-of-reservations.component.scss'],
})
export class TableOfReservationsComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    'dots',
    'id',
    'firstName',
    'lastName',
    'hotel',
    'dateFrom',
    'dateTo',
    'delete',
  ];

  dataSource!: Reservation[];

  hotels?: Hotel[];

  isAdmin: boolean = false;

  private subscription$: Subject<void> = new Subject<void>();

  constructor(
    private reservationService: ReservationService,
    private hotelService: HotelService,
    private authService: AuthorizationService
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.getAllHotels();
    this.getAllReservation();
    this.isReservationSaved();
  }

  ngOnDestroy(): void {
    this.subscription$.next();
    this.subscription$.complete();
  }

  onDelete(reservation: Reservation): void {
    this.reservationService
      .softDelete(reservation)
      .pipe(take(1))
      .subscribe(() => this.getAllReservation());
  }

  private getAllReservation(): void {
    this.reservationService
      .getAll()
      .pipe(takeUntil(this.subscription$))
      .subscribe((reservations) => (this.dataSource = reservations));
  }

  private getAllHotels(): void {
    this.hotelService
      .getAll()
      .pipe(take(1))
      .subscribe((hotels) => (this.hotels = hotels));
  }

  private isReservationSaved(): void {
    this.reservationService.madeReservation$
      .pipe(takeUntil(this.subscription$))
      .subscribe(() => {
        this.getAllReservation();
      });
  }
}
