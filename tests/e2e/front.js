var FrontPage = require('./pages/front'),
    frontPage = new FrontPage();

describe('front', () => {

  beforeAll(() => {
    frontPage.get();
  });


  it('should show the start button', () => {

    expect(frontPage.startButton.isPresent()).toBe(true);

    });
  });
