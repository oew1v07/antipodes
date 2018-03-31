
function calcAntipodes(centroid, from_loc) {

var options = {units: 'miles'};

var distance_to_centroid = turf.distance(from_loc, centroid, options);
var bearing_to_centroid = turf.bearing(from_loc, centroid);

var destination = turf.rhumbDestination(centroid, distance_to_centroid, bearing_to_centroid, options);
console.log(distance_to_centroid);
console.log(destination);

return destination;

}

function initMap() {
	// Init the map and set view to Soton
	var mymap = L.map('mapid').setView([50.927559, -1.410151], 13);

	// Add the OpenStreetMap background layer
	var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
	var osmAttrib='Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
	var osm = new L.TileLayer(osmUrl, {minZoom: 8, maxZoom: 18, attribution: osmAttrib});	

	mymap.addLayer(osm);

	// Add onclick handler for the map
	mymap.on('click', onMapClick);

	return mymap;
}

function createMarkerFromTurf(turfPoint, colour) {
	var marker = L.marker([turfPoint.geometry.coordinates[1], turfPoint.geometry.coordinates[0]],
		{icon: L.spriteIcon(colour)});
	return marker;
}

function onMapClick(e) {
	// Create a marker where we clicked
    var marker = L.marker(e.latlng).addTo(mymap);

    // Get that location into a turf.point
    var from_loc = turf.point([e.latlng.lng, e.latlng.lat]);

    // Do the actual calculation
    var destination = calcAntipodes(centroid, from_loc);

    createMarkerFromTurf(destination, 'blue').addTo(mymap);
}

var mymap = initMap();

// Actually calculate the antipodes
var centroid = turf.point([-1.410151, 50.927559]);
//var from_loc = turf.point([ -1.442767, 50.930831]);
//var destination = calcAntipodes(centroid, from_loc);

createMarkerFromTurf(centroid, 'red').addTo(mymap);
//createMarkerFromTurf(from_loc, 'blue').addTo(mymap);
//createMarkerFromTurf(destination, 'blue').addTo(mymap);



