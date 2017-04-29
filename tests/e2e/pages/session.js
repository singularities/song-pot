class Session {

  constructor () {

    this.bandInput = element(by.css('input[name="band"]'));
    this.userNameInput = element(by.css('input[name="userName"]'));
    this.userPasswordInput = element(by.css('input[name="userPassword"]'));
    this.userEmailInput = element(by.css('input[name="userEmail"]'));

    this.formButton = element(by.css('form button[type=submit]'));
  }

  setBand (name) {
    return this.bandInput.sendKeys(name);
  }

  setUserName (name) {
    return this.userNameInput.sendKeys(name);
  }

  setUserEmail (email) {
    return this.userEmailInput.sendKeys(email);
  }

  setPassword (password) {
    return this.userPasswordInput.sendKeys(password);
  }

  submit () {
    this.formButton.click();
  }

}

class Register extends Session {

  register (data = {}) {
    this.setBand(data.band);
    this.setUserName(data.userName);
    this.setUserEmail(data.userEmail);

    this.submit();
  }
}

module.exports = {
  Register
};
