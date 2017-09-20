import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { MdCardModule,
         MdSnackBarModule,
         MdToolbarModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';

import { SessionModule } from '../session/session.module';

import { DiscourseSSOComponent } from './sso.component';

import { DiscourseRoutingModule } from './discourse-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MdCardModule,
    MdSnackBarModule,
    MdToolbarModule,
    FlexLayoutModule,
    TranslateModule,
    SessionModule,
    DiscourseRoutingModule
  ],
  declarations: [
    DiscourseSSOComponent
  ]

})

export class DiscourseModule {}
