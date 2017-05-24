var processExec = require('child_process').exec;

class MeteorPage {

  exec (text) {
    var protractorConsole = console;

    return new Promise((resolve, reject) => {

      processExec('echo \'' + text + '\' | meteor shell', (error, stdout, stderr) => {
        if (error) {
          reject(error + ' ' + stderr);
        }

        // debug query result:
        //console.log(stdout);

        resolve(stdout);
      });
    });
  }

}

module.exports = MeteorPage;
