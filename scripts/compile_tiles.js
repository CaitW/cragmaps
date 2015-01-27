var fs = require('fs');
var events = require('events');

var EventEmitter = events.EventEmitter;
var ee = new EventEmitter();

/*
// Step 1. Gather all the 
//			1. Regions
//			2. Areas
//			3. Boulders
*/

var regions = [];
var areas = [];
var boulder_boulders = [];
var boulder_walls = [];

fs.readdir("D:/directedStudy/server/apache2/htdocs/cragmaps/data/Hueco/kml/regions", function (err, files) {
	regions = files;
	ee.emit("regionsDone");
});

fs.readdir("D:/directedStudy/server/apache2/htdocs/cragmaps/data/Hueco/kml/areas", function (err, files) {
	areas = files;
	ee.emit("areasDone");
});

fs.readdir("D:/directedStudy/server/apache2/htdocs/cragmaps/data/Hueco/kml/boulders/boulders", function (err, files) {
	boulder_boulders = files;
	ee.emit("bbDone");
});

fs.readdir("D:/directedStudy/server/apache2/htdocs/cragmaps/data/Hueco/kml/boulders/walls", function (err, files) {
	boulder_walls = files;
	ee.emit("bwDone");
});

/*
	2. convert each new .kml file to individual .json files
	3. Merge:
		1. all regions: regions.json
		2. all areas: areas.json
		3. all boulders: 
			-boulders: boulders_boulders.json
			-walls: boulders_Walls.json
*/

ee.on("regionsDone", function () {
    console.log(regions);
});

ee.on("areasDone", function () {
     console.log(areas);
});

ee.on("bbDone", function () {
     console.log(boulder_boulders);
});

ee.on("bwDone", function () {
     console.log(boulder_walls);
});