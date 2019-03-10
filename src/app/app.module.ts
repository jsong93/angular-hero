import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
// import {NZ_I18N} from 'ng-zorro-antd/i18n';
import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';

import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { MessageComponent } from './message/message.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { HeroSearchComponent } from './hero-search/hero-search.component';
// import { DelonFormModule } from '@delon/form';
import { DelonFormModule } from '@delon/form';
import { DelonFormComponent } from './delon-form/delon-form.component';
import { DelonModule } from './delon-form/delon-form.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DelonMockModule } from '@delon/mock';
import * as MOCKDATA from '../../_mock';
import { HeroService } from './hero.service';
import { LoggerService } from './logger.service';
import { BetterLoggerService } from './better-logger.service';
import { LoggerHelperService } from './logger-helper.service';
import { Logger2Service } from './logger2.service';
import { loggerValue } from './logger.value';
import { Authorize } from './authorize';
import { AuthService } from './auth.service';
import { AppConf, Appconfig } from './appconfig';
registerLocaleData(zh);

const authServiceProvider = (logger: LoggerService, authorize: Authorize) => {
  return new AuthService(logger, authorize.getAuthorized());
};
@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessageComponent,
    DashboardComponent,
    HeroSearchComponent
    // DelonFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgZorroAntdModule,
    AppRoutingModule,
    DelonMockModule.forRoot({ data: MOCKDATA }),
    // DelonFormModule.forRoot(),
    // DelonModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      dataEncapsulation: false
    })
  ],
  providers: [
    {
      provide: NZ_I18N,
      useValue: zh_CN
    },
    // 简单写法依赖注入
    // HeroService,
    // 提供商 需要LoggerService 注入 写法一
    // [LoggerService, { provide: HeroService, useClass: HeroService }]
    // 提供商 需要BetterLoggerService 依赖注入 写法二
    // [
    //   { provide: LoggerService, useClass: BetterLoggerService },
    //   { provide: HeroService, useClass: HeroService }
    // ]
    // 直接注入 提供商  和 提供商 需要的依赖
    [
      // LoggerHelperService,
      { provide: LoggerHelperService, useClass: LoggerHelperService },
      { provide: LoggerService, useClass: BetterLoggerService }
    ],
    { provide: Logger2Service, useExisting: LoggerService },
    { provide: HeroService, useClass: HeroService },
    { provide: LoggerService, useValue: loggerValue },
    Authorize,
    {
      provide: AuthService,
      useFactory: authServiceProvider,
      deps: [LoggerService, Authorize]
    }
    // { provide: Appconfig, useValue: AppConf }
  ],
  bootstrap: [AppComponent]
  // schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AppModule {}
