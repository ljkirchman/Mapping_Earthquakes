  
// Add console.log to check to see if our code is working.
//console.log("working");

// Create the map object with a center and zoom level.
let map = L.map('mapid').setView([37.6213, -122.3790], 5);
    

// Create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	id: 'mapbox.streets',
	accessToken: API_KEY
});

// Coordinates for each point to be used in the line.
let line = [
  [37.61522, -122.389977],
  [30.1974292, -97.6663058],
  [41.978611, -87.904724],
  [43.677717, -79.624819],
  [40.6398262, -73.7787443]
];

// Get data from cities.js
//let cityData = cities;

// Loop through the cities array and create one marker for each city.
//cities.forEach(function(city) {
//  console.log(city)
//  L.circleMarker(city.location, {
//    radius: city.population/200000,
//    color: 'orange',
//    fillColor: '#FED8B1'
//  })
//  .bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3>Population " + city.population.toLocaleString() + "</h3>")
//  .addTo(map);
// });

// Create a polyline using the line coordinates and make the line red.
L.polyline(line, {
  color: 'blue',
  weight: '2',
  opacity: '0.5',
  dashArray: '5, 5'
}).addTo(map);

//  Add a marker to the map for Los Angeles, California.
//  let marker = L.marker([34.0522, -118.2437]).addTo(map);

//  Add a circle to the map for Los Angeles, California
//  L.circleMarker([34.0522, -118.2437], {
//    color: 'black',
//    fillColor: '#FFFF99',
//    radius: 300
//}).addTo(map);

// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);