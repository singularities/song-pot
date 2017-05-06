import { Component, NgZone } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MdDialog } from '@angular/material';
import { ObservableMedia } from '@angular/flex-layout';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { MeteorObservable } from 'meteor-rxjs';

import { Band } from '../../../imports/models';
import { Bands } from '../../../imports/collections';

import { BandService } from './band.service';
import { BandToolbarService } from './toolbar.service';
import { BandDialogCreate } from './dialog/create.component';

import template from './bands.html';


@Component({
  selector: 'bands',
  template
})

export class BandsComponent {

  bands: Observable<Band[]>;
  bandsSub: Subscription;
  bandChangedSub: Subscription;
  toolbarChangedSub: Subscription;

  currentBand;
  showToolbar: boolean;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private ngZone: NgZone,
              private dialog: MdDialog,
              public media: ObservableMedia,
              private bandService: BandService,
              private toolbarService: BandToolbarService) { }

  ngOnInit() {
    this.bands = Bands.find({}).zone();
    this.bandsSub = MeteorObservable.subscribe('bands').subscribe();

    this.bandChangedSub = this.bandService.bandChanged$
      .subscribe(band => this.ngZone.run(() => {
        this.currentBand = band;
      }))

    this.toolbarChangedSub = this.toolbarService.toolbarChanged$
      .subscribe(value => this.ngZone.run(() => {
        this.showToolbar = value;
      }))
  }

  ngOnDestroy() {
    this.bandsSub.unsubscribe();

    this.bandChangedSub.unsubscribe();

    this.toolbarChangedSub.unsubscribe();
  }

  newBand() {
    let dialogRef = this.dialog.open(BandDialogCreate);

    dialogRef.afterClosed().subscribe(name => {

      if (name) {
        Bands
          .insert({
            name: name,
            createdAt: new Date(),
            userIds: [ Meteor.userId() ],
            songIds: []
          })
          .subscribe(id => {
            this.router.navigate(['/bands', id]);
          });
      }
    });
  }

}
