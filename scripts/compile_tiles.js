var fs = require('fs');
var events = require('events');
var exec = require('exec');

var EventEmitter = events.EventEmitter;
var ee = new EventEmitter();

/*
// Step 1. Gather all the 
//			1. Regions
//			2. Areas
//			3. Boulders
				a. Boulders
				b. Walls
//			4. Trails
//			5. Places
*/			

var kmlDirectory = "D:/directedStudy/server/apache2/htdocs/cragmaps/data/Hueco/kml/";
var jsonDirectory = "D:/directedStudy/server/apache2/htdocs/cragmaps/data/Hueco/json/";

var regionsDir = "regions/";
var areasDir = "areas/";
var boulders_bouldersDir = "boulders/boulders/";
var boulders_wallsDir = "boulders/walls/";
var trailsDir = "trails/";
var placesDir = "places/"

var regions = [];
var areas = [];
var boulders_boulders = [];
var boulders_walls = [];
var trails = [];
var places = [];

fs.readdir(kmlDirectory + regionsDir, function (err, files) {
	regions = files;
	ee.emit("regionsDone");
});

fs.readdir(kmlDirectory + areasDir, function (err, files) {
	areas = files;
	ee.emit("areasDone");
});

fs.readdir(kmlDirectory + boulders_bouldersDir, function (err, files) {
	boulders_boulders = files;
	ee.emit("bbDone");
});

fs.readdir(kmlDirectory + boulders_wallsDir, function (err, files) {
	boulders_walls = files;
	ee.emit("bwDone");
});

fs.readdir(kmlDirectory + trailsDir, function (err, files) {
	trails = files;
	ee.emit("trailsDone");
});

fs.readdir(kmlDirectory + placesDir, function (err, files) {
	places = files;
	ee.emit("placesDone");
});

/*
	2. convert each new .kml file to individual .json files
	// ogr2ogr -f GeoJSON geojson.json Areas.kml
*/

function convertToJSON(files, location, callback)
{
	for(var i = 0; i < files.length; i++)
	{
		// remove the kml extension to retrieve the filename
		var fileName = files[i].substring(0, files[i].length - 4);

		console.log('ogr2ogr', '-f', "GeoJSON", "\"" + jsonDirectory + location + fileName + ".json\"", "\"" + kmlDirectory + location + files[i] + "\"");

	    exec(['ogr2ogr', '-f', "GeoJSON", "\"" + jsonDirectory + location + fileName + ".json\"", "\"" + kmlDirectory + location + files[i] + "\""], function(err, out, code) {
			if (err instanceof Error)
				throw err;
			process.stderr.write(err);
			process.stdout.write(out);
			process.exit(code);
			if(i == (files.length - 1))
			{
				console.log("Done converting " + location);
			}
		});
	}
}

ee.on("regionsDone", function () {
	convertToJSON(regions, regionsDir);
});

ee.on("areasDone", function () {
     convertToJSON(areas, areasDir);
});

ee.on("bbDone", function () {
     convertToJSON(boulders_boulders, boulders_bouldersDir);
});

ee.on("bwDone", function () {
     convertToJSON(boulders_walls, boulders_wallsDir);
});

ee.on("trailsDone", function () {
     convertToJSON(trails, trailsDir);
});

ee.on("placesDone", function () {
     convertToJSON(places, placesDir);
});


/*
	3. Merge:
		1. all regions: regions.json
		2. all areas: areas.json
		3. all boulders: 
			-boulders: boulders_boulders.json
			-walls: boulders_Walls.json
*/

