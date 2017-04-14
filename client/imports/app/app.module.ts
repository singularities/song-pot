import 'hammerjs';

delete Hammer.defaults.cssProps.userSelect;

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpModule, Http } from '@angular/http';
import { TranslateModule, TranslateLoader} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { SongsPot } from './app.component';
import { BandComponent } from '../band/band.component';
import { SongsComponent } from '../song/songs.component';
import { SongComponent } from '../song/song.component';
import { SongAudiosComponent } from '../song/audios.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: Http) {
    return new TranslateHttpLoader(http, "/l10n/");
}


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [ Http ]
      }
    }),
    RouterModule.forRoot([
      {
        path: 'band',
        component: BandComponent
      },
      {
        path: 'songs/:id',
        component: SongComponent
      },
      {
        path: '',
        redirectTo: '/band',
        pathMatch: 'full'
      }
    ]),
  ],
  declarations: [
    SongsPot,
    BandComponent,
    SongsComponent,
    SongComponent,
    SongAudiosComponent
  ],
  entryComponents: [
    SongsPot
  ],
  bootstrap: [ SongsPot ]
})

export class AppModule {}
