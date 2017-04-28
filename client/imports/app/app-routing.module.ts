import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { BandComponent } from '../band/band.component';
import { SongComponent } from '../song/song.component';
import { FrontComponent } from '../front/front.component';

const appRoutes: Routes = [
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {}
