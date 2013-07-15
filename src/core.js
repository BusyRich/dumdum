  //----------------------------
  //Core functionality of DumDum
  //----------------------------

  var core = function(its, fn) {
    //Self-executing function keeps scope clean
    //and allows binding of a very specific context
    //to the provided data generator
    return (function(helps, its, fn) { 
      this.helpers = helps;
      
      //convenient access to base helpers
      this.float = this.helpers.float;
      this.int = this.helpers.int;
      this.hex = this.helpers.hex;
      this.binary = this.helpers.binary;
      this.bool = this.helpers.boolean;
      this.str = this.helpers.string;
      
      var bound = fn.bind(this);
      
      var data = [];
      for(var i = 0; i < its; i++) {
        data.push(bound(i + 1));
      }
      
      return data;
    })(helpers, its, fn);
  };

  //Base generator, should always returns between 0 and 1
  core.random = function() {
    return Math.random();
  };

  //Adds a helper to the helpers collection
  core.helper = function(name, fn) {
    if(helpers.hasOwnProperty(name)) {
      throw 'DumDum Helper "' + name + '" is already defined';
    }
    
    //Bind a context that exposes the random generator
    helpers[name] = (function(random, fn) {
      this.random = random;
      return fn.bind(this);
    })(random, fn);
  };
