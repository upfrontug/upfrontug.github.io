/*global module:false*/
module.exports = function(grunt) {

  grunt.initConfig({
    sass: {
            dist: {
                files: {
                    'stylesheets/custom.css': 'stylesheets/custom.scss'
                }
            }
    }
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.registerTask('default', []);

  grunt.registerTask('default', []);

};

