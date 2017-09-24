/*
 * Generates a UUID based on the RFC4122 version 4
 * standards for creating them with Pseudo-Random Numbers.
 * By default DumDum uses JS' Math.random() and thus
 * these UUIDs may not be truly globally unique.
 * @param {boolean} capitalize - When true the UUID
 * will be capitalized.
 * @returns A UUID.
 */
dumdum.addHelper('uuid', function(capitalize) {
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
        uuid += 4 + helpers.hex(1, capitalize).substr(0,1);
        break;
      case 11:
        uuid += '01';
        break;
      default:
        uuid += helpers.hex(1, capitalize);
        break;
    }
  }

  return uuid;
});