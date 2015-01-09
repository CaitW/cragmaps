var map, basemaps, overlays;

$(document).ready(function() {

	map = L.map('map').setView([31.922, -106.044], 16);

	basemaps = 
	{
		"imagery": L.tileLayer("http://otile1.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.jpg").addTo(map)		
	};

	//set each to a layer group
	overlays = {
		regions: L.layerGroup(),
		areas: L.layerGroup(),
		trails: L.layerGroup(),
		boulders: L.layerGroup(),
		routes: L.layerGroup()
	}

	$.getJSON("./php/getFiles.php", function (data) {

		$.each(data.regions, function (index, value) { 
			var customLayer = L.geoJson(null, {
			    style: { 
			    	color: '#fff',
			    	fillOpacity: 0,
			    	weight: 3
			    }
			});
			var runLayer = omnivore.kml("./data/Hueco/kml/regions/" + value, null, customLayer)
			overlays.regions.addLayer(runLayer);
		});

		$.each(data.areas, function (index, value) { 
			var customLayer = L.geoJson(null, {
			    style: { color: '#000' }
			});
			var runLayer = omnivore.kml("./data/Hueco/kml/areas/" + value, null, customLayer)
			overlays.areas.addLayer(runLayer);
		});

		$.each(data.trails, function (index, value) { 
			var customLayer = L.geoJson(null, {
			    style: { color: '#000' }
			});
			var runLayer = omnivore.kml("./data/Hueco/kml/trails/" + value, null, customLayer)
			overlays.trails.addLayer(runLayer);
		});

		$.each(data.boulders, function (index, value) { 
			var customLayer = L.geoJson(null, {
			    style: { color: '#000' }
			});
			var runLayer = omnivore.kml("./data/Hueco/kml/boulders/" + value, null, customLayer)
			overlays.boulders.addLayer(runLayer);
		});

		$.each(data.routes, function (index, value) { 
			var customLayer = L.geoJson(null, {
			    style: { color: '#000' }
			});
			var runLayer = omnivore.kml("./data/Hueco/kml/routes/" + value, null, customLayer)
			overlays.routes.addLayer(runLayer);
		});

	}).done(function() {

		$.each(overlays, function (index, overlay){
			overlay.addTo(map);
		})

	});



	
});