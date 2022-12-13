import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstN',
})
export class FirstNPipe implements PipeTransform {
  transform(value: any[], ...args: unknown[]): any {
    const [n] = args;
    return value.slice(0, n as number);
  }
}
