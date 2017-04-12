import { Component, OnInit } from '@angular/core';

import { Songs } from '../../../imports/collections';

import template from "./songs.html";

@Component({
  selector: 'songs',
  template
})

export class SongsComponent implements OnInit {
  songs;

  ngOnInit(): void {
    this.songs = Songs.find({});
  }
}
