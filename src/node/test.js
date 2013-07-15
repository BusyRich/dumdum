var dumdum = require('./dumdum.js');

dumdum.helper('echo', function(str) {
  return str;
});

var data = dumdum(10, function(it) {
  return {
    name: str('CVCVCC ###'),
    email: helpers.email(),
    homepage: helpers.website(),
    //age: int(10, 20),
    //pack: float(100, 200),
    //thing: choose(['thing1','thing2','thing3','thing4','thing5']),
    //created: datetime(it * 1000),
    //message: helpers.ipsum(),
    card: helpers.creditcard(' ')
    /*
    address: {
      street: helpers.street(),
      city: helpers.city(),
      state: helpers.state(),
      zip: random.int(10000, 99999)
    }
    */
  };
});

console.log(data);