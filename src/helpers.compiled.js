  //--------------------------------------------------
  //Generators exposed to the data generating function
  //--------------------------------------------------

  var helpers = {
    //Basic random functions
    float: random.float,
    int: random.int,
    hex: random.hex,
    binary: random.binary,
    boolean: random.boolean,
    string: random.string,
    choose: function(arr) {
      if(arr instanceof Array === false) {
        return '';
      }
    
      var i = random.int(arr.length - 1);
      return arr[i];
    },
    colors: {
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
    },
    creditcard: function(separator) {
      return [
        random.string('####'),
        random.string('####'),
        random.string('####'),
        random.string('####')
      ].join(separator);
    },
    datetime: function(offset) {
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
    },
    email: function() {
      return colors[random.int(colors.length - 1)] +
        streets[random.int(streets.length - 1)] +
        random.int(100,999) +
        '@' + random.string('cvccvcvccv') + '.' +
        tlds[random.int(tlds.length - 1)];
    },
    ipsum: function(pars, length) {
      if(typeof pars !== 'number') {
        pars = 1;
      }
    
      if(typeof length !== 'number') {
        length = 6;
      }
    
      var sents, ipsum = '';
      for(var p = 0; p < pars; p++) {
    
        sents = random.int(length, length + 2);
        for(var s = 0; s < sents; s++) {
          ipsum += quotes[random.int(quotes.length - 1)];
    
          if(s < sents - 1) {
            ipsum += ' ';
          }
        }
    
        if(p < pars - 1) {
          ipsum += '\n\n';
        }
      }
    
      return ipsum;
    },
    state: function() {
      return states[random.int(states.length - 1)];
    },
    street: function() {
      return random.string('#### cvc') + ' ' + streets[random.int(streets.length - 1)];
    },
    website: function() {
      return 'http://www.' + random.string('CVCVCCVCV.') + tlds[random.int(tlds.length - 1)];
    }
  };