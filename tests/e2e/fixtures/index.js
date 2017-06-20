var MeteorPage = require('../pages/meteor'),
    meteorPage = new MeteorPage();

class Fixtures {

  constructor() {

    this.user = {
      email: "leron@quebrantahuesos.rocks",
      password: 'NoTePagoParaQueMePagues',
      profile: {
        name: "Lerón"
      }
    };

    this.band = {
      name: "Quebrantahuesos"
    };
  }

  prepare() {


    return meteorPage.exec(`
      Accounts.findUserByEmail("${ this.user.email}") ||
      Accounts.createUser(${ JSON.stringify(this.user)})
    `).then(() => {
      return meteorPage.exec(`
        Bands.collection.insert({
          name: "${ this.band.name }",
          createdAt: new Date(),
          userIds: [],
          songIds: []
        })
      `).then((bandId) => global.fixtures.band.id = /"(.*)"/.exec(bandId)[1]);
    });
  }
}

module.exports = Fixtures;
