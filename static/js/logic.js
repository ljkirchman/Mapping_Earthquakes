 
// Create the map object with a center and zoom level.
//let map = L.map('mapid').setView([30, 30], 2);
   

// Create the tile layer that will be the background of our map.
let light = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	id: 'mapbox.streets',
	accessToken: API_KEY
});

// Create the dark view tile layer that will be an option for our map.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
  Street: light,
  Dark: dark
};

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
	center: [30, 30],
	zoom: 2,
	layers: [light]
})

// Create a style for the lines.
let myStyle = {
	color: "#ffffa1",
	weight: 2
}

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// Then we add our tile layer to the map before loading the data in case the data tile is too large.
light.addTo(map);

// Accessing the airport GeoJSON URL
let torontoData = "https://raw.githubusercontent.com/ljkirchman/Mapping_Earthquakes/master/torontoRoutes.json";


// Grabbing our GeoJSON data.
d3.json(torontoData).then(function(data) {
  console.log(data);
// Creating a GeoJSON layer with the retrieved data.
L.geoJson(data, {
  style: myStyle,
  pointToLayer: function(feature, latlng) {
      console.log(feature);
      return L.marker(latlng)
      .bindPopup("Airport Code:" + feature.properties.id + " <hr> Airport City:" + feature.properties.name + ", " + feature.properties.country + "")
  }
    
  //onEachFeature: function(feature, layer){

  // layer.bindPopup("Airline Code:" + feature.properties.airline + " <hr> Destination:" + feature.properties.dst + "")
  //}
    

}).addTo(map);
});



// Get data from cities.js
//let airports = airportData;

// Loop through the cities array and create one marker for each city.
//airports.forEach(function(airport) {
//  console.log(airport)
//  L.circleMarker(airport.location, {
//    radius: airport.population/200000,
//    color: 'orange',
//    fillColor: '#FED8B1'
//  })
//  .bindPopup("<h2>" + airport.city + ", " + airport.state + "</h2> <hr> <h3>Population " + airport.population.toLocaleString() + "</h3>")
//  .addTo(map);
// });

// Create a polyline using the line coordinates and make the line red.
//L.polyline(line, {
//  color: 'blue',
//  weight: '2',
//  opacity: '0.5',
//  dashArray: '5, 5'
//}).addTo(map);

//  Add a marker to the map for Los Angeles, California.
//  let marker = L.marker([34.0522, -118.2437]).addTo(map);

//  Add a circle to the map for Los Angeles, California
//  L.circleMarker([34.0522, -118.2437], {
//    color: 'black',
//    fillColor: '#FFFF99',
//    radius: 300
//}).addTo(map);

// Grabbing our GeoJSON data.
//L.geoJSON(3550, {
  // Turn each feature into a marker on the map.
  //pointToLayer: function(feature, latlng) {
  //  console.log(feature);
  //  return L.marker(latlng)
  //  .bindPopup("<h2>" + feature.properties.name + "</h2> <hr> <h3>" + feature.properties.city + ", " + feature.properties.country + "</h3>")
  //}

//}).addTo(map)