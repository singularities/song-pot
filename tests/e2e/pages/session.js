var config = require('../../e2e').config;

const AfterLoginUrl = config.baseUrl + '/bands';

/*
 * Models the session part in the toolbar in desktop devices
 */
class SessionToolbar {
  constructor () {

    this.sessionFormButton = element(by.css('.session-logged-out button'));
    this.sessionMenuButton = element(by.css('.session-logged-in button'));
    this.logoutButton = element(by.css('button.logout'));
  }

  showForm() {
    this.sessionFormButton.click();
  }

  logout() {

    browser.wait(this.sessionMenuButton.isPresent());

    this.sessionMenuButton.click();
    this.logoutButton.click();

    browser.wait(() => browser.getCurrentUrl().then((url) => url === config.baseUrl + '/'));
  }
}

/*
 * Common class for session forms
 */
class SessionForm {

  constructor () {

    this.bandInput = element(by.css('input[name="bandName"]'));
    this.userNameInput = element(by.css('input[name="userName"]'));
    this.userPasswordInput = element(by.css('input[name="userPassword"]'));
    this.userEmailInput = element(by.css('input[name="userEmail"]'));

    this.formButton = element(by.css('form button[type=submit]'));

    this.otherActionLink = element(by.css('.other-action-link a'));
  }

  setBand (name = global.fixtures.band.name) {
    this.bandInput.clear();
    
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
    browser.wait(() => browser.getCurrentUrl().then((url) => url.indexOf(AfterLoginUrl) === 0));
  }

  goToOtherAction() {
    this.otherActionLink.click();
  }

}

class Register extends SessionForm {

  register (data = {}, newOptions = {}) {

    let options = Object.assign({
      waitForFocus: true,
      waitForAfterLoginUrl: true,
      setBand: true
    }, newOptions);

    // Angular Material dialog focus the first element
    // we have to wait or the sendKeys methods are messed up
    if (options.waitForFocus) {
      browser.wait(() => this.bandInput.equals(browser.driver.switchTo().activeElement()));
    }

    if (options.setBand) {

      this.setBand(data.band);
    }

    this.setUserName(data.userName);
    this.setUserEmail(data.userEmail);

    this.submit();

    if (options.waitForAfterLoginUrl) {
      this.waitForAfterLoginUrl();
    }

  }

  goToLogin() {

    this.goToOtherAction();
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


/*
 * Glue class for session operations
 */
class Session {

  constructor() {
    // TODO Mobile support with SessionSidebar
    this.sessionBar = new SessionToolbar();
    this.sessionForm = new SessionForm();
  }

  showRegister() {
    // TODO support for frontpage, which shows register directly

    this.sessionBar.showForm();

    this.sessionForm.goToOtherAction();

  }

  logout () {
    this.sessionBar.logout();
  }
}

module.exports = {
  Register,
  Login,
  ForgotPassword,
  Session
};
