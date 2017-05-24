var Fixtures = require('./e2e/fixtures');

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
    global.fixtures = new Fixtures();

    return global.fixtures.prepare();
  }
};
