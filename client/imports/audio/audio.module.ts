import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { MdButtonModule,
         MdDialogModule,
         MdIconModule,
         MdInputModule,
         MdListModule,
         MdMenuModule,
         MdProgressSpinnerModule,
         MdSliderModule,
         MdSnackBarModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';

import { AudioListComponent } from './list.component';
import { AudioDialogChangeName } from './dialog/change-name.component';
import { AudioDialogConfirmRemove } from './dialog/confirm-remove.component';
import { AudioPlayerComponent } from './player.component';
import { AudioAddDirective } from './add.directive';
import { AudioAddProgressComponent } from './add-progress.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MdButtonModule,
    MdDialogModule,
    MdIconModule,
    MdInputModule,
    MdListModule,
    MdMenuModule,
    MdProgressSpinnerModule,
    MdSliderModule,
    MdSnackBarModule,
    FlexLayoutModule,
    TranslateModule,
  ],
  declarations: [
    AudioListComponent,
    AudioDialogChangeName,
    AudioDialogConfirmRemove,
    AudioPlayerComponent,
    AudioAddDirective,
    AudioAddProgressComponent
  ],
  entryComponents: [
    AudioDialogChangeName,
    AudioDialogConfirmRemove
  ],
  exports: [
    AudioListComponent,
    AudioAddProgressComponent,
    AudioPlayerComponent,
    AudioAddDirective
  ]

})
export class AudioModule {}
