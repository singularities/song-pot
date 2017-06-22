var FrontPage = require('../pages/front'),
    frontPage = new FrontPage(),
    sessionPages = require('../pages/session'),
    sessionPage = new sessionPages.Session(),
    registerPage = new sessionPages.Register(),
    loginPage = new sessionPages.Login(),
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


    it('should login registered user', () => {

      frontPage.start();

      registerPage.goToLogin();

      loginPage.login();

      bandsPage.waitForBrand();
    });
  });

  describe('in a band page', () => {

    beforeEach(() => {

      bandPage.get();
    });

    it('should login registered user and add it to a band', () => {

      sessionPage.showLogin();

      loginPage.login();

      bandPage.waitForBand(global.fixtures.band.name);

      bandsPage.openBandsMenu();

      expect(bandsPage.getBands()).toContain(global.fixtures.band.name);

      bandsPage.closeBandsMenu();
    });
  });
});
