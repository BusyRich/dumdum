var path = require('path');

module.exports = function(grunt) {
  var helpersFull = 'src/helpers.full.js';
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  var files = {
    //All helpers
    full: [
      'src/core.js',
      'src/helpers.full.js'
    ],

    //Only the core random generators
    core: [
      'src/core.js'
    ]
  };

  // Project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        process: true
      },
      helpers: {
        src: ['src/helpers/unordered/*.js',
          'src/helpers/uuid.js',
          'src/helpers/web.js',
          'src/helpers/personal.js'],
        dest: helpersFull
      },
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
      client: {
        options: {
          output: {
            comments: /^\*{2}/
          }
        },
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
    },
    watch: {
      scripts: {
        files: ['./src/**', 'Gruntfile.js'],
        tasks: ['default']
      },
    }
  });

  grunt.registerTask('default', ['concat','uglify','copy']);
  grunt.registerTask('dev', 'watch');

  //Grunt base tasks
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
};