import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DiscourseSSOComponent } from './sso.component';

const discourseRoutes: Routes = [
  {
    path: 'discourse/sso',
    component: DiscourseSSOComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(discourseRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class DiscourseRoutingModule { }
