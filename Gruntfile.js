var grunt = require('grunt');
module.exports = function(grunt){
    grunt.initConfig({
    	pkg: grunt.file.readJSON('package.json'),
        clean : {
             output : ['demo/*']
        },
    	uglify:{
    		my_target : {
    			 files:{'js/main.min.js'  : 'js/*.js'} 
    			}           
    	},
        cssmin:{
            my_target:{
                files: [{
                    expand: true,
                    cwd: 'css/',
                    src : ['*.css','!*.min.css'],
                    dest: 'css/',
                    ext : '.min.css'
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');    
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');    	
   

};
  grunt.registerTask('default', ['clean', 'uglify','cssmin']);