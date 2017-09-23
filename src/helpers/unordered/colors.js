/*
 * Color Library
 * Provides different ways to generate
 * random colors.
 */
dumdum.addHelper('color', {
  /*
   * Returns a random color name based on Roy G Biv 
   * with black/white included.
   * @returns {string} A color name.
   */
  name: function() {
    return core.choose(colors);
  },

  /*
   * Generates a standard #FFFFFF hex color.
   * @param {boolean} capitalize - When true, the
   * returned hex string will be capitalized.
   * @returns {string} The hex color.
   */
  hex: function(capitalize) {
    var hex = helpers.hex(3);

    if(capitalize) {
      hex = hex.toUpperCase();
    }

    return '#' + hex;
  },

  /*
   * Generates a standard CSS rgb(0,0,0) color string.
   * @returns {string} A CSS rgb color.
   */
  rgb: function() {
    return 'rgb(' + [
        core.integer(255),
        core.integer(255),
        core.integer(255)
      ].join(',') + ')';
  },

  /*
   * Generates a standard CSS rgba(0,0,0,0.5) color string.
   * @returns {string} A CSS rgba color.
   */
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