import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BandComponent } from './band.component';

const bandRoutes: Routes = [
  {
    path: 'band',
    component: BandComponent
  },
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
