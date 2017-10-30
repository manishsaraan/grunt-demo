var grunt = require('grunt');
var fs = require('fs');
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
        },
        csslint:{
            strict : {
                options:{

                },
                src : ['css/*.css']
            },
            laxed : {
                options : {
                   'zero-units' : false
                },
                src  : ['css/*.css']
            }
        },
        checkFileSize : {
            options:{
                folderToScan : './css'
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
    grunt.loadNpmTasks('grunt-contrib-csslint');
};
  grunt.registerTask('default', ['clean', 'uglify','cssmin','typescript','xo']);
  grunt.registerTask('checkFileSize','Get size of file',function(debug){

    //get options from grunt task
    var options = this.options({
        folderToScan : ''
    });
    
    if(this.args.length !== 0 && debug !== undefined){
        grunt.log.writeflags(options,'options');
    }
     grunt.file.recurse(options.folderToScan, function(abspath, rootdir, subdir, filename){
         if(grunt.file.isFile(abspath)){
            var stats = fs.statSync(abspath);
            var asBytes  = stats.size / 1024;
            grunt.log.writeln("Found %s file with %s kb",filename, asBytes);
         }
     });
  });