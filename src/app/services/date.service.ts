import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() {
  }

  /**
   * 日期格式从YYYYMMDD向1970/02/01的毫秒转换
   * @param value 日期值
   * @param offsetFlg 附加时区Flg
   */
  convertDateTime(value: string, offsetFlg: boolean): number {
    console.error(value);
    let retDate: Date;
    const offset: number = new Date().getTimezoneOffset();
    if (!value) {
      return null;
    }
    if (value.length === 14) {
      console.log(parseInt(value.substring(0, 4), 10));
      console.log(parseInt(value.substring(4, 6), 10));
      console.log(parseInt(value.substring(6, 8), 10));
      console.log(parseInt(value.substring(8, 10), 10));
      console.log(parseInt(value.substring(10, 12), 10));
      console.log(parseInt(value.substring(12, 14), 10));
      retDate = new Date(parseInt(value.substring(0, 4), 10), parseInt(value.substring(4, 6), 10) - 1,
        parseInt(value.substring(6, 8), 10), parseInt(value.substring(8, 10), 10),
        parseInt(value.substring(10, 12), 10), parseInt(value.substring(12, 14), 10));
    }
    if (value.length === 12) {
      retDate = new Date(parseInt(value.substring(0, 4), 10), parseInt(value.substring(4, 6), 10) - 1,
        parseInt(value.substring(6, 8), 10), parseInt(value.substring(8, 10), 10),
        parseInt(value.substring(10, 12), 10));
    }
    if (offsetFlg) {
      retDate.setMinutes(retDate.getMinutes() - offset);
    }
    console.log(retDate.getTime());
    return retDate.getTime();
  }
}
