describe('front', () => {

  beforeAll(() => {
    browser.get('/');
  });


  it('should show the start button', () => {

    var startButton = element(by.css('.intro button'));

    expect(startButton.isPresent()).toBe(true);

    });
  });
