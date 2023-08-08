import { take } from 'rxjs';
import { HotelService } from 'src/app/shared/services/hotel.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hotel } from 'src/app/shared/models/hotel.model';

@Component({
  selector: 'app-hotel-overview',
  templateUrl: './hotel-overview.component.html',
  styleUrls: ['./hotel-overview.component.scss'],
})
export class HotelOverviewComponent implements OnInit {
  hotel?: Hotel;

  private hotelId!: number;

  constructor(
    private hotelService: HotelService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.hotelId = Number(this.activeRoute.snapshot.paramMap.get('hotelId'));
    this.getSingleHotel(this.hotelId);
  }

  private getSingleHotel(id: number) {
    this.hotelService
      .getHotelByID(id)
      .pipe(take(1))
      .subscribe((hotel) => (this.hotel = hotel));
  }
}
