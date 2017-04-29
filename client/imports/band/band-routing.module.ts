import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BandComponent } from './band.component';

const bandRoutes: Routes = [
  {
    path: 'bands/:id',
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
