class BandsPage {

  constructor() {
    this.brandElement = element(by.css('.desktop-brand'));
    this.bandsMenuTrigger = element(by.css('.bands-menu-trigger'));
    this.bandsMenuElements = element.all(by.css('.mat-menu-panel button'));
    this.bandsMenuCreateElement = element(by.css('.mat-menu-panel button:last-child'));
    this.bandsMenuBackdrop = element(by.css('.cdk-overlay-backdrop.cdk-overlay-backdrop-showing'));

    this.brandElementText = 'Song Pot';
    this.bandsMenuCreateElementText = 'Create new band';
  }

  getBrand() {
    return this.brandElement.getText();
  }

  openBandsMenu() {
    this.bandsMenuTrigger.click();
  }

  closeBandsMenu() {
    this.bandsMenuBackdrop.click();
  }

  getBands() {
    
    this.waitForBandsMenu();

    return this.bandsMenuElements.getText();
  }

  waitForBandsMenu() {

    browser.wait(protractor.ExpectedConditions.textToBePresentInElement(this.bandsMenuCreateElement, this.bandsMenuCreateElementText));
  }

  waitForBrand() {
    browser.wait(protractor.ExpectedConditions.textToBePresentInElement(this.brandElement, this.brandElementText));
  }
}

module.exports = BandsPage;
