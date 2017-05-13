import { Directive, HostListener, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

import { Band } from '../../../imports/models';

@Directive({
  selector: '[bandShare]'
})

export class BandShareDirective {

  @Input('bandShare') band: Band;

  @HostListener('click') onClick() {
    this.share();
  }

  constructor(private router: Router,
              private snackBar: MdSnackBar,
              private translate: TranslateService) {}

  share() {

    this.translate.get(
      ['chooserTitle', 'message', 'subject']
        .map(key => 'band.share.' + key),
      { name: this.band.name })
    .subscribe((translations) => {

      var options = {
        message: translations['band.share.message'], // not supported on some apps (Facebook, Instagram)
        subject: translations['band.share.subject'], // fi. for email
        url: 'https://songpot.rocks' + this.router.createUrlTree(['bands', this.band._id]).toString(),
        chooserTitle: translations['band.share.chooserTitle'] // Android only, you can override the default share sheet title
      }

      var onSuccess = function() {

        this.translate.get('band.share.success')
        .subscribe((message) => this.ngZone.run(() => {

          this.snackBar.open(message, null, { duration: 5000 });
        }));
      }

      var onError = function(message) {

        this.ngZone.run(() => {
          this.snackBar.open(message, null, { duration: 5000 });
        });
      }

      window['plugins'].socialsharing.shareWithOptions(options, onSuccess, onError);

    });
  }
}
