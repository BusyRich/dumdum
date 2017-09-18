dumdum.addHelper('uuid', function() {
  var uuid = '', octet;
  for (var i = 0; i < 20; i++) {
    switch(i) {
      case 4:
      case 7:
      case 10:
      case 13:
        uuid += '-';
        break;
      case 8:
        uuid += 4 + helpers.hex(1, true).substr(0,1);
        break;
      case 11:
        uuid += '01';
        break;
      default:
        uuid += helpers.hex(1, true);
        break;
    }
  }

  return uuid;
});