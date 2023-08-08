import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, Subject } from 'rxjs';
import { Reservation } from '../models/reservation.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  madeReservation$: Subject<boolean> = new Subject<boolean>();

  constructor(private http: HttpClient) {}

  getAll(): Observable<Reservation[]> {
    return this.http
      .get<Reservation[]>(`${environment.baseApiURL}reservations`)
      .pipe(
        map((reservation) =>
          reservation.filter((reservation) => reservation.deletedAt === null)
        )
      );
  }

  softDelete(reservation: Reservation): Observable<Object> {
    return this.http.patch(
      `${environment.baseApiURL}reservations/${reservation.id}`,
      {
        deletedAt: new Date().toISOString(),
      }
    );
  }

  createReservation(reservation: Reservation): Observable<Object> {
    return this.http.post(`${environment.baseApiURL}reservations`, reservation);
  }
}
