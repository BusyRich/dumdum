function(offset) {
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
}