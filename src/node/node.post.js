
//Allows node servers to send the dumdum client source to the client
dumdum.client = require('fs')
  .readFileSync(__dirname + '/client.js','utf8');

module.exports = dumdum;