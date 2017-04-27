import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { BandComponent } from '../band/band.component';
import { SongComponent } from '../song/song.component';
import { FrontComponent } from '../front/front.component';

const appRoutes: Routes = [
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
    component: FrontComponent
  }
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
