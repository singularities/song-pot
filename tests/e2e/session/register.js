var Chance = require('chance'),
    chance = new Chance(),
    FrontPage = require('../pages/front'),
    frontPage = new FrontPage(),
    sessionPage = require('../pages/session'),
    registerPage = new sessionPage.Register(),
    BandPage = require('../pages/band'),
    bandPage = new BandPage();

describe('session', () => {
  beforeAll(() => {
    frontPage.get();
  });

  it('should register a new user with a band', () => {
    var band = chance.name(),
        userName = chance.name(),
        userEmail = chance.email();

    frontPage.startButton.click();

    registerPage.register({
      band: band,
      userName: userName,
      userEmail: userEmail
    });

    browser.wait(protractor.ExpectedConditions.textToBePresentInElement(bandPage.bandNameElement, band));

    expect(bandPage.getBandName()).toEqual(band);
  });

});
