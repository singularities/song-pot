import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OAuth2AuthorizeComponent } from './authorize.component';

const oauth2Routes: Routes = [
  {
    path: 'oauth/authorize',
    component: OAuth2AuthorizeComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(oauth2Routes)
  ],
  exports: [
    RouterModule
  ]
})

export class OAuth2RoutingModule { }
