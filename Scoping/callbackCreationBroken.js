$(document).ready(function() {

	var ctrs = [];

	for (var index=1; index<=2;index++)
	{
		var handler = function() {
			if (!ctrs[index]) { ctrs[index] = 0; }

			$('#results').html("handlerId = " +index+ ", value = "+ctrs[index]);

			ctrs[index]++;
		};

		$('#button'+index).click(handler);
		
	}
	
	
});
