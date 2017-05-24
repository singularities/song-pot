import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { MdToolbarModule, MdCardModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';

import { SessionModule } from '../session/session.module';

import { OAuth2AuthorizeComponent } from './authorize.component';

import { OAuth2RoutingModule } from './oauth2-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MdToolbarModule,
    MdCardModule,
    FlexLayoutModule,
    TranslateModule,
    SessionModule,
    OAuth2RoutingModule
  ],
  declarations: [
    OAuth2AuthorizeComponent
  ]

})

export class OAuth2Module {}
