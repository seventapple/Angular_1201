import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {environment} from '../app-features/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  //本地配置文件路径
  private readonly localConfigPath = './assets/config/conf.json';
  //参数配置文件路径
  private readonly customConfigPath = './config/conf.json';

  private _localConfig: any;
  //TODO wait codeF
  private _serrverConfig: any;
  private _customConfig:any;

  constructor(private  http: HttpClient) {
  }

  get localConfig(): any {
    return this._localConfig;
  }

  //load localConfig
  async loadLocalConfig() {
    if (!this._localConfig) {
      this._localConfig = await this.getConfig(this.localConfigPath).toPromise();
    }
  }

  //请求配置文件
  private getConfig(path): Observable<any> {
    return this.http.get(`${path}?v=${environment.ver}`).pipe(
      catchError(() => {
        console.log(`The config file ${path} could not be found.`);
        return of({});
      })
    );
  }
}
