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
import { SongEditComponent } from '../song/edit.component';
import { SongAudiosComponent } from '../song/audios.component';
import { SongAddDirective } from '../song/add.directive';
import { SongDialogConfirmRemove } from '../song/dialog/confirm-remove.component';
import { MetronomeComponent } from '../song/metronome.component';
import { AudioListComponent } from '../audio/list.component';
import { AudioDialogChangeName } from '../audio/dialog/change-name.component';
import { AudioDialogConfirmRemove } from '../audio/dialog/confirm-remove.component';
import { AudioPlayerComponent } from '../audio/player.component';

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
        component: SongComponent,
      },
      // TODO use child routes?
      {
        path: 'songs/:id/:child',
        component: SongComponent,
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
    SongEditComponent,
    SongAudiosComponent,
    SongAddDirective,
    SongDialogConfirmRemove,
    MetronomeComponent,
    AudioListComponent,
    AudioDialogChangeName,
    AudioDialogConfirmRemove,
    AudioPlayerComponent
  ],
  entryComponents: [
    SongsPot,
    SongDialogConfirmRemove,
    AudioDialogChangeName,
    AudioDialogConfirmRemove
  ],
  bootstrap: [ SongsPot ]
})

export class AppModule {}
