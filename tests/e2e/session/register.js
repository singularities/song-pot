var Chance = require('chance'),
    chance = new Chance(),
    FrontPage = require('../pages/front'),
    frontPage = new FrontPage(),
    sessionPage = require('../pages/session'),
    registerPage = new sessionPage.Register(),
    logoutPage = new sessionPage.Logout(),
    BandsPage = require('../pages/bands'),
    bandsPage = new BandsPage(),
    BandPage = require('../pages/band'),
    bandPage = new BandPage();

describe('session', () => {
  beforeEach(() => {
    frontPage.get();
  });

  afterEach(() => {
    logoutPage.logout();
  });

  it('should register a new user without a band', () => {
    var userName = chance.name(),
        userEmail = chance.email();

    frontPage.start();

    registerPage.register({
      band: '',
      userName: userName,
      userEmail: userEmail
    });

    bandsPage.waitForBrand();

    expect(bandsPage.getBrand()).toEqual('Song Pot');
  });

  it('should register a new user with a band', () => {
    var band = chance.name(),
        userName = chance.name(),
        userEmail = chance.email();

    frontPage.start();

    registerPage.register({
      band: band,
      userName: userName,
      userEmail: userEmail
    });

    bandPage.waitForBand(band);

    expect(bandPage.getBandName()).toEqual(band);
  });

});
