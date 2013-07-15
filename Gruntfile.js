var path = require('path');

module.exports = function(grunt) {
  var cHelpers = 'src/helpers.compiled.js';

  var files = {
    //All helpers
    full: [
      'src/pre.js',
      'src/static.js',
      'src/random.js',
      cHelpers,
      'src/core.js',
      'src/post.js'
    ],

    //Only the core random generators
    core: [
      'src/pre.js',
      'src/random.js',
      'src/helpers.js',
      'src/core.js',
      'src/post.js'
    ]
  };

  // Project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    helpers: {
      all: {
        base: 'src/helpers.js',
        files: ['src/helpers/*.js'],
        dest: cHelpers
      }
    },
    concat: {
      clientFull: {
        src: files.full,
        dest: 'build/client/<%= pkg.name.toLowerCase() %>.<%= pkg.version %>.js',
      },
      clientCore: {
        src: files.core,
        dest: 'build/client/<%= pkg.name.toLowerCase() %>.<%= pkg.version %>.core.js',
      },
      node: {
        src: files.full.concat(['src/node/node.post.js']),
        dest: 'build/node/<%= pkg.name.toLowerCase() %>.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      client: {
        files: {
          'build/client/<%= pkg.name.toLowerCase() %>.<%= pkg.version %>.min.js':
            'build/client/<%= pkg.name.toLowerCase() %>.<%= pkg.version %>.js',
          'build/client/<%= pkg.name.toLowerCase() %>.<%= pkg.version %>.core.min.js':
            'build/client/<%= pkg.name.toLowerCase() %>.<%= pkg.version %>.core.js',
          'build/node/client.js':
            'build/client/<%= pkg.name.toLowerCase() %>.<%= pkg.version %>.js'
        }
      }
    },
    copy: {
      node: {
        files: [{
          expand: true,
          flatten: true,
          src: ['src/node/*','!src/node/node.post.js'], 
          dest: 'build/node/'
        }]
      }
    }
  });

  grunt.registerTask('default', ['helpers:all','concat','uglify','copy']);

  //Grunt base tasks
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerMultiTask('helpers', 'Compile all the helpers into one file', function() {
    var files = grunt.file.expand(this.data.files);

    var name, current, helpers = '';
    for(var f = 0; f < files.length; f++) {
      name = path.basename(files[f]).replace(/\..*?$/, '');
      current = grunt.file.read(files[f], {encoding:'utf8'})
        .replace(/\n/g, '\n    '); //Pretty spacing

      helpers += '\n    ' + name + ': ' + current;

      //Comma every element but the last one
      if(f < files.length - 1) {
        helpers += ',';
      }
    }

    var base = grunt.file.read(this.data.base, {encoding:'utf8'})
      .replace(
        /\n*\s*\};\s*\n*\s*/g, //Aggressive spacing and closing bracket removal 
        ','
      );
  
    //Write the compiled file
    grunt.file.write(this.data.dest, base + helpers + '\n  };'); 
  });
};