// Add console.log to make sure that the code is working.
console.log("working");

// Create the map object with a center and zoom level.
//let map = L.map('mapid').setView([30, 30], 2);
   

// Create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

// Create the dark view tile layer that will be an option for our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
  "Street": streets,
  "Satellite": satelliteStreets
};

// Create the earthquake layer for our map.
let earthquakes = new L.layerGroup();
let tectonicplates = new L.layerGroup();

// We define an object that contains the overlays.
// This overlay will be visible all the time.
let overlays = {
  Earthquakes: earthquakes,
  TectonicPlates: tectonicplates
};

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
	center: [39.5, -98.5],
	zoom: 3,
	layers: [streets]
});

// Create a legend control object.
let legend = L.control({
  position: "bottomright"
});

// This function returns the style data for each of the earthquakes we plot on
// the map. We pass the magnitude of the earthquake into a function
// to calculate the radius.
function styleInfo(feature) {
  return {
    opacity: 1,
    fillOpacity: 1,
    fillColor: getColor(feature.properties.mag),
    color: "#000000",
    radius: getRadius(feature.properties.mag),
    stroke: true,
    weight: 0.5
  };
}

// This function determines the color of the circle based on the magnitude of the earthquake.
function getColor(magnitude) {
  if (magnitude > 5) {
    return "#ea2c2c";
  }
  if (magnitude > 4) {
    return "#ea822c";
  }
  if (magnitude > 3) {
    return "#ee9c00";
  }
  if (magnitude > 2) {
    return "#eecc00";
  }
  if (magnitude > 1) {
    return "#d4ee00";
  }
  return "#98ee00";
}

// This function determines the radius of the earthquake marker based on its magnitude.
// Earthquakes with a magnitude of 0 will be plotted with a radius of 1.
function getRadius(magnitude) {
  if (magnitude === 0) {
    return 1;
  }
  return magnitude * 4;
}

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps, overlays).addTo(map);

// Then we add our tile layer to the map before loading the data in case the data tile is too large.
streets.addTo(map);

// Accessing the Toronto Neighborhoods GeoJSON URL
//let earthQuakes = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
// Retrieve the earthquake GeoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {

// Creating a GeoJSON layer with the retrieved data.
L.geoJson(data, {
  // We turn each feature into a circleMarker on the map.
  pointToLayer: function(feature, latlng) {
      console.log(data);
      return L.circleMarker(latlng);
    },
  // We set the style for each circleMarker using our styleInfo function.
style: styleInfo,
  // We create a popup for each circleMarker to display the magnitude and
  //  location of the earthquake after the marker has been created and styled.
  onEachFeature: function(feature, layer) {
  layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
}
}).addTo(earthquakes);

  // Then we add the earthquake layer to our map.
  earthquakes.addTo(map);
  });

let myStyle = {
  color: 'blue',
  weight: 3,
  opacity: 4
}

// Retrieve the tetontic GeoJSON data.
d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json").then(function(data) {
  console.log(data);
// Creating a GeoJSON layer with the retrieved data.
L.geoJson(data, {
  style: myStyle
}).addTo(tectonicplates);

  // Then we add the earthquake layer to our map.
  tectonicplates.addTo(map);
  });

  //var legend = L.control({position: 'bottomright'});

legend.onAdd = function () {
  var div = L.DomUtil.create('div', 'info legend'),
     magnitudes = [0, 1, 2, 3, 4, 5];
     colors = ["#98ee00", "#d4ee00", "#eecc00", "#ee9c00", "#ea822c", "#ea2c2c"
  ];
    
    // Looping through our intervals to generate a label with a colored square for each interval.
   for (var i = 0; i < magnitudes.length; i++) {
    console.log(colors[i]);
    div.innerHTML +=
      " " +
      magnitudes[i] + (magnitudes[i + 1] ? "&ndash;" + magnitudes[i + 1] + "<br>" : "+");
 }
  return div;
};

legend.addTo(map);

// Grabbing our GeoJSON data.
//d3.json(earthQuakes).then(function(data) {
  //console.log(data);
   // L.geoJson(data).addTo(map);
    //L.geoJson(data, {
    //  style: myStyle
    //}).addTo(map)
  //
  //pointToLayer: function(feature, latlng) {
  //    console.log(feature);
  //    return L.marker(latlng)
  //    .bindPopup("Airport Code:" + feature.properties.id + " <hr> Airport City:" + feature.properties.name + ", " + feature.properties.country + "")
  //  .addTo(map);
//});
    
  //onEachFeature: function(feature, layer){

  // layer.bindPopup("Airline Code:" + feature.properties.airline + " <hr> Destination:" + feature.properties.dst + "")
  //}
    


//});



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