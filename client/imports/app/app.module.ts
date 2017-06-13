import 'hammerjs';

delete Hammer.defaults.cssProps.userSelect;

// Vendor
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule, Http } from '@angular/http';
import { TranslateModule, TranslateLoader} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Angulartics2Module, Angulartics2GoogleAnalytics } from 'angulartics2';

// App components
import { MdToolbarModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';


// App
import { SongPot } from './app.component';
import { AppToolbarComponent } from './toolbar.component';
import { NotFoundComponent } from './not-found.component';

import { FrontModule } from '../front/front.module';
import { BandModule } from '../band/band.module';
import { SongModule } from '../song/song.module';
import { DiscourseModule } from '../discourse/discourse.module';

// Not found route, must be imported the last one
import { AppRoutingModule } from './app-routing.module';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: Http) {
    return new TranslateHttpLoader(http, "/l10n/");
}

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule, // requred by mdIcon
    MdToolbarModule,
    FlexLayoutModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [ Http ]
      }
    }),
    Angulartics2Module.forRoot([ Angulartics2GoogleAnalytics ]),
    FrontModule,
    BandModule,
    SongModule,
    DiscourseModule,
    AppRoutingModule
  ],
  declarations: [
    SongPot,
    AppToolbarComponent,
    NotFoundComponent
  ],
  entryComponents: [
    SongPot
  ],
  exports: [
    AppToolbarComponent
  ],
  bootstrap: [ SongPot ]
})

export class AppModule {}
