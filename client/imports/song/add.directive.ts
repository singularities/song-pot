import { Directive, HostListener, Input, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MdSnackBar } from '@angular/material';
import { MeteorObservable } from 'meteor-rxjs';

import { Songs } from '../../../imports/collections';
import { Band } from '../../../imports/models';

@Directive({
  selector: '[songAdd]'
})

export class SongAddDirective {

  @Input('songAdd') band: Band;

  @HostListener('click') onClick() {
    this.create();
  }

  constructor(private router: Router,
              private route: ActivatedRoute,
              private ngZone: NgZone,
              private snackBar: MdSnackBar) {
  }

  create () {

    MeteorObservable.call('song.insert', {
      bandId: this.band._id
    })
    .subscribe({
      next: (id) => {
        this.router.navigate([id, 'edit'], { relativeTo: this.route });
      },
      error: (e) => {

        this.ngZone.run(() => {
          this.snackBar.open(e.reason, null, { duration: 5000 });
        });

      }
    });
  }
}
