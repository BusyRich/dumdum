var dumdum = (function() {
  //----------------------------
  //Core functionality of DumDum
  //----------------------------

  //The context that generator functions are bound to.
  var coreContext = {};

  var core = function(its, fn) {
    //Self-executing function keeps scope clean
    //and allows binding of a very specific context
    //to the provided data generator
    return (function(fn) {
      //Loop through the context object to bind functions to "this"
      for(var f in coreContext) {
        if(coreContext.hasOwnProperty(f)) {
          this[f] = coreContext[f];
        }
      }

      this.helpers = core.helpers;
      
      var data = [];
      for(var i = 0; i < its; i++) {
        data.push(fn.call(this, i + 1));
      }
      
      return data;
    })(fn);
  };

  //Base generator, should always returns between 0 and 1
  core.random = coreContext.random = function() {
    return Math.random();
  };

  core.float = coreContext.float = function(min, max) {
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
    
  core.integer = coreContext.integer = function(min, max) {
    //0 or 1
    if(typeof min !== 'number') {
      return Math.round(core.float());
    }
    
    //Little bit of tweaking for ranges
    if(typeof max !== 'number') {
      min += 1;
    } else {
      max += 1;
    }
    
    return Math.floor(core.float(min, max));
  };

  //Random true/false
  core.boolean = coreContext.boolean = function() {
    if(core.integer() === 1) {
      return true;
    } else {
      return false;
    }
  };

  core.choose = coreContext.choose = function(array) {
    if(array instanceof Array === false) {
      return '';
    }

    return array[core.integer(array.length - 1)];
  };

  var vowels = ['y','a','e','i','o','u'];
      consonants = ['b','c','d','f','g','h','j','k','l',
        'm','n','p','q','r','s','t','v','w','x','y','z'],
      alphabet = consonants.concat(vowels.slice(1)),
      precedeRegex = '(.?|^)',
      insideBrackets = '\\[[^\\]]+\\](\\d+|\\\\\\d+)?'
      insideBracketsRegex = new RegExp(insideBrackets),
      mainRegex = new  RegExp(precedeRegex +
        '\\$([CcVv]|' + insideBrackets + ')?', 'g'),
      numberRegx = new RegExp(precedeRegex + '(#+)', 'g'),
      hashRegex = /#/g;

  core.string = coreContext.string = function(input) {
    if(typeof input !== 'string') {
      return '';
    }

    return input.replace(mainRegex, function(match, inFront, type, its) {
      if(inFront === '\\') {
        return match.substring(1); 
      }
      
      var value = inFront;
      
      switch(type) {
        case 'C':
          value += core.choose(consonants).toUpperCase();
          break;
        case 'c':
          value += core.choose(consonants); 
          break;
        case 'V':
          value += core.choose(vowels).toUpperCase();
          break;
        case 'v':
          value += core.choose(vowels);
          break;
        default:
          if(insideBracketsRegex.test(type)) {
            its = its || '1';

            var choices = type
              .substring(1, type.length - 1 - its.toString().length)
              .split('');

            if(its.indexOf('\\') === 0) {
              value += core.choose(choices) + its.substring(1);
            } else {
              for(var c = 0; c < parseInt(its); c++) {
                value += core.choose(choices);
              }
            }        
          } else {
            value += core.choose(alphabet);
          }
          break;
      }
      
      return value;
    }.bind(this)).replace(numberRegx, function(match, inFront, hashes) {
      if(inFront === '\\') {
        return match.substring(1);
      }
      
      //turns the hashes string into a max value passed to the generator
      var value = core.integer(parseInt(hashes.replace(hashRegex,'9')))
        .toString();

      //the number will be 0 padded based on the hashes length and 
      //the character length of the value generated. The array join
      //method is used for conciseness.
      return inFront + 
        Array((hashes.length - value.length) + 1).join('0')
        + value;
    }.bind(this));
  };

  core.helpers = {};
  core.addHelper = function(name, fn, additionalContext, rootName) {
    if(typeof fn !== 'function') {
      if(Array.isArray(fn)) {
        for(var f = 0; f < fn.length; f++) {
          if(fn[f].name && typeof fn[f].fn === 'function') {
            core.addHelper(fn[f].name, fn[f].fn, additionalContext, name);
          }
        }
      } else {
        for(var f in fn) {
          if(fn.hasOwnProperty(f) && typeof fn[f] === 'function') {
            core.addHelper(f, fn[f], additionalContext, name);
          }
        }
      }

      return;
    }

    var addTo = core.helpers;
    if(rootName) {
      if(!core.helpers[rootName]) {
        core.helpers[rootName] = {};
      }
      
      addTo = core.helpers[rootName];
    }

    addTo[name] = (function() {
      for(var f in additionalContext) {
        if(additionalContext.hasOwnProperty(f)) {
          this[f] = additionalContext[f];
        }
      }

      this.core = coreContext;
      this.helpers = core.helpers;

      return fn.bind(this);
    })();
  };

  return core;
})();
