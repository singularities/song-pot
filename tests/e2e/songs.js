var Chance = require('chance'),
    chance = new Chance(),
    BandPage = require('./pages/band'),
    bandPage = new BandPage(),
    SongPage = require('./pages/song'),
    songPage = new SongPage(),
    sessionPages = require('./pages/session'),
    sessionPage = new sessionPages.Session();

describe('user', function() {

  afterEach(() => {
    sessionPage.logout();
  });

  it('should create a song', function() {
    let title = chance.sentence({ words: 3 });
    let text = chance.paragraph({ sentences: 1});

    bandPage.get();

    sessionPage.login();

    bandPage.addSong();

    songPage.create({
      title: title,
      text: text
    });

    expect(songPage.getTitle()).toBe(title);
    expect(songPage.getText()).toBe(text);
  });
});
