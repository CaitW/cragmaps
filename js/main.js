var map, basemaps, overlays;

$(document).ready(function() {

	map = L.map('map').setView([31.922, -106.044], 16);

	basemaps = 
	{
		"imagery": L.tileLayer("http://otile1.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.jpg").addTo(map)		
	};

	overlays = {
		regions: {},
		areas: {},
		trails: {},
		boulders: {},
		routes: {}
	}

	$.getJSON("./php/getFiles.php", function (data) {

		$.each(data.regions, function (index, value) { 
			overlays.regions[index] = omnivore.kml("./data/Hueco/kml/regions/" + value).addTo(map);
		});

		$.each(data.areas, function (index, value) { 

			overlays.areas[index] = omnivore.kml("./data/Hueco/kml/areas/" + value).addTo(map);

		});

		$.each(data.trails, function (index, value) { 

				overlays.trails[index] = omnivore.kml("./data/Hueco/kml/trails/" + value).addTo(map);
			
		});

		$.each(data.boulders, function (index, value) { 

				overlays.boulders[index] = omnivore.kml("./data/Hueco/kml/boulders/" + value).addTo(map);
			
		});

		$.each(data.routes, function (index, value) { 

				overlays.routes[index] = omnivore.kml("./data/Hueco/kml/routes/" + value).addTo(map);
			
		});

		
 

	});

	
});