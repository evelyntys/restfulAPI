//L is an object defined inside leaflet javascript
//L. map will create a new map object
// the first argument is the ID of the element that will have the map
let map = L.map('map');

//set the center of the map
//2 arguments, first argument is the center point
//first is lat, second is long
//second argument: the higher it is, the more zoom in the map will be
map.setView([1.3521, 103.8198], 13);

//add the tile layer
//boiler plate; never changes, always the same thing
//first argument: url is data source of map 
//second argument is attribution tag
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11', //style of the tiles
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw' //demo access token
}).addTo(map);
