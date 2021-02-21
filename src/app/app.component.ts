import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular1201';
  msg:any;
  constructor() {
  }
  ngOnInit(): void {
    // this.msg=this.transl.get('COMMON.LABEL.LANGUAGE_ZH');
  }
}
