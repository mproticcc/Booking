import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, map, Subject } from 'rxjs';
import { Hotel } from 'src/app/shared/models/hotel.model';

@Injectable({
  providedIn: 'root',
})
export class HotelService {
  searchedValue$: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient) {}

  getAll(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(`${environment.baseApiURL}hotels`);
  }

  getHotelByID(id: number): Observable<Hotel> {
    return this.http.get<Hotel>(`${environment.baseApiURL}hotels/${id}`);
  }

  getHotelsByLocation(hotelLocation: string): Observable<Hotel[]> {
    return this.http
      .get<Hotel[]>(`${environment.baseApiURL}hotels`)
      .pipe(
        map((hotels) =>
          hotels.filter((hotels) =>
            hotels.location.toLowerCase().includes(hotelLocation.toLowerCase())
          )
        )
      );
  }
}
