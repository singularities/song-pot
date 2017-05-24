var config = require('../../e2e').config;

const AfterLoginUrl = config.baseUrl + '/bands';

class Session {
  constructor () {

    this.sessionMenuButton = element(by.css('.session-logged-in button'));
    this.logoutButton = element(by.css('button.logout'));
  }

}

class SessionForm {

  constructor () {

    this.bandInput = element(by.css('input[name="bandName"]'));
    this.userNameInput = element(by.css('input[name="userName"]'));
    this.userPasswordInput = element(by.css('input[name="userPassword"]'));
    this.userEmailInput = element(by.css('input[name="userEmail"]'));

    this.formButton = element(by.css('form button[type=submit]'));
  }

  setBand (name = global.fixtures.band.name) {
    return this.bandInput.sendKeys(name);
  }

  setUserName (name = global.fixtures.user.profile.name) {
    return this.userNameInput.sendKeys(name);
  }

  setUserEmail (email = global.fixtures.user.email) {
    return this.userEmailInput.sendKeys(email);
  }

  setUserPassword (password = global.fixtures.user.password) {
    return this.userPasswordInput.sendKeys(password);
  }

  submit () {
    this.formButton.click();
  }

  waitForAfterLoginUrl () {
    browser.wait(() => browser.getCurrentUrl().then((url) => url === AfterLoginUrl));
  }

}

class Register extends SessionForm {

  constructor() {
    super();

    this.loginLink = element(by.css('.other-action-link a'));
  }

  register (data = {}, options = { waitForFocus: true, waitForAfterLoginUrl: true }) {

    // Angular Material dialog focus the first element
    // we have to wait or the sendKeys methods are messed up
    if (options.waitForFocus) {
      browser.wait(() => this.bandInput.equals(browser.driver.switchTo().activeElement()));
    }

    this.setBand(data.band);
    this.setUserName(data.userName);
    this.setUserEmail(data.userEmail);

    this.submit();

    if (options.waitForAfterLoginUrl) {
      this.waitForAfterLoginUrl();
    }

  }

  goToLogin() {

    this.loginLink.click();
  }
}

class Login extends SessionForm {

  login(data = {}, options = { waitForFocus: true, waitForAfterLoginUrl: true }) {

    // Angular Material dialog focus the first element
    // we have to wait or the sendKeys methods are messed up
    if (options.waitForFocus) {
      browser.wait(() => this.userEmailInput.equals(browser.driver.switchTo().activeElement()));
    }

    this.setUserEmail(data.userEmail);
    this.setUserPassword(data.password);

    this.submit();

    if (options.waitForAfterLoginUrl) {
      this.waitForAfterLoginUrl();
    }
  }
}

class ForgotPassword extends SessionForm {

  forgotPassword (data = {}) {

  }
}

class Logout extends Session {

  logout () {
    browser.wait(this.sessionMenuButton.isPresent());

    this.sessionMenuButton.click();
    this.logoutButton.click();

    browser.wait(() => browser.getCurrentUrl().then((url) => url === config.baseUrl + '/'));
  }
}

module.exports = {
  Register,
  Login,
  ForgotPassword,
  Logout
};
