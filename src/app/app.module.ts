import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';

import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

// import { MinePage } from '../pages/mine/mine';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { DBModule } from '@ngrx/db';
import { schema } from '../db/schema';
// import {} from '@ngrx/'


// components module.
import { ComponentsModule } from '../components/components.module';
import { CnodeUserProvider } from '../providers/cnode-user/cnode-user';

@NgModule({
    declarations: [
        MyApp,
        // MinePage,
        HomePage,
        TabsPage,
        // CnodeListComponent
    ],
    imports: [
        BrowserModule,
        HttpModule,
        ComponentsModule,
        IonicModule.forRoot(MyApp, {
            // 隐藏所有子页面的tabs
            tabsHideOnSubPages: 'true'
        }),
        DBModule.provideDB(schema)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        // MinePage,
        HomePage,
        TabsPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
    CnodeUserProvider,
    ]
})
export class AppModule { }
