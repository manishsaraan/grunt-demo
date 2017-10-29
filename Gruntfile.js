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
        },
        typescript : {
            options : {
                module : 'commonjs'
            },
            all : {
                src : ['typescript/*.ts'],
                dest : 'js/output.js'
            }
        },
        xo: {
            options: {
            quiet: true
            },
            target: ['js/*.js ']
        },
        htmlmin: {
            dev : {
                options : {
                     removeEmptyAttributes : true,
                     removeEmptyElements : true,
                     removeComments : true,
                     removeOptionalTags : true,
                     collapseWhitespace : true
                },
                files : [{
                     expand : true,
                     cwd : 'html',
                     dest : 'html',
                     src : ['*.html'],
                     ext : '.min.html',
                     extDot : 'last'
                }]
            }
        },
        less : {
            development : {
                options : {
                      cleancss : false,
                      compress : false
                },
                files : [{
                     expand : true,
                     cwd : 'less',
                     dest : 'css',
                     src : ['*.less'],
                     ext : '.css',
                     extDot : 'last'
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');    
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');  
    grunt.loadNpmTasks('grunt-typescript');  	
    grunt.loadNpmTasks('grunt-xo');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-less');   

};
  grunt.registerTask('default', ['clean', 'uglify','cssmin','typescript','xo']);