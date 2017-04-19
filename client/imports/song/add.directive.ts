import { Directive, HostListener, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Songs } from '../../../imports/collections';

@Directive({
  selector: '[song-add]'
})

export class SongAddDirective {

  @HostListener('click') onClick() {
    this.create();
  }

  constructor(private router: Router) {
  }

  create () {

    Songs
      .insert({
        createdAt: new Date()
      })
      .subscribe(id => {
        this.router.navigate(['/songs/', id, 'edit']);
      });

  }
}
