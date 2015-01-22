var map, basemaps, overlays;

$(document).ready(function() {

	map = L.map('map').setView([31.922, -106.044], 16);

	basemaps = 
	{
		"lowResImagery": L.tileLayer("http://otile1.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.jpg", {
			minZoom: 16,
			maxZoom: 18
		}).addTo(map),
		"NorthMountain": L.tileLayer("./data/Hueco/tiles/north_mountain/{z}/{x}/{y}.png", {
			minZoom: 16,
			maxZoom: 18
		}).addTo(map).setOpacity(0.7),
		"areas": L.tileLayer("./data/Hueco/tiles/areas/{z}/{x}/{y}.png", {
			minZoom: 16,
			maxZoom: 18
		}).addTo(map)
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

		$.each(data.areas, function (index, value) { 
			var customLayer = L.geoJson(null, {
				className: "area"
			});
			var runLayer = omnivore.kml("./data/Hueco/kml/areas/" + value, null, customLayer)
			overlays.areas.addLayer(runLayer);
		});

		$.each(data.trails, function (index, value) { 
			var customLayer = L.geoJson(null, {
				className: "trail"
			});
			var runLayer = omnivore.kml("./data/Hueco/kml/trails/" + value, null, customLayer)
			overlays.trails.addLayer(runLayer);
		});

		$.each(data.boulders, function (index, value) { 
			var customLayer = L.geoJson(null, {
				className: "boulder"
			});
			var runLayer = omnivore.kml("./data/Hueco/kml/boulders/" + value, null, customLayer)
			overlays.boulders.addLayer(runLayer);
		});

		$.each(data.routes, function (index, value) { 

			var customLayer = L.geoJson(null, {
				pointToLayer: function (feature, latlng) {
			        return L.circleMarker(latlng, {
						className: "route",
					    radius: 4,
					    fillColor: "#ff7800",
					    color: "#000",
					    weight: 1,
					    opacity: 1,
					    fillOpacity: 0.8
			        });
			    }
			});
			var runLayer = omnivore.kml("./data/Hueco/kml/routes/" + value, null, customLayer)
			overlays.routes.addLayer(runLayer);
		});

	}).done(function() {

		//overlays.areas.addTo(map);
		//overlays.trails.addTo(map);
		//overlays.boulders.addTo(map);
		//overlays.routes.addTo(map);
	});
	
});

$(window).load(function() {



});