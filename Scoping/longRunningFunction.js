var nested = nested || {};

(function() {
	
	function longRunningFunction(divId, numberOfTicks, callback)
	{
		var tickCtr = 0;
		
		function tick()
		{
			tickCtr++;
			$('#'+divId).append("<div>Tick "+tickCtr+"</div>");
			
			if (tickCtr == numberOfTicks)
			{
				callback();
			}
			else
			{
				setTimeout(tick, 500);
			}
		}
		
		tick();
	}	
	
		
	nested.longRunningFunction = longRunningFunction;
})();


$(document).ready(function() {
	var callCtr = 0;
	
	function kickOffLongFunction()
	{
		callCtr++;
		var resultsId = "resultsFor"+callCtr;
		$('#results').append('<div class="results" id='+resultsId+'></div>');
		nested.longRunningFunction(resultsId, 5+callCtr, function() { $('#'+resultsId).append('<div>Done '+resultsId+'</div>');});
	}
	
	$('button').each(function(index, element) {
		$(element).click(kickOffLongFunction);
	});
	
	
});