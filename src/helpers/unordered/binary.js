dumdum.addHelper('binary', function(bits) {
  if(typeof bits !== 'number' && typeof bits !== 'string') {
    return '';
  }

  var value = '';
  if(typeof bits === 'number') {
    for(var b = 0; b < bits; b++) {
      value += core.integer();
    }
  } else {
    for(var c = 0; c < bits.length; c++) {
      value += bits.charCodeAt(c).toString(2);
    }

    value = pad.substring(value.length) + value;
  }

  return value;
}, {
  pad: '00000000'
});