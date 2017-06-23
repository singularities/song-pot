class SongPage {

  constructor() {
    this.titleElement = element(by.css('.song-title h2'));
    this.textElement = element(by.css('.song-desktop .text'));

    this.titleInput = element(by.css('.song-desktop input[name="title"]'));
    this.textInput = element(by.css('.song-desktop textarea[name="text"]'));
    this.saveButton = element(by.css('button.song-save'));
  }

  getTitle() {
    return this.titleElement.getText();
  }

  getText() {
    return this.textElement.getText();
  }

  setTitle (title) {
    browser.wait(protractor.ExpectedConditions.visibilityOf(this.titleInput));

    this.titleInput.sendKeys(title);
  }

  setText (text) {
    this.textInput.sendKeys(text);
  }

  save () {
    this.saveButton.click();
  }

  create(params) {

    this.setTitle(params.title);
    this.setText(params.text);

    this.save();
  }

}

module.exports = SongPage;
