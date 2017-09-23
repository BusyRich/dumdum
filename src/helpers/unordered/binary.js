/*
 * Generates a given number of bits.
 * @param {number} bits - The number of bits to generate.
 * @returns {string} The bits generated.
 */
dumdum.addHelper('binary', function(bits) {
  if(!utility.type(bits, 'number')) {
    return '';
  }

  var value = '';
  for(var b = 0; b < bits; b++) {
    value += core.integer();
  }

  return value;
});