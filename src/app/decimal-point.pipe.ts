import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decimalPoint'
})
export class DecimalPointPipe implements PipeTransform {


  transform(value: number | null, decimalDigits: number): string {
    if (value == null) {
      return '';
    }
    const DECIMAL_POINT: string = '.';
    let valueBig: bigint = BigInt(value);
    let decimalDivisor: bigint = BigInt('1' + Array(decimalDigits).join('0'));
    let integerPart: bigint = valueBig / decimalDivisor;
    let decimalPart: bigint = valueBig % decimalDivisor;
    let result: string = '';
    if (integerPart > 0) {
      result = integerPart.toLocaleString('en-US') + DECIMAL_POINT + decimalPart.toString();
    } else { // add 0 padding
      result = '0' + DECIMAL_POINT + decimalPart.toString().padStart(Math.abs(decimalDigits), '0');
    }

    return result.replace(/(\.0+|0+)$/, ''); // remove trailing zero
  }

}
