

$(document).ready(function() {

	function handler() 
	{
			$('#results').html("handlerId = " +this.handlerId+ ", ctr = "+this.ctr);
			this.ctr++;
	}
	
	$('button').each(function(index, element) {

		var scope = {handlerId: index, ctr:0};
		$(element).click(handler.bind(scope));
	});
	
	
});

