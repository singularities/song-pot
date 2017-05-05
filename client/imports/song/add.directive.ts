import { Directive, HostListener, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

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
              private route: ActivatedRoute) {
  }

  create () {

    Songs
      .insert({
        bandId: this.band._id,
        audioIds: [],
        createdAt: new Date()
      })
      .subscribe(id => {
        this.router.navigate([id, 'edit'], { relativeTo: this.route });
      });

  }
}
