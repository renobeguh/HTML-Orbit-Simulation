module.exports = function(grunt) {
  grunt.initConfig({
      pkg: grunt.file.readJSON('package.json')
      ,concat: {
        options: {
          // define a string to put between each file in the concatenated output
          separator: ' '
        }
        ,dist: {
          // the files to concatenate
          src: [
                'js/src/intro.js'
                ,'js/src/core.js'
                ,'js/src/renderer.js'
                ,'js/src/physics.js'
                ,'js/src/ui.js'
                ,'js/src/sat.js'
                ,'js/src/main.js'
                ,'js/src/outro.js'
              ]
          // the location of the resulting JS file
          ,dest: 'js/dist/<%= pkg.name %>.js'
        }
      }
      ,watch: {
        files: ['js/src/core.js'
                ,'js/src/renderer.js'
                ,'js/src/physics.js'
                ,'js/src/ui.js'
                ,'js/src/sat.js'
                ,'js/src/main.js']
        ,tasks: ['concat']
      }

    });
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.registerTask('default', ['concat']);
}