var dumdum = require('./../build/node/dumdum.js');

dumdum.addHelper('myGenny', function(switchPercent) {
  if(core.integer(100) > switchPercent) {
    return core.float(100);
  } else {
    return core.string('A# ') + extra();
  }
}, {
  extra: function() {
    return 'Extra String.';
  }
});

console.log(dumdum(10, function() {
  return {
    // aRandom: random(),
    // anInt: integer(100),
    // aFloat: float(3),
    // aBoolean: boolean(),
    // aString: string('$$-\\$c-$c$C-#####-\\$[rqwegba]-#-\\$\\$$$$\\$c\\#-$[23ewf42]6$[!@$%^&*]-$V')
    // myGenny: helpers.myGenny(80),
    // aHex: helpers.hex(6, true),
    // aBinary: helpers.binary(' '),
    // aColor: helpers.color.rgb(),
    // aCreditCard: helpers.personal.creditCard()
    // aDatetime: helpers.datetime('3y', new Date(1990, 1, 1))
    // aIpsum: helpers.ipsum()
    // anAddress: helpers.personal.address()
    // anEmail: helpers.personal.email()
    // aUUID: helpers.uuid()
  };
}));