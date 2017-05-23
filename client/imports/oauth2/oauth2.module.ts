import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { OAuth2AuthorizeComponent } from './authorize.component';

import { OAuth2RoutingModule } from './oauth2-routing.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    OAuth2RoutingModule
  ],
  declarations: [
    OAuth2AuthorizeComponent
  ]

})

export class OAuth2Module {}
