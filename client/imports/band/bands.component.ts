import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { MeteorObservable } from 'meteor-rxjs';

import { Band } from '../../../imports/models';
import { Bands } from '../../../imports/collections';

import { BandDialogCreate } from './dialog/create.component';

import template from './bands.html';

@Component({
  selector: 'bands',
  template
})

export class BandsComponent {

  bands: Observable<Band[]>;
  bandsSub: Subscription;
  currentBand: string;

  constructor(private router: Router,
              private dialog: MdDialog) { }

  ngOnInit() {
    this.bands = Bands.find({}).zone();
    this.bandsSub = MeteorObservable.subscribe('bands').subscribe();
  }

  ngOnDestroy() {
    this.bandsSub.unsubscribe();
  }

  newBand() {
    let dialogRef = this.dialog.open(BandDialogCreate);

    dialogRef.afterClosed().subscribe(name => {

      if (name) {
        Bands
          .insert({
            name: name,
            createdAt: new Date(),
            userIds: [ Meteor.userId() ]
          })
          .subscribe(id => {
            this.router.navigate(['/bands', id]);
          });
      }
    });
  }

}
