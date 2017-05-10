class BandsPage {

  constructor() {
    this.brandElement = element(by.css('.brand'));
  }

  getBrand() {
    return this.brandElement.getText();
  }

  waitForBrand() {
    browser.wait(protractor.ExpectedConditions.textToBePresentInElement(this.brandElement, 'Song Pot'));
  }
}

module.exports = BandsPage;
