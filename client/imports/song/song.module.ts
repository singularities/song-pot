import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';

import { AudioModule } from '../audio/audio.module';

import { SongsComponent } from './songs.component';
import { SongListComponent } from './list.component';
import { SongComponent } from './song.component';
import { SongEditComponent } from './edit.component';
import { SongAudiosComponent } from './audios.component';
import { SongWelcomeComponent } from './welcome.component';
import { SongAddDirective } from './add.directive';
import { SongDialogConfirmRemove } from './dialog/confirm-remove.component';
import { MetronomeComponent } from './metronome.component';

import { SongService } from './song.service';

import { SongRoutingModule } from './song-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
    TranslateModule,
    AudioModule,
    SongRoutingModule
  ],
  declarations: [
    SongsComponent,
    SongListComponent,
    SongComponent,
    SongEditComponent,
    SongAudiosComponent,
    SongWelcomeComponent,
    SongAddDirective,
    SongDialogConfirmRemove,
    MetronomeComponent
  ],
  entryComponents: [
    SongDialogConfirmRemove
  ],
  providers: [
    SongService
  ],
  exports: [
    SongsComponent,
    SongAddDirective
  ]
})

export class SongModule {}
