class Session {
  constructor () {
    this.sessionMenuButton = element(by.css('.session-logged-in button'));
    this.logoutButton = element(by.css('button.logout'));
  }

}

class SessionForm {

  constructor () {

    this.default = {
      band: "Quebrantahuesos",
      userName: "Lerón",
      userEmail: "leron@quebrantahuesos.rocks",
      userPassword: 'NoTePagoParaQueMePagues'
    };

    this.bandInput = element(by.css('input[name="bandName"]'));
    this.userNameInput = element(by.css('input[name="userName"]'));
    this.userPasswordInput = element(by.css('input[name="userPassword"]'));
    this.userEmailInput = element(by.css('input[name="userEmail"]'));

    this.formButton = element(by.css('form button[type=submit]'));
  }

  setBand (name = this.default.band) {
    return this.bandInput.sendKeys(name);
  }

  setUserName (name = this.default.userName) {
    return this.userNameInput.sendKeys(name);
  }

  setUserEmail (email = this.default.userEmail) {
    return this.userEmailInput.sendKeys(email);
  }

  setPassword (password = this.default.password) {
    return this.userPasswordInput.sendKeys(password);
  }

  submit () {
    this.formButton.click();
  }

}

class Register extends SessionForm {

  register (data = {}, options = { waitForFocus: true }) {

    // Angular Material dialog focus the first element
    // we have to wait or the sendKeys methods are messed up
    if (options.waitForFocus) {
      browser.wait(() => this.bandInput.equals(browser.driver.switchTo().activeElement()));
    }

    this.setBand(data.band);
    this.setUserName(data.userName);
    this.setUserEmail(data.userEmail);

    this.submit();
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
  }
}

module.exports = {
  Register,
  ForgotPassword,
  Logout
};
