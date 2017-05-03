import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';

import { SessionFormComponent } from './session-form.component';
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
    SessionFormComponent
  ],
  providers: [
    NoSessionGuard
  ],
  exports: [
    SessionFormComponent
  ]
})

export class SessionModule {}
