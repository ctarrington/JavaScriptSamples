$(document).ready(function() {

	function handler()
	{
		$('#results').html("handlerId = " +this.id+ ", value = "+this.ctr);
		this.ctr++;
	}

	for (var index=1; index<=2;index++)
	{
		var scope = {id: 'fred'+index, ctr:0 };
		$('#button'+index).click( handler.bind(scope) );
	}


});
