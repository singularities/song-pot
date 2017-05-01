class BandPage {

  constructor() {
    this.bandNameElement = element(by.css('.band-name'));
  }

  getBandName() {
    return this.bandNameElement.getText();
  }

  waitForBand(name) {
    browser.wait(protractor.ExpectedConditions.textToBePresentInElement(this.bandNameElement, name));
  }
}

module.exports = BandPage;
