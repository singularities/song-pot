var FrontPage = require('../pages/front'),
    frontPage = new FrontPage(),
    sessionPage = require('../pages/session'),
    registerPage = new sessionPage.Register(),
    loginPage = new sessionPage.Login(),
    logoutPage = new sessionPage.Logout(),
    BandsPage = require('../pages/bands'),
    bandsPage = new BandsPage();

describe('session', () => {

  afterEach(() => {
    logoutPage.logout();
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
