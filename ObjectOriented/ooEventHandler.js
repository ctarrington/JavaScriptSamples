$(document).ready(function() {
	
	var Watcher = (function() {

	  // contruct an object such that each instance has its own name in a closure
	  function constructor(n) {
	  	var name = n;
	  	
	    var theNew = {};
	    theNew.sayHi = function(toName) {
	      console.log(name + " says hello to "+toName);
	    };
	    theNew.watch = function(buttonId) {
	   	  $('#'+buttonId).click(function() { 
			var toname = $('#name').val();
			theNew.sayHi(toname); 
		  });
	    };
	    
	    return theNew;
	  }
		  	  
	  return constructor;  
	})();
	
	var bill = new Watcher("Bill");
	bill.watch('button1');
	bill.name = 'William';
	bill.watch('button2');
	
	var bob = Watcher("Bob");
	bob.watch('button1');
	
});