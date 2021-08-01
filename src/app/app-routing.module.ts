import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './app-features/home/home.component';
import {NewsComponent} from './app-features/news/news.component';
import {NewsContentComponent} from './app-features/news/news-content/news-content.component';
import {AggridComponent} from './app-features/aggrid/aggrid.component';
import {ProductComponent} from './app-features/product/product.component';
import {ProductContentComponent} from './app-features/product/product-content/product-content.component';
import {StudyComponent} from './app-features/study/study.component';
import {MaterialComponent} from './app-features/material/material.component';
import { ScssStudyComponent } from './app-features/scss-study/scss-study.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {
    path: 'news', component: NewsComponent,
    // children: []
  },
  //get传值
  {path: 'newscontent', component: NewsContentComponent},
  //动态路由传值
  {path: 'newscontent/:info', component: NewsContentComponent},
  //js跳转
  {path: 'product', component: ProductComponent},
  {path: 'productcontent/:pid', component: ProductContentComponent},
  //ag-grid-angular 表格组件
  {path: 'aggrid', component: AggridComponent},
  //material 谷歌组件
  {path:'material',component:MaterialComponent},
  //学习工作问题汇总
  {path: 'study', component: StudyComponent},
  //样式学习
  {path: 'scss', component: ScssStudyComponent},
  //默认
  {path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: false})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
