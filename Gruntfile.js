/*global module:false*/
module.exports = function(grunt) {

  grunt.initConfig({
    csslint: {
      css: {
        src: ['stylesheets/!(ie).css']
      },
      
    },
    jekyll: {
      server: {
        server : true,
        server_port : 3000,
        auto : true
      },
      build: {
        server: false
      }
    },
    //System Configuartion. You sdhouldn't need to touch anything beyond this point
    watch: {
      css: {
        files: 'stylesheets/!(ie).css',
        tasks: ['csslint:css'],
      },
      jekyll: {
        options: {
          livereload: true,
        },
        files: ['_site/*'],
      },
    },
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-jekyll');
  grunt.loadNpmTasks('grunt-contrib-csslint');

  // Default task.
  grunt.registerTask('default', ['csslint:css', 'jekyll:build', 'watch']);

};
