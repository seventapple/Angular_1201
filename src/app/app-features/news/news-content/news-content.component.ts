import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-news-content',
  templateUrl: './news-content.component.html',
  styleUrls: ['./news-content.component.scss']
})
export class NewsContentComponent implements OnInit {

  //通过get传值获取的信息
  infoQue: any;

  //通过动态路由传值
  infoRoute: any;

  constructor(public route: ActivatedRoute) {
  }

  ngOnInit(): void {
    //获取get传值
    console.log(this.route);
    this.route.queryParams.subscribe(res => {
      console.log(res);
      this.infoQue = res.info;
    });
    //获取动态路由传值
    this.route.params.subscribe(res => {
      console.log(res);
      this.infoRoute = res.info;
    });
  }

}
