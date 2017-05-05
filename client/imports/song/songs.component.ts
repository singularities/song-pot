import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Songs } from '../../../imports/collections';

import template from "./songs.html";

@Component({
  selector: 'songs',
  template
})

export class SongsComponent implements OnInit {

  private _songIds = new BehaviorSubject<string[]>([]);
  songs;


  @Input()
  set songIds(value) {
    this._songIds.next(value || []);
  }

  get songIds() {
    return this._songIds.getValue();
  }

  ngOnInit(): void {

    this._songIds
        .subscribe(ids => this.songs = Songs.find({
          _id: { '$in': ids }
        }, {
          sort: {
            createdAt: -1
          }
        }).zone());
  }
}
