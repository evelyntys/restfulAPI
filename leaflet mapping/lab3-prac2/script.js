// const API_URL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson';

// let map = L.map('map')
// let singapore = [1.29, 103.85]
// map.setView(singapore,4);

// L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
//     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom: 18,
//     id: 'mapbox/streets-v11',  // style of the tiles
//     tileSize: 512,
//     zoomOffset: -1,
//     accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw' //demo access token
// }).addTo(map);

// // async function showLocations(){
// //     let response = await axios.get(API_URL);
// //     let locationCoordinates = response.data.features[0].geometry.coordinates;
// //     for (let location of locationCoordinates){
// //         let coordinate = [location[0], location[1]];
// //         L.marker(coordinate).addTo(markerCluster)
// //         console.log(coordinate)
// //     }
// // }
// // markerCluster.addTo(map)

// async function showLocations(){
//     let response = await axios.get(API_URL);
//     let markerCluster = L.markerClusterGroup();
//     let features = response.data.features;
//     let popup ="";
//     for (let location of features){
//         let coordinate = [location.geometry.coordinates[1], location.geometry.coordinates[0]];
//         popup = L.marker(coordinate);
//         popup.addTo(markerCluster);
//         popup.bindPopup(location.properties.place);
//         // place.addEventListener('click', function(){
//         // alert(`hi; ${location.properties.place}`)});
//         markerCluster.addTo(map);
//     }
// }


// showLocations()


function createMap(){
    let centerpoint = [1.3521, 103.8198];
    let map = L.map('map');
    map.setView(centerpoint, 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 13,
    attribution: '© OpenStreetMap'
}).addTo(map);
return map
}

//this function is entry point of our program
async function main(){
    let map = createMap();
    let response = await axios.get('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson');
    let markerCluster = L.markerClusterGroup();
    markerCluster.addTo(map)
    for (let feature of response.data.features){
        let lat = feature.geometry.coordinates[1];
        let lng = feature.geometry.coordinates[0];
        L.marker([lat,lng]).bindPopup(`<h1>${feature.properties.place}`).addTo(markerCluster);
    }
}

main()