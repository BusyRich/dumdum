{
  name: function() {
    return colors[random.int(colors.length - 1)];
  },
  hex: function() {
    var hex = random.hex(3);

    while(hex.length < 6) {
      hex = '0' + hex;
    }

    return '#' + hex;
  },
  rgb: function() {
    return 'rgb(' +
      random.int(255) + ',' +
      random.int(255) + ',' +
      random.int(255) + ')';
  },
  rgba: function() {
    return 'rgba(' +
      random.int(255) + ',' +
      random.int(255) + ',' +
      random.int(255) + ',' +
      random.float().toFixed(2) + ')';
  }
}