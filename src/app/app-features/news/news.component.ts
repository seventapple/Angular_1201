import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  list: any[] = [];

  constructor() {
  }

  ngOnInit(): void {
    for (let i = 1; i <= 5; i++) {
      const param = {
        id: i,
        name: '第' + i + '条新闻'
      };
      this.list.push(param);
    }
  }

}
