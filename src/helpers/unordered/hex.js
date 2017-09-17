dumdum.addHelper('hex', function(length, uppercase) {
  if(typeof length !== 'number') {
    return '';
  }

  var value = '', octet;
  for(var h = 0; h < length; h++) {
    octet = core.integer(255).toString(16)

    //Leading zero, hex octet is "00" to "FF"
    if(octet.length === 1) {
      octet = '0' + octet;
    }

    value += octet;
  }

  if(uppercase == true) {
    value = value.toUpperCase();
  }

  return value;
});