import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { MdButtonModule,
         MdDialogModule,
         MdIconModule,
         MdInputModule,
         MdMenuModule,
         MdSnackBarModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';

import { SessionSidebarComponent } from './sidebar.component';
import { SessionToolbarComponent } from './toolbar.component';
import { SessionFormComponent } from './form.component';
import { SessionDialogFormComponent } from './dialog/form.component';
import { SessionFormDirective } from './form.directive';

import { SessionService } from './session.service';
import { NoSessionGuard } from './no-session-guard.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MdButtonModule,
    MdDialogModule,
    MdIconModule,
    MdInputModule,
    MdMenuModule,
    MdSnackBarModule,
    FlexLayoutModule,
    TranslateModule,
  ],
  declarations: [
    SessionSidebarComponent,
    SessionToolbarComponent,
    SessionFormComponent,
    SessionDialogFormComponent,
    SessionFormDirective
  ],
  providers: [
    SessionService,
    NoSessionGuard
  ],
  entryComponents: [
    SessionDialogFormComponent
  ],
  exports: [
    SessionSidebarComponent,
    SessionToolbarComponent,
    SessionFormComponent,
    SessionFormDirective
  ]
})

export class SessionModule {}
