import { Component, OnDestroy, OnInit } from '@angular/core';
import { take, takeUntil, Subject } from 'rxjs';
import { HotelService } from 'src/app/shared/services/hotel.service';
import { Hotel } from 'src/app/shared/models/hotel.model';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.scss'],
})
export class HotelsComponent implements OnInit, OnDestroy {
  hotels?: Hotel[];

  hotelsCounter?: number;

  searchedValue: string = '';

  private subscription$: Subject<void> = new Subject<void>();

  constructor(private hotelService: HotelService) {}

  ngOnInit(): void {
    this.getAllHotels();
    this.getSearchValue();
  }

  ngOnDestroy(): void {
    this.subscription$.next();
    this.subscription$.complete();
  }

  private getAllHotels(): void {
    this.hotelService
      .getAll()
      .pipe(take(1))
      .subscribe((hotels) => (this.hotels = hotels));
  }

  private getSearchValue(): void {
    this.hotelService.searchedValue$
      .pipe(takeUntil(this.subscription$))
      .subscribe((value) => {
        this.searchedValue = value;
        this.getHotelsByLocation();
      });
  }

  private getHotelsByLocation(): void {
    this.hotelService
      .getHotelsByLocation(this.searchedValue)
      .pipe(take(1))
      .subscribe((hotels) => {
        this.hotels = hotels;
        this.hotelsCounter = hotels.length;
        // pitanje: da li mogu direktno u html-u da pozovem hotels.length ili moram da imam property(kao sada) i
        // da preko njega proveravam sta mi je potrebno (da li se desava isto kao da zovem funkciju u html - u)
      });
  }
}
