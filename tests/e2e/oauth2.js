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

    xit('should authorize client', () => {
      // It seems browser.waitForAngularEnabled does not work:
      // Error while waiting for Protractor to sync with the page:
      // "window.angular is undefined.  This could be either because
      // this is a non-angular page or because your test involves
      // client-side navigation, which can interfere with
      // Protractor's bootstrapping.  See http://git.io/v4gXM for details"
      //
      // ...
      // at OAuth2Page.waitForRedirectUrl 

      browser.waitForAngularEnabled(false);

      oauth2Page.get();

      oauth2Page.waitForRedirectUrl();

      browser.waitForAngularEnabled(true);

    });
  });

  describe('when not logged in', () => {

    beforeEach(() => {
      oauth2Page.get();
    });

    afterEach(() => {
      frontPage.get();

      logoutPage.logout();
    });

    xit('should register user and authorize client', () => {

    });

    xit('should login user and authorize client', () => {

    });
  });
});
