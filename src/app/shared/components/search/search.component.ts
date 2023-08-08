import { HotelService } from 'src/app/shared/services/hotel.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  constructor(private hotelService: HotelService) {}

  onSearch(searchValue: string): void {
    this.hotelService.searchedValue$.next(searchValue);
  }
}
