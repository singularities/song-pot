import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';

import { SessionModule } from '../session/session.module';
import { SongModule } from '../song/song.module';

import { BandsComponent } from './bands.component';
import { BandListComponent } from './list.component';
import { BandComponent } from './band.component';
import { BandService } from './band.service';
import { BandToolbarService } from './toolbar.service';
import { BandDialogCreate } from './dialog/create.component';

import { BandRoutingModule } from './band-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
    TranslateModule,
    SessionModule,
    SongModule,
    BandRoutingModule
  ],
  declarations: [
    BandsComponent,
    BandListComponent,
    BandComponent,
    BandDialogCreate
  ],
  entryComponents: [
    BandDialogCreate
  ],
  providers: [
    BandService,
    BandToolbarService
  ]
})

export class BandModule {}
