dumdum.addHelper('color', {
  name: function() {
    return core.choose(colors);
  },
  hex: function(captialize) {
    var hex = helpers.hex(3);

    if(captialize) {
      hex = hex.toUpperCase();
    }

    return '#' + pad.slice(hex.length) + hex;
  },
  rgb: function() {
    return 'rgb(' + [
        core.integer(255),
        core.integer(255),
        core.integer(255)
      ].join(',') + ')';
  },
  rgba: function() {
    return 'rgba(' + [
        core.integer(255),
        core.integer(255),
        core.integer(255),
        core.float().toFixed(2)
      ].join(',') + ')';
  }
}, {
  pad: '000000',
  //colors based on Roy G Biv and Neutrals
  colors: ['Black','White','Grey','Red','Orange',
    'Yellow','Green','Blue','Indigo','Violet']
});