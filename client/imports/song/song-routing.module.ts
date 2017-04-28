import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SongComponent } from './song.component';

const songRoutes: Routes = [
  {
    path: 'songs/:id',
    component: SongComponent,
  },
  // TODO use child routes?
  {
    path: 'songs/:id/:child',
    component: SongComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(songRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class SongRoutingModule { }
