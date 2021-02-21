import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {ConfigService} from './config.service';
import {HttpClient} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {environment} from '../../environments/environment';
import {keyframes} from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class I18nService {
  //翻译文言
  private msg = '';

  constructor(
    private translate: TranslateService,
    private configService: ConfigService,
    private htttp: HttpClient
  ) {
  }

  get(key: string | Array<string>, interpolateParams?: any): string {
    this.translate.get(key, interpolateParams).subscribe(
      data => this.msg = data,
      error => console.log(error)
    );
    return this.msg;
  }

  //语言切换
  switchLang(lang: string) {
    this.translate.use(lang);
  }

  //使用浏览器语言
  useBeowserLang() {
    this.switchLang(this.getBrowserLang());
  }

  //浏览器语言取得
  getBrowserLang(): string {
    //lang get by system
    const i18nLang = this.configService.localConfig.dispalyLanguage.map((lang) => {
      // console.error(lang);
      lang.abridge;
    });
    this.addLangs(i18nLang);
    //default
    const defLang = this.configService.localConfig.defaultLanguage;
    const browserLang = this.translate.getBrowserLang();
    //either is null
    const regex = new RegExp(i18nLang.join('|'));
    return browserLang.match(regex) ? browserLang : defLang;
  }

  //追加语言
  addLangs(langs: Array<string>) {
    this.translate.addLangs(langs);
  }

  translObjectValues(object: any) {
    if (!object) {
      return;
    }
    const obj = {...object};
    object.keys(obj).forEach(key => {
      const value = obj[key];
      obj[key] = value ? this.get(value as string) : '';
    });
    return obj;
  }
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', `.json?v=${environment.ver}`);
}
