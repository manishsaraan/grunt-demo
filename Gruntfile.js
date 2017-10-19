var grunt = require('grunt');
grunt.registerTask('hello','default task',function(){
	 console.log('hello world!!!');
});

grunt.registerTask('name','console name',function(name){
   if(!name || !name.length){
   	  grunt.warn("you need to provide a name");   	 
   }
    console.log('hello : ',name);
});

grunt.registerTask("default",["hello","name:manish"]);