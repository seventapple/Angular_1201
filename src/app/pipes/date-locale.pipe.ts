import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateLocale'
})
export class DateLocalePipe implements PipeTransform {

  //wait to complete
  private format: any;

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
