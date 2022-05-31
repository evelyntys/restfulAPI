let map = L.map('map')

map.setView([1.3521, 103.8198], 12)

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw' //demo access token
}).addTo(map);
// add the markers
//in leaflet, anything that can be shown on the top of the map is known as a 'layer'
let singapore = L.marker([1.29, 103.85]);
singapore.addTo(map); //map.addLayer(singapore);

//bind a pop up
singapore.bindPopup(`<h1>welcome to singapore</h1>`)
//can also add image

let bukitTimah = L.marker([1.3294, 103.8021])
bukitTimah.addTo(map);
bukitTimah.addEventListener('click', function () {
    alert('bukit timah nature reserve')
})

//circle at macritchie
let macRitchie = L.circle([1.3448, 103.8224], {
    'radius': 200, //radius is in metres
    'color': 'red',
    'fillColor': 'yellow',
    'fillOpacity': 0.8,
});

map.addLayer(macRitchie)

macRitchie.bindPopup('lots of water')

let singaporeZoo = L.marker([1.4043, 103.7930]);
singaporeZoo.addTo(map);
singaporeZoo.bindPopup(`singapore zoo`);

let SDC = L.marker([1.3327, 103.6789])
SDC.addTo(map);
SDC.bindPopup('singapore discovery centre');

function getRandomLatLng(map) {
    // get the boundaries of the map
    let bounds = map.getBounds();
    let southWest = bounds.getSouthWest();
    let northEast = bounds.getNorthEast();
    let lngSpan = northEast.lng - southWest.lng;
    let latSpan = northEast.lat - southWest.lat;

    let randomLng = Math.random() * lngSpan + southWest.lng;
    let randomLat = Math.random() * latSpan + southWest.lat;

    return [ randomLat, randomLng,];
}

// 
let greenCircles = L.layerGroup(); //a layer group is an invisible layer, can contain other layers (e.g. markers, circles, etc)
for (let i=0; i<3; i++){
    L.circle(getRandomLatLng(map),{
        'radius': 400,
        'color': 'green',
    }).addTo(greenCircles)
}
// greenCircles.addTo(map)

//RANDOM MARKERS
let markers = L.layerGroup();
for (let i=0; i<3; i++){
    L.marker(getRandomLatLng(map)).addTo(markers);
}
// markers.addTo(map);

//RED CIRCLES
let redCircles = L.layerGroup();
for(let i=0; i<3; i++){
    L.circle(getRandomLatLng(map),{
        'radius':500,
        'color':'red'
    }).addTo(redCircles)
}

//YELLOW CIRCLES
let yellowCircles = L.layerGroup();
for(let i=0; i<3; i++){
    L.circle(getRandomLatLng(map),{
        'radius':1000,
        'color':'yellow'
    }).addTo(yellowCircles)
}


//we can create layer control and add it to the map
//only one can be selected for base layer
let baseLayers = {
    'Green Circles':greenCircles,
    'Markers':markers
}

//overlays are checkboxes; can select one or more or none
let overlays = {
    'Red Circles': redCircles,
    'Yellow Circles': yellowCircles
}
L.control.layers(baseLayers,overlays).addTo(map);

document.querySelector('#btnToggle').addEventListener('click', function(){
    //hasLayer function that takes in one layer as an argument
    //if that layer is being displayed in the map, then it will return true
    if(map.hasLayer(greenCircles)){
        //if map is showing green circles, then show the markers instead
        map.removeLayer(greenCircles);
        map.addLayer(markers); // show the markers
    }
    else{
        map.removeLayer(markers);
        map.addLayer(greenCircles);
    }
})