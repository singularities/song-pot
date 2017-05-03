import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';

import { SessionComponent } from './session.component';
import { NoSessionGuard } from './no-session-guard.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
    TranslateModule,
  ],
  declarations: [
    SessionComponent
  ],
  providers: [
    NoSessionGuard
  ],
  exports: [
    SessionComponent
  ]
})

export class SessionModule {}
