  //----------------------------
  //Core functionality of DumDum
  //----------------------------

  var core = function(its, fn) {
    //Self-executing function keeps scope clean
    //and allows binding of a very specific context
    //to the provided data generator
    return (function(packs, its, fn) {
      //Packages are contained inside there own property
      for(var p in packs) {
        if(h !== 'helpers') {
          this[p] = packs[p];
        }
      }

      //Helpers are exposed directly on the context
      for(var h in packs.helpers) {
        this[h] = packs.helpers[h];
      }
      
      var bound = fn.bind(this);
      
      var data = [];
      for(var i = 0; i < its; i++) {
        data.push(bound(i + 1));
      }
      
      return data;
    })(packages, its, fn);
  };

  //Base generator, should always returns between 0 and 1
  core.random = function() {
    return Math.random();
  };

  //Adds a helper that will be directly exposed to the generator
  core.helper = function(name, fn) {
    if(packages.helpers.hasOwnProperty(name)) {
      throw 'DumDum Helper "' + name + '" is already defined.';
    }
    
    //Bind a context that exposes the random generator
    packages.helpers[name] = (function(random, fn) {
      this.random = random;
      return fn.bind(this);
    })(random, fn);
  };

  //Adds a package that will be exposed to the generator
  core.package = function(name, package) {
    if(packages.hasOwnProperty(name)) {
      throw 'DumDum Package "' + name + '" is already defined.';
    }

    if(typeof package !== 'object') {
      throw 'DumDum Package "' + name + '" must be an object.';
    }

    for(var g in package) {
      //Bind the context of any functions with the random generators
      if(typeof package[g] === 'function') {
        package[g] = (function(random, fn, vars) {
          this.random = random;
          return fn.bind(this);
        })(random, package[g], static);
      }      
    }

    

    packages[name] = package;
  };
