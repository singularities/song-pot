import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';

import { AudioModule } from '../audio/audio.module';

import { SongsComponent } from './songs.component';
import { SongComponent } from './song.component';
import { SongEditComponent } from './edit.component';
import { SongAudiosComponent } from './audios.component';
import { SongAddDirective } from './add.directive';
import { SongDialogConfirmRemove } from './dialog/confirm-remove.component';
import { MetronomeComponent } from './metronome.component';

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
    SongComponent,
    SongEditComponent,
    SongAudiosComponent,
    SongAddDirective,
    SongDialogConfirmRemove,
    MetronomeComponent
  ],
  entryComponents: [
    SongDialogConfirmRemove
  ],
  exports: [
    SongsComponent,
    SongAddDirective
  ]

})
export class SongModule {}
