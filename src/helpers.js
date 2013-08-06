  //--------------------------------------------------
  //Generators exposed to the data generating function
  //--------------------------------------------------

  //Base helpers that are always exposed
  packages.helpers = {
    //Basic random functions
    float: random.float,
    int: random.int,
    hex: random.hex,
    binary: random.binary,
    bool: random.boolean,
    str: random.string,
    choose: function(arr) {
      if(arr instanceof Array === false) {
        return '';
      }

      var i = random.int(arr.length - 1);
      return arr[i];
    }
  };
