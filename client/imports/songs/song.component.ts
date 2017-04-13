import { Component, OnInit } from '@angular/core';

import { Songs } from '../../../imports/collections';

import template from "./song.html";

@Component({
  selector: 'song',
  template
})

export class SongComponent implements OnInit {
  song;

  ngOnInit(): void {
// find song
//    this.song = Songs.find({});
  }
}
