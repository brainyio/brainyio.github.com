module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-livereload');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-regarde');

  grunt.renameTask('regarde', 'watch');

  grunt.initConfig({

    watch: {
      livereload: {
        files: [
          '*.html',
          'css/*.css'
        ],
        tasks: ['livereload']
      }
    },

    express: {
      options: {
        port: 8000,
        root: '.'
      }
    },

    open: {
      server: {
        url: 'http://localhost:<%= express.options.port %>'
      }
    }

  });

  grunt.registerTask('express', 'Make a server', function() {
    var fs = require('fs'),
      express = require('express'),
      app = express(),
      root = grunt.config.get('express.options.root') || '.',
      directories = ['img', 'js', 'css'];

    for (var i = 0; i < directories.length; i++) {
      (function(key) {
        app.get('/' + [key, '*?'].join('/'), function(req, res, next) {
          var path = req.url.split('?')[0];
          res.sendfile(root + path, {}, function(err) {
            if (err) {
              res.send(404);
            }
          });
        });
      })(directories[i]);
    }

    app.get(/(.+)?/, function(req, res) {
      var index = fs.readFileSync([root, 'index.html'].join('/'), 'utf8');
      res.send(index);
    });

    var port = grunt.config.get('express.options.port') || 8000;
    grunt.log.writeln('... Starting Express server on ' + port + ' ...');
    app.listen(port);
  });
  
  grunt.registerTask('default', function (target) {
    grunt.task.run([
      'express',
      'livereload-start',
      'open',
      'watch'
    ]);
  });

};