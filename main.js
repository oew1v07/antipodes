var centroid = turf.point([-1.410151, 50.927559]);
var from_loc = turf.point([ -1.442767, 50.930831]);
var options = {units: 'miles'};

var distance_to_centroid = turf.distance(from_loc, centroid, options);
var bearing_to_centroid = turf.bearing(from_loc, centroid);

var destination = turf.rhumbDestination(centroid, distance_to_centroid, bearing_to_centroid, options);
console.log(distance_to_centroid);
console.log(destination);