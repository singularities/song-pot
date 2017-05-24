var FrontPage = require('./pages/front'),
    frontPage = new FrontPage(),
    sessionPages = require('./pages/session'),
    registerPage = new sessionPages.Register(),
    loginPage = new sessionPages.Login(),
    logoutPage = new sessionPages.Logout(),
    OAuth2Page = require('./pages/oauth2'),
    oauth2Page = new OAuth2Page();

describe('oauth2 authorization', () => {

  describe('when logged in', () => {

    beforeEach(() => {

      frontPage.get();

      frontPage.start();

      registerPage.goToLogin();

      loginPage.login();
    });

    afterEach(() => {
      frontPage.get();

      logoutPage.logout();
    });

    it('should authorize client', () => {

      oauth2Page.get();

      oauth2Page.waitForRedirectUrl();

    });
  });
});
