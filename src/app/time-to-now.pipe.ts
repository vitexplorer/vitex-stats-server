import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeToNow'
})
export class TimeToNowPipe implements PipeTransform {

  transform(value: number, unit: string): number {
    let dateNow = Date.now();
    if (unit == 'second') {
      return Math.floor((dateNow - value) / 1000);
    } else if (unit == 'minute') {
      return Math.floor((dateNow - value) / 60000);
    } else if (unit == 'hour') {
      return Math.floor((dateNow - value) / 3600000);
    } else if (unit == 'day') {
      return Math.floor((dateNow - value) / 86400000);
    } else if (unit == 'month') {
      return Math.floor((dateNow - value) / 2592000000);
    } else if (unit == 'year') {
      return Math.floor((dateNow - value) / 31104000000);
    }
    // default to millisecond
    return dateNow - value;

  }

}
