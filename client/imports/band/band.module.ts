import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';

import { SongModule } from '../song/song.module';

import { BandsComponent } from './bands.component';
import { BandComponent } from './band.component';

import { BandRoutingModule } from './band-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
    TranslateModule,
    SongModule,
    BandRoutingModule
  ],
  declarations: [
    BandsComponent,
    BandComponent
  ]
})

export class BandModule {}
