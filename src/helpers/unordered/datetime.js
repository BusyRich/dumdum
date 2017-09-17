dumdum.addHelper('datetime', function(offset) {
  var interval = 0;

  if(typeof offset === 'number') {
    interval = offset;
  }

  if(typeof offset === 'string') {
    var matches = offset.match(/^([0-9]+)([smhdwMy]{1})$/);
    if(matches && matches.length >= 3 && intervals.hasOwnProperty(matches[2])) {
      interval = intervals[matches[2]] * parseInt(matches[1]);
    }
  }

  return new Date(Date.now() + interval);
},{
  intervals: {
    s: 1000,
    m: 60 * 1000,
    h: 60 * 60 * 1000,
    d: 24 * 60 * 60 * 1000,
    w: 7 * 24 * 60 * 60 * 1000,
    M: 4 * 7 * 24 * 60 * 60 * 1000,
    y: 52 * 7 * 24 * 60 * 60 * 1000
  } 
});