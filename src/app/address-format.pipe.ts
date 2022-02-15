import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addressFormat'
})
export class AddressFormatPipe implements PipeTransform {

  transform(value: string, max_length: number): string {

    if (value.length <= max_length) {
      return value;
    }

    return value.substring(0, max_length / 2) + '...' + value.substring(value.length - max_length / 2, value.length);
  }

}
