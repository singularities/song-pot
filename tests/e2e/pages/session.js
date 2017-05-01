class Session {

  constructor () {

    this.default = {
      band: "Quebrantahuesos",
      userName: "Lerón",
      userEmail: "leron@quebrantahuesos.rocks",
      userPassword: 'NoTePagoParaQueMePagues'
    };

    this.bandInput = element(by.css('input[name="band"]'));
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

class Register extends Session {

  register (data = {}) {
    this.setBand(data.band);
    this.setUserName(data.userName);
    this.setUserEmail(data.userEmail);

    this.submit();
  }
}

class ForgotPassword extends Session {

  forgotPassword (data = {}) {

  }
}

module.exports = {
  Register
};
