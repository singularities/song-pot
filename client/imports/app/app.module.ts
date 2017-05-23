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


// App
import { SongPot } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { FrontModule } from '../front/front.module';
import { OAuth2Module } from '../oauth2/oauth2.module';
import { BandModule } from '../band/band.module';
import { SongModule } from '../song/song.module';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: Http) {
    return new TranslateHttpLoader(http, "/l10n/");
}

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule, // requred by mdIcon
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [ Http ]
      }
    }),
    Angulartics2Module.forRoot([ Angulartics2GoogleAnalytics ]),
    FrontModule,
    OAuth2Module,
    BandModule,
    SongModule,
    AppRoutingModule
  ],
  declarations: [
    SongPot
  ],
  entryComponents: [
    SongPot
  ],
  bootstrap: [ SongPot ]
})

export class AppModule {}
