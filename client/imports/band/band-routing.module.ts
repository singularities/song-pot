import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BandsComponent } from './bands.component';
import { BandComponent } from './band.component';
import { SongsComponent } from '../song/songs.component';
import { SongComponent } from '../song/song.component';

const bandRoutes: Routes = [
  {
    path: 'bands',
    component: BandsComponent,
    children: [
      {
        path: ':id',
        component: BandComponent,
        children: [
          {
            path: '',
            redirectTo: 'songs',
            pathMatch: 'full'
          },
          {
            path: 'songs',
            component: SongsComponent,
            children: [
              {
                path: ':id',
                component: SongComponent,
              },
              // TODO use child routes?
              {
                path: ':id/:child',
                component: SongComponent,
              }
            ]
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(bandRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class BandRoutingModule { }
