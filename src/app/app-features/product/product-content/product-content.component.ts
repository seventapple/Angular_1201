import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-product-content',
  templateUrl: './product-content.component.html',
  styleUrls: ['./product-content.component.scss']
})
export class ProductContentComponent implements OnInit {

  msg:any;

  constructor(public route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(res=>{
      console.log(res);
      this.msg = res.pid;
    })
  }

}
