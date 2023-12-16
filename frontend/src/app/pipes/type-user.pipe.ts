import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'typeUser'
})
export class TypeUser implements PipeTransform {

  transform(value: string): string {
    const word = value === 'user' ? 'Usuario' : 'Administrador';

    return word;
  }
}
