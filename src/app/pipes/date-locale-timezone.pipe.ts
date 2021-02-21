import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'dateLocaleTimezone'
})
export class DateLocaleTimezonePipe implements PipeTransform {

  locale: string = 'cn';

  constructor() {
  }


  transform(value: any, format: string = 'yyyyMMddHHmmss'): string {
    //Java's format transf
    format = format.replace('yyyy', 'YYYY');
    format = format.replace('dd', 'DD');
    format = format.replace('d', 'D');

    const moment = require('moment-timezone');
    const momentDate = moment(value).tz(moment.tz.guess());

    //locale转化
    momentDate.locale(this.locale);

    if (!momentDate.isValid()) {
      return value;
    }
    return momentDate.format(format);
  }

}
