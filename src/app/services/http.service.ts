import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor() {
  }

  analysisErrInfo(error: any): any {
    const errInfo = {errCode: '', errMsg: ''};
    let errMsg = error.headers.get('Error-Message');
    // console.log('errMsg before : '+errMsg)
    if (errMsg != null) {
      errMsg = this.decodeURL(errMsg);
    }
    errInfo.errCode = error.headers.get('Error-Code');
    errInfo.errMsg = errMsg;
    return errInfo;
  }

  decodeURL(errMsg: string): string {
    return decodeURIComponent(errMsg).replace(/\+/g, ' ').replace(/%2B/g, '+');
  }

  forwardToHome() {
    console.log('url :',location.href)
    console.log(location.host+'/home')
    // location.replace('/home');
  }
}
