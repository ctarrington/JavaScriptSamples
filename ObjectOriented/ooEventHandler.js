/*
 * The goals are:
 * - encapsulate the name property (private through closure)
 * - work well if the client code forgets to use "new"
 * - not lose scope when a method is called as an event handler
 * 
 * Tradeoffs:
 * - not able to add the mehtods to the prototype as they depend on the closure. 
 */

$(document).ready(function() {
	
	var Watcher = (function() {

	  // contruct an object such that each instance has its own name in a closure
	  function constructor(n) {
	  	var name = n;
	  	
	    var theNew = {};
	    
	    theNew.sayHi = function(toName) {
	      $('#results').append(name + " says hello to "+toName+"</br>");
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