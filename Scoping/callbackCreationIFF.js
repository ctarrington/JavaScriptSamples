$(document).ready(function() {

	var ctrs = [];

	for (var index=1; index<=2;index++)
	{
		(function() {

			var id = index;
			var handler = function () {
				if (!ctrs[id]) {
					ctrs[id] = 0;
				}

				$('#results').html("handlerId = " + id + ", value = " + ctrs[id]);

				ctrs[id]++;
			};

			$('#button' + id).click(handler);
		})();
		
	}
	
	
});
