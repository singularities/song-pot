var Chance = require('chance'),
    chance = new Chance(),
    FrontPage = require('../pages/front'),
    frontPage = new FrontPage(),
    sessionPages = require('../pages/session'),
    sessionPage = new sessionPages.Session(),
    registerPage = new sessionPages.Register(),
    BandsPage = require('../pages/bands'),
    bandsPage = new BandsPage(),
    BandPage = require('../pages/band'),
    bandPage = new BandPage();

describe('session', () => {

  afterEach(() => {
    sessionPage.logout();
  });

  describe('in front page', () => {

    beforeEach(() => {
      frontPage.get();
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

  describe('in a band page', () => {

    it('should register a new user and add her to the band', () => {
      bandPage.get();

      sessionPage.showRegister();

      registerPage.register({
        userName: chance.name(),
        userEmail: chance.email()
      }, { setBand: false });

      bandPage.waitForBand(global.fixtures.band.name);

      bandsPage.openBandsMenu();

      expect(bandsPage.getBands()).toContain(global.fixtures.band.name);

      bandsPage.closeBandsMenu();

    });

    it('should register a new user and add create a new band', () => {
      let bandName = chance.name();

      bandPage.get();

      sessionPage.showRegister();

      registerPage.register({
        band: bandName,
        userName: chance.name(),
        userEmail: chance.email()
      });

      bandPage.waitForBand(bandName);

      bandsPage.openBandsMenu();

      expect(bandsPage.getBands()).toContain(bandName);
      expect(bandsPage.getBands()).not.toContain(global.fixtures.band.name);

      bandsPage.closeBandsMenu();
    });
  });
});
