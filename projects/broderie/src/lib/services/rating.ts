import {Injectable} from '@angular/core';
import {Product} from '../../../../common/product';

@Injectable({providedIn: 'root'})
export class RatingService {
  showAverage(product: Product): any {
    if (product && product.ratings) {
      const ratingsArray: any[] = product && product.ratings;
      const total: number[] = [];
      const length: number = ratingsArray.length;

      ratingsArray.map((rating) => total.push(rating.star));
      const totalReduced: number = total.reduce((previousValue, currentValue) => {
        return previousValue + currentValue;
      }, 0);
      const highest = length * 5;
      const result = (totalReduced * 5) / highest;
      return {
        result: result,
        length: length
      };
    }
    return;
  }
}
