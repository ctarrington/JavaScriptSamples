var nested = nested || {};

(function() {
	
	function kickOffLongFunction(divId, callback)
	{
		function done()
		{
			$('#'+divId).append("<div>Done "+divId+"</div>");
			callback();
		}
		
		$('#'+divId).append("<div>Starting "+divId+"</div>");
		setTimeout(done, 10000*Math.random());
	}
	
	function kickOffLongFunctions(callback)
	{
		var COUNT = 5;
		var ctr = 0;
		function aggregate()
		{
			ctr++;
			if (ctr === COUNT)
			{
				callback();
			}
		}
		
		for (var functionCtr = 0; functionCtr < COUNT; functionCtr++)
		{
			var resultsId = "resultsFor"+functionCtr;
			$('#results').append('<div class="results" id='+resultsId+'></div>');
			kickOffLongFunction(resultsId, aggregate);
		}
	}
		
	nested.kickOffLongFunctions = kickOffLongFunctions;
})();


$(document).ready(function() {
	nested.kickOffLongFunctions(function() { $('#results').append('<div>ALL DONE</div>');});
});