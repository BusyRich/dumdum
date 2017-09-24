/*
 * Generates a date with a random amount of time added, based
 * on a provided maximum offset.
 * @param {string} maxOffset - The maximum offset to add to
 * the date. Uses a special format: #[smhdwMy]. A number followed
 * by character representing the time interval. Seconds s,
 * minutes m, hours h, days d, weeks w, months M, or years y.
 * Ex: 6d will add anything from 0 to 6 days worth of time to
 * the date.
 * @param {Date} start - A date object representing where the
 * range should start. Defaults to "now".
 * @returns {Date} A date oject that either has a random 
 * amount of time added or "now" when the format string
 * cannot be parsed.
 */
dumdum.addHelper('datetime', function(maxOffset, start) {
  if(!utility.type(start, 'date')) {
    start = new Date();
  }

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