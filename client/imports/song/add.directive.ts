import { Directive, HostListener, Input } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {
  }

  create () {

    Songs
      .insert({
        bandId: this.band._id,
        createdAt: new Date()
      })
      .subscribe(id => {
        this.router.navigate(['/songs/', id, 'edit']);
      });

  }
}
