import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SongModule } from '../song/song.module';

import { BandComponent } from './band.component';

import { BandRoutingModule } from './band-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    SongModule,
    BandRoutingModule
  ],
  declarations: [
    BandComponent
  ]
})

export class BandModule {}
