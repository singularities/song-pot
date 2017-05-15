var sessionPages = require('./e2e/pages/session'),
    FrontPage = require('./e2e/pages/front');
    BandPage = require('./e2e/pages/band');

exports.config = {
  directConnect: true,
  specs: [ 'e2e/**/*.js' ],
  baseUrl: 'http://localhost:3000',
  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      args: ['--window-size=1024,800']
    }
  },
  onPrepare: function () {
    var registerPage = new sessionPages.Register(),
        frontPage  = new FrontPage(),
        defaultBandPage  = new BandPage();

    /*
    frontPage.get();

    frontPage.start();

    registerPage.register();

    defaultBandPage.waitForBand(registerPage.default.band);

    return browser.getCurrentUrl().then((url) => {
      global.defaultBandPage.url = url;
    });

    */
  }
};
