import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { MdButtonModule,
         MdCardModule,
         MdDialogModule,
         MdGridListModule,
         MdIconModule,
         MdInputModule,
         MdListModule,
         MdMenuModule,
         MdSidenavModule,
         MdSnackBarModule,
         MdToolbarModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';

import { SessionModule } from '../session/session.module';
import { SongModule } from '../song/song.module';

import { BandsComponent } from './bands.component';
import { BandListComponent } from './list.component';
import { BandComponent } from './band.component';
import { BandDialogCreate } from './dialog/create.component';
import { BandEmptyComponent } from './empty.component';
import { BandService } from './band.service';
import { BandToolbarService } from './toolbar.service';
import { BandShareDirective } from './share.directive';

import { BandRoutingModule } from './band-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MdButtonModule,
    MdCardModule,
    MdDialogModule,
    MdGridListModule,
    MdIconModule,
    MdInputModule,
    MdListModule,
    MdMenuModule,
    MdSidenavModule,
    MdSnackBarModule,
    MdToolbarModule,
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
    BandEmptyComponent,
    BandDialogCreate,
    BandShareDirective
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
