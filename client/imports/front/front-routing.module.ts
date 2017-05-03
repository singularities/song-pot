import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FrontComponent } from './front.component';

import { NoSessionGuard } from '../session/no-session-guard.service';

const frontRoutes: Routes = [
  {
    path: '',
    component: FrontComponent,
    canActivate: [ NoSessionGuard ]
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
