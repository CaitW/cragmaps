var map;

$(document).ready(function() {

	map = L.map('map').setView([31.922, -106.044], 16);

	var basemaps = 
	{
		"imagery": L.tileLayer("http://otile1.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.jpg").addTo(map)		
	};

	

	
});