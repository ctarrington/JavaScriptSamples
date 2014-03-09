

$(document).ready(function() {

	function accumulate(value) 
	{
		this.value += value;
		$('#results').html(this.name+': '+this.value);
	}
	
	var scope1 = {name: 'Bin 1', value: 0};
	[1,2,3,4,5,6,7,8,9,10].forEach(accumulate.bind(scope1));


	var scope2 = {name: 'Bin 2', value: 0};
	[2,4,6,8,10].forEach(accumulate.bind(scope2));
	
});

