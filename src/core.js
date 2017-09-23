/***
 * DumDumJS - A Simple Dummy Data Generator
 * Version: <%= pkg.version %>
 */
var dumdum = (function() {
  //The context that generator functions are bound to.
  var coreContext = {};

  /*
   * Core generator. Takes a number of iterations and
   * and a function, then binds that function to a special
   * context with various data generators.
   * @param {number} its - The number of times to run the
   * provided function.
   * @param {function} fn - The function to run that
   * utilizes the provided generators to create data.
   * @returns {Array} An array of the generated values.
   */
  var core = function(its, fn) {
    //Creates a Self-executing function thats 
    //keeps scope clean and allows binding of 
    //a very specific context to the provided
    //data generator
    return (function(fn) {
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

  /*
   * The core random number generator. Provided
   * as a public, overridable function so it can
   * replaced if desired. Should always return a
   * value between 0 and 1.
   * @returns {number}
   */
  core.random = coreContext.random = function() {
    return Math.random();
  };

  /*
   * Float number generator. Generates numbers between
   * 0 an 1, 0 and max, or min and max.
   * @param {number} minMax - Either the max value if it is 
   * the only argument provided, or the min if both min and 
   * max are provided.
   * @param {number} max - The max value.
   * @returns {number}
   */
  core.float = coreContext.float = function(minMax, max) {
    //Between 0 and 1
    if(typeof minMax !== 'number') {
      return core.random();
    }
    
    //Between 0 and max
    if(typeof max !== 'number') {
      return core.random() * (minMax);
    }
    
    //Between min and max
    return (core.random() * (max - minMax)) + minMax;
  };
  
  /*
   * Integer number generator. Generates numbers between
   * 0 an 1, 0 and max, or min and max.
   * @param {number} minMax - Either the max value if it is 
   * the only argument provided, or the min if both min and 
   * max are provided.
   * @param {number} max - The max value.
   * @returns {number}
   */
  core.integer = coreContext.integer = function(minMax, max) {
    //0 or 1
    if(typeof minMax !== 'number') {
      return Math.round(core.random());
    }
    
    //Little bit of tweaking for ranges
    if(typeof max !== 'number') {
      minMax += 1;
    } else {
      max += 1;
    }
    
    return Math.floor(core.float(minMax, max));
  };

  /*
   * Generates a random boolean.
   * @returns {boolean}
   */
  core.boolean = coreContext.boolean = function() {
    return !core.integer();
  };

  /*
   * Chooses a random element in an array.
   * @param {Array} array - The array to choose from.
   * @returns {*} The array element chosen.
   */
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

  /*
   * Generates a random string based on special formatting with
   * the string.
   * @param {string} input - The format string.
   * @returns {string}
   */
  core.string = coreContext.string = function(input) {
    if(typeof input !== 'string') {
      return '';
    }

    return input.replace(mainRegex, 
      function(match, inFront, type, its, offset) {
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

              //This fixes matching $$. Without this logic the 
              //preceding $ would be preserved and not used to
              //generate a character
              if(inFront === '$' && 
                (offset === 0 || input[offset - 1] !== '\\')) {
                  value = core.choose(alphabet) + value[1];
              }
            }
            break;
        }
        
        return value;
      }.bind(this)).replace(numberRegx, 
        function(match, inFront, hashes, offset) {
          if(inFront === '\\') {
            return match.substring(1);
          }

          //This allows the preceding character to be a # and adds it to
          //the #s to use, but only if not preceded itself by a \.
          if(inFront === '#' && 
            (offset === 0 || input[offset - 1] !== '\\')) {
              hashes = match;
              inFront = '';
          }
          
          //Turns the hashes string into a max value passed to the generator
          //Ex: #### becomes 9999 instead of four seperate 0-9 values
          var value = core.integer(parseInt(hashes.replace(hashRegex,'9')))
            .toString();

          //The number will be 0 padded based on the hashes length and 
          //the character length of the value generated. The array join
          //method is used for conciseness.
          return inFront + 
            Array((hashes.length - value.length) + 1).join('0') +
            value;
      }.bind(this));
  };

  core.helpers = {};
  /*
   * Adds a helper, which is made available to the user generator
   * functions. Allows you to add just a single helper or a list
   * or helpers, or a helper "library".
   * @param {string} name - The helper or library name.
   * @param {(function|Array|Object)} - The helper or library to add.
   * @param {Object} additionalContext - Anything you want to add to the
   * context of the helper functions. Useful to encapsulating data or
   * additional, needed, functionality you want to use but don't want to
   * expose via extra variables.
   * @param {string} rootName - The name of the helper library to add to.
   * Mostly used interally, but there is nothing stopping anyone from
   * using it to extend existing libraries.
   */
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
