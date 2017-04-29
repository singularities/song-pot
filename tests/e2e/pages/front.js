class FrontPage {

  constructor () {
    this.startButton = element(by.css('.intro button'));
  }

  get () {
    browser.get('/');
  }

}

module.exports = FrontPage;
