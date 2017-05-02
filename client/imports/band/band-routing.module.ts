import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BandsComponent } from './bands.component';
import { BandComponent } from './band.component';

const bandRoutes: Routes = [
  {
    path: 'bands',
    component: BandsComponent,
    children: [
      {
        path: ':id',
        component: BandComponent
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
