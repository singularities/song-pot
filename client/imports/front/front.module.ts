import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';

import { SessionModule } from '../session/session.module';

import { FrontComponent } from '../front/front.component';
import { FrontDialogStartComponent } from '../front/dialog/start.component';

import { FrontRoutingModule } from './front-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
    TranslateModule,
    SessionModule,
    FrontRoutingModule
  ],
  declarations: [
    FrontComponent,
    FrontDialogStartComponent
  ],
  entryComponents: [
    FrontDialogStartComponent
  ]

})
export class FrontModule {}
