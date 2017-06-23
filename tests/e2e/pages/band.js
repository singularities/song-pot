class BandPage {

  constructor() {
    this.bandNameElement = element(by.css('.band-name'));
    this.addSongElement = element(by.css('button.song-add'));
  }

  get(id = global.fixtures.band.id) {
    browser.get('/bands/' + id);
  }

  getBandName() {
    return this.bandNameElement.getText();
  }

  waitForBand(name) {
    browser.wait(protractor.ExpectedConditions.textToBePresentInElement(this.bandNameElement, name));
  }

  addSong() {
    this.addSongElement.click();
  }
}

module.exports = BandPage;
