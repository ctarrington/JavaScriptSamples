$(document).ready(function() {

	var ctrs = [];

	function createHandler(id)
	{
		var handler = function() {
			if (!ctrs[id]) { ctrs[id] = 0; }

			$('#results').html("handlerId = " +id+ ", value = "+ctrs[id]);

			ctrs[id]++;
		};

		return handler;
	}

	for (var index=1; index<=2;index++)
	{
		var handler = createHandler(index);
		$('#button'+index).click(handler);
	}


});
