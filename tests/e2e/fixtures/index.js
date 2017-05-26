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
    `);
  }
}

module.exports = Fixtures;
