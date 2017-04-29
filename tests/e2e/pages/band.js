class BandPage {

  constructor() {
    this.bandNameElement = element(by.css('.band-name'));
  }

  getBandName() {
    return this.bandNameElement.getText();
  }

}

module.exports = BandPage;
