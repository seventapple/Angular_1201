import {Component, OnInit} from '@angular/core';
//NavigationExtras 用于get专职跳转
import {Router, NavigationExtras} from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  constructor(public route: Router) {
  }

  ngOnInit(): void {
  }

  goNewContent() {
    //路由跳转(和routeLink 写法类似) 用于普通和动态路由
    this.route.navigate(['/productcontent', 'js跳转测试']);
  }

  goHome() {
    this.route.navigate(['/home']);
  }

  goNews() {
    let queryParams: NavigationExtras = {
      queryParams: {'info': '这是来自get传值带来的信息'}
    };
    this.route.navigate(['newscontent'],queryParams);
  }

  goNews2() {
    this.route.navigate(['newscontent','这是来自get传值(by 动态路由)带来的信息']);
  }
}
