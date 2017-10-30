# Song Pot

Cook your music

[![Build Status](https://travis-ci.org/singularities/song-pot.svg?branch=master)](https://travis-ci.org/singularities/song-pot)

# Install

You just need to install [Meteor](https://www.meteor.com/install) and [Yarn](https://yarnpkg.com/lang/en/docs/install/)

Install the npm packages using Yarn

```bash

yarn

```

Start meteor server

```bash

meteor

```

Access the app at `localhost:3000`

### Run the Android app

Meteor provides with Cordova integration out of the box. Instructions on how to
set up the environment can be found at the [Meteor Mobile guide](https://guide.meteor.com/mobile.html)

It basically involves installing the Android SDK, setting env variables and connecting the device (or create an emulator)
Then, you can add the platform `meteor add-platform android` and `meteor run android` (emulator) or `meteor run android-device` (real device)

## Testing

For running unit test, execute

```bash
meteor test --driver-package=practicalmeteor:mocha --port 3002
```

and point your browser to `localhost:3002`

End to end tests are run using

```bash
npm run test:e2e
```

Note that you must have your `meteor` server running for e2e tests
