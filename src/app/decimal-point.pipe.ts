import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decimalPoint'
})
export class DecimalPointPipe implements PipeTransform {


  transform(value: number | null | undefined, decimalDigits: number, keepDecimalDigits: number = 6): string {
    if (value == null || value === undefined) {
      return '';
    }
    const DECIMAL_POINT: string = '.';
    let valueBig: bigint = BigInt(value);
    let decimalDivisor: bigint = BigInt('1' + Array(decimalDigits + 1).join('0'));
    let integerPart: bigint = valueBig / decimalDivisor;
    let decimalPart: bigint = valueBig % decimalDivisor;
    let result: string = '';
    if (integerPart > 0) {
      if (decimalPart > Math.pow(10, keepDecimalDigits)) {
        decimalPart = decimalPart / BigInt(Math.pow(10, decimalDigits - keepDecimalDigits));
      }
      result = integerPart.toLocaleString('en-US') + DECIMAL_POINT + decimalPart.toString();
    } else { // add 0 padding
      let strDecimalPart: string = decimalPart.toString().padStart(Math.abs(decimalDigits), '0');
      result = '0' + DECIMAL_POINT + strDecimalPart.substring(0, keepDecimalDigits);
    }

    return result.replace(/(\.0+|0+)$/, ''); // remove trailing zero
  }

}
