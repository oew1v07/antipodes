
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
	var mymap = L.map('mapid').setView([50.927559, -1.410151], 13);

	var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
	var osmAttrib='Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
	var osm = new L.TileLayer(osmUrl, {minZoom: 8, maxZoom: 18, attribution: osmAttrib});	

	mymap.addLayer(osm);

	return mymap;
}

function createMarker(turfPoint, colour) {
	var marker = L.marker([turfPoint.geometry.coordinates[1], turfPoint.geometry.coordinates[0]],
		{icon: L.spriteIcon(colour)});
	return marker;
}

var mymap = initMap();


var centroid = turf.point([-1.410151, 50.927559]);
var from_loc = turf.point([ -1.442767, 50.930831]);
var destination = calcAntipodes(centroid, from_loc);

createMarker(centroid, 'red').addTo(mymap);
createMarker(from_loc, 'blue').addTo(mymap);
createMarker(destination, 'blue').addTo(mymap);

