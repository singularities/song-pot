class OAuth2Page {

  get() {
    browser.get(`/oauth/authorize?client_id=${ global.fixtures.oauth2Client.clientId }&response_type=code&redirect_uri=${ global.fixtures.oauth2Client.redirectUri }`);
  }

  waitForRedirectUrl() {

    browser.wait(() => browser.getCurrentUrl().then((url) => url.indexOf(global.fixtures.oauth2Client.redirectUri) === 0));
  }

}

module.exports = OAuth2Page;
