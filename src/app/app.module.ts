import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './app-features/home/home.component';
import {NewsComponent} from './app-features/news/news.component';
import {AggridComponent} from './app-features/aggrid/aggrid.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {AgGridModule} from 'ag-grid-angular';
import {NewsContentComponent} from './app-features/news/news-content/news-content.component';
import {ProductComponent} from './app-features/product/product.component';
import {ProductContentComponent} from './app-features/product/product-content/product-content.component';
import {StudyComponent} from './app-features/study/study.component';
import {MaterialComponent} from './app-features/material/material.component';
import {MatExpansionModule} from '@angular/material/expansion';
//多语言
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {HttpClientModule} from '@angular/common/http';
import {HttpLoaderFactory, I18nService} from './services/i18n.service';
//配置文件
import {ConfigService} from './services/config.service';
//Dialog
import {DialogService} from './modules/dialog/dialog.service';
import {DialogModule} from './modules/dialog/dialog.module';
import { DateLocalePipe } from './pipes/date-locale.pipe';
import { DateLocaleTimezonePipe } from './pipes/date-locale-timezone.pipe';
import { MatDividerModule } from '@angular/material/divider';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ScssStudyComponent } from './app-features/scss-study/scss-study.component';
import { SelecterFocusDirective } from './directive/selecter-focus.directive';
import { InputSelectComponent } from './app-features/material/input-select/input-select.component';
import { InputTrimDirective } from './directive/input-trim.directive';
import { InputNumDirective } from './directive/input-num.directive';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NewsComponent,
    AggridComponent,
    NewsContentComponent,
    ProductComponent,
    ProductContentComponent,
    StudyComponent,
    MaterialComponent,
    DateLocalePipe,
    DateLocaleTimezonePipe,
    ScssStudyComponent,
    SelecterFocusDirective,
    InputSelectComponent,
    InputTrimDirective,
    InputNumDirective,
  ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        AgGridModule.withComponents([]),
        MatExpansionModule,
        HttpClientModule,
        //i18n
        TranslateModule.forRoot(
            {
                loader: {
                    provide: TranslateLoader,
                    useFactory: HttpLoaderFactory,
                    deps: [HttpClient]
                }
            }
        ),
        //Dialog
        DialogModule,
        MatDividerModule,
        ReactiveFormsModule,
        //input-select
        MatAutocompleteModule,
        ScrollingModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private i18n: I18nService, private config: ConfigService) {
    // config.loadLocalConfig().then(() => {
    //   i18n.useBeowserLang();
    // });
  }
}
