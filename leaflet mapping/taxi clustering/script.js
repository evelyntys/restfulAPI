const BASE_API_URL = 'https://api.data.gov.sg/v1/transport/taxi-availability'


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

async function showTaxiMarkers(){
    let response = await axios.get(BASE_API_URL);
    let taxiCoordinates = response.data.features[0].geometry.coordinates;
    for (let taxi of taxiCoordinates){
        let coordinate = [taxi[1], taxi[0]];
        L.marker(coordinate).addTo(markerCluster)
    }
}

let markerCluster = L.markerClusterGroup();
markerCluster.addTo(map)

///set a timer in javascript
setInterval(function(){
    //clear all existing markers;
    markerCluster.clearLayers();
}, 30000) //second arg is in milliseconds, 1000ms + 1s
showTaxiMarkers();