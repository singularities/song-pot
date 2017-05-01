class FrontPage {

  constructor () {
    this.startButton = element(by.css('.intro button'));
  }

  get () {
    browser.get('/');
  }

  start () {
    this.startButton.click();
  }

}

module.exports = FrontPage;
