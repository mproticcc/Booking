import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'starsMaker',
})
export class StarsMakerPipe implements PipeTransform {
  transform(numberOfStars: number): string {
    let stars: string[] = [];
    for (let i = 1; i <= numberOfStars; i++) {
      stars.push('★');
    }
    const m = 5 - numberOfStars;
    for (let i = 1; i <= m; i++) {
      stars.push('☆');
    }
    return stars.join('');
  }
}
