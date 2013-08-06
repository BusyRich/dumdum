  //-----------------------------
  //Base random number generation
  //-----------------------------

  var vowels = ['a','e','i','o','u','y'];
  var consonants = ['b','c','d','f','g','h','j','k','l','m','n','p','q','r','s','t','v','w','x','y','z'];
  
  //Returns a float between 0/1, 0/max, or min/max
  var between = function(min, max) {
    //Between 0 and 1
    if(typeof min !== 'number') {
      return core.random();
    }
    
    //Between 0 and max
    if(typeof max !== 'number') {
      return core.random() * (min);
    }
    
    //Between min and max
    return (core.random() * (max - min)) + min;
  };

  var random = {
    float: between,
    
    int: function(min, max) {
      //0 or 1
      if(typeof min !== 'number') {
        return Math.round(between());
      }
      
      //Little bit of tweaking for ranges
      if(typeof max !== 'number') {
        min += 1;
      } else {
        max += 1;
      }
      
      return Math.floor(between(min, max));
    },

    //Returns a string of a single hex pair
    hex: function(length) {
      if(typeof length !== 'number') {
        return '';
      }

      var str = '', octet;
      for(var h = 0; h < length; h++) {
        octet = random.int(255).toString(16).toUpperCase();

        //Leading zero, hex octet is "00" to "FF"
        if(octet.length === 1) {
          octet = '0' + octet;
        }

        str += octet;
      }

      return str;
    },

    //Returns a binary string
    binary: function(bits) {
      if(typeof bits !== 'number') {
        return '';
      }

      var str = '';
      for(var b = 0; b < bits; b++) {
        str += random.int();
      }

      return str;
    },

    //Random true/false
    boolean: function() {
      if(random.int() === 1) {
        return true;
      } else {
        return false;
      }
    },

    //String generator with simple format support
    string: function(format) {
      if(typeof format === 'number') {
        format = (new Array(format + 1)).join('a');
      }

      if(typeof format !== 'string') {
        return '';
      }

      format = format.toLowerCase().split('');

      var str = '';
      for(var ch = 0; ch < format.length; ch++) {
        if(format[ch] === 'v') {
          str += vowels[random.int(vowels.length - 1)];
        } else if(format[ch] === 'c') {
          str += consonants[random.int(consonants.length - 1)];
        } else if(format[ch] === 'a') {
          str += String.fromCharCode(random.int(97, 122));
        } else if(format[ch] === '#') {
          str += random.int(9);
        } else {
          str += format[ch];
        }
      }

      return str;
    }
  };
  