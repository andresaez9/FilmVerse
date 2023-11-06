import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'uppercaseLetter'
})
export class UppercaseLetterPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return value;

    const word = value.split(' ');

    const uppercaseLetter = word.map((letter) => {
      return letter.charAt(0).toUpperCase() + letter.slice(1);
    });
    
    return uppercaseLetter.join(' ');
  }
}
