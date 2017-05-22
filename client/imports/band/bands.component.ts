import { Component, NgZone } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MdDialog, MdSnackBar } from '@angular/material';
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

  bands: Band[];
  bandsSub: Subscription;
  bandChangedSub: Subscription;
  toolbarChangedSub: Subscription;
  createSubscription: Subscription;

  currentBand;
  showToolbar: boolean;
  showShare: boolean = Meteor.isCordova;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private ngZone: NgZone,
              private dialog: MdDialog,
              private snackBar: MdSnackBar,
              public media: ObservableMedia,
              private bandService: BandService,
              private toolbarService: BandToolbarService) { }

  ngOnInit() {
    Bands.find({})
    .subscribe(bands => {
      this.ngZone.run(() => {
        this.bands = bands;

        this.bandService.bandsChanged$.next(bands);
      });

    })
    this.bandsSub = MeteorObservable.subscribe('bands').subscribe();

    this.bandChangedSub = this.bandService.bandChanged$
      .subscribe(band => this.ngZone.run(() => {
        this.currentBand = band;
      }))

    this.toolbarChangedSub = this.toolbarService.toolbarChanged$
      .subscribe(value => this.ngZone.run(() => {
        this.showToolbar = value;
      }))

    this.createSubscription = this.bandService.create$.subscribe(() => this.newBand());
  }

  ngOnDestroy() {
    this.bandsSub.unsubscribe();

    this.bandChangedSub.unsubscribe();

    this.toolbarChangedSub.unsubscribe();

    this.createSubscription.unsubscribe();
  }

  newBand() {
    let dialogRef = this.dialog.open(BandDialogCreate);

    dialogRef.afterClosed().subscribe(name => {

      if (name) {
        MeteorObservable.call('band.insert', {
          name: name
        })
        .subscribe({
          next: (id) => {
            this.router.navigate([id], { relativeTo: this.route });
          },
          error: (e) => {

            this.ngZone.run(() => {
              this.snackBar.open(e.reason, null, { duration: 5000 });
            });
          }
        });
      }
    });
  }

}
