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

    this.oauth2Client = {
      clientId: '592450209ec9e9fb85289882',
      redirectUri: 'http://localhost:3200/redirectUri',
      secret: '12345',
      name: 'OAuth2 testing client',
      active: true
    };
  }

  prepare() {

    return meteorPage.exec(`
      Accounts.findUserByEmail("${ this.user.email}") ||
      Accounts.createUser(${ JSON.stringify(this.user)}),

      oAuth2Server.collections.client.upsert(
        {
          clientId: "${ this.oauth2Client.clientId}"
        },
        {
          $set: ${ JSON.stringify(this.oauth2Client)}
        }
      )
    `);
  }
}

module.exports = Fixtures;
