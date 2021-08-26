import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudyService {

  //request to jersey project
  // getRequestTestUrl = 'http://localhost:8080/jt/test/get/123';

  // request to node.js project(E:\TestFile\node_project\forRequest\nodejs_serve)
  getNodeTestUrl = 'http://127.0.0.1:3000';
  postNodeTestUrl = 'http://127.0.0.1:3000/dologin';
  postNodeTest2Url = 'http://127.0.0.1:3000/filter';

  httpHeaders = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) { }

  getTest(url): Observable<any>{
    return this.http.get(url);
  }

  getNodeTest(): Observable<any>{
    return this.http.get(this.getNodeTestUrl);
  }

  postNodeTest(param): Observable<any>{
    return this.http.post(this.postNodeTestUrl,param);
  }

  //对请求的结果进行筛选
  postNodeTest2(param): Observable<any>{
    return this.http.post(this.postNodeTest2Url,param).pipe(map(res=>{
      const list: any = res;
      console.error('before')
      console.error(list)
      const listDone = list.filter(item => item.flg);
      console.error('after')
      console.error(listDone)
      return listDone;
    }));
  }
}
