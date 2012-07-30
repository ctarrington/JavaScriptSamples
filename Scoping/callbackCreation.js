

var nested = nested || {};

(function() {

	var handlerCtr = 0;
	
	function createHandler()
	{
		handlerCtr++;
		
		var	ctr = 0;
		var handlerId = handlerCtr;
				
		var handler = function() {
			$('#results').html("handlerId = " +handlerId+ ", ctr = "+ctr);
			ctr++;
		};
		
		return handler;
	}	
	
		
	nested.createHandler = createHandler;
})();


$(document).ready(function() {
	
	$('button').each(function(index, element) {
		$(element).click(nested.createHandler());
	});
	
	
});

