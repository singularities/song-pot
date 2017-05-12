import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';

import { SessionSidebarComponent } from './sidebar.component';
import { SessionToolbarComponent } from './toolbar.component';
import { SessionFormComponent } from './form.component';

import { SessionService } from './session.service';
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
    SessionSidebarComponent,
    SessionToolbarComponent,
    SessionFormComponent
  ],
  providers: [
    SessionService,
    NoSessionGuard
  ],
  exports: [
    SessionSidebarComponent,
    SessionToolbarComponent,
    SessionFormComponent
  ]
})

export class SessionModule {}
