dumdum.addHelper('datetime', function(maxOffset, start) {
  start = start || new Date();

  var matches = maxOffset.match(offsetFormatRegex);
  if(matches && matches.length >= 3 && intervals.hasOwnProperty(matches[2])) {
    return new Date(start.getTime() + 
      core.integer(intervals[matches[2]] * parseInt(matches[1])));
  }

  return new Date();  
},{
  intervals: {
    s: 1000,
    m: 60 * 1000,
    h: 60 * 60 * 1000,
    d: 24 * 60 * 60 * 1000,
    w: 7 * 24 * 60 * 60 * 1000,
    M: 4 * 7 * 24 * 60 * 60 * 1000,
    y: 52 * 7 * 24 * 60 * 60 * 1000
  },
  offsetFormatRegex: /^([0-9]+)([smhdwMy]{1})$/
});