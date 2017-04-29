import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FrontComponent } from './front.component';

const frontRoutes: Routes = [
  {
    path: '',
    component: FrontComponent
  },
  {
    path: 'session/:action/:token',
    component: FrontComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(frontRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class FrontRoutingModule { }
