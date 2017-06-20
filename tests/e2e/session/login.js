var FrontPage = require('../pages/front'),
    frontPage = new FrontPage(),
    sessionPages = require('../pages/session'),
    sessionPage = new sessionPages.Session(),
    registerPage = new sessionPages.Register(),
    loginPage = new sessionPages.Login(),
    BandsPage = require('../pages/bands'),
    bandsPage = new BandsPage();

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

    xit('should login registered user and add it to a band', () => {

    });
  });
});
