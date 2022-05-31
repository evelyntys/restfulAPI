// let singapore = [ 1.29,103.85]; // #1 Singapore latlng
// let map = L.map('map').setView(singapore, 11); // #2 Set the center point
// // setup the tile layers
// L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
//     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom: 18,
//     id: 'mapbox/streets-v11',
//     tileSize: 512,
//     zoomOffset: -1,
//     accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw' //demo access token
// }).addTo(map);

// // let BASE_API_URL = "https://gist.github.com/kunxin-chor/a5f5cab3e8a6ad0868134334c1432d9a#file-";
// // let hdb = BASE_API_URL + "hdb-json";
// // let malls = BASE_API_URL + "malls-json";
// // let nature = BASE_API_URL + "nature-json";

// async function load(){
//     let hdbResponse= await axios.get('hdb.json');
//     let hdbData = hdbResponse.data;
//     let hdbGroup = L.layerGroup();
//     let popup = "";
//     for (let each of hdbData){
//         popup = L.marker(each.coordinates);
//         popup.addTo(hdbGroup);
//         popup.bindPopup(each.name)
//     }
//     hdbGroup.addTo(map)

//     let mallResponse = await axios.get('malls.json');
//     let mallData = mallResponse.data;
//     let mallGroup = L.layerGroup();
//     for (let each of mallData){
//        popup = L.circle(each.coordinates, {
//             color: "red",
//             fillColor: "green",
//             fillOpacity: 0.5,
//             radius: 250
//         })
//         popup.addTo(mallGroup);
//         popup.bindPopup(each.name)
//     }
//     mallGroup.addTo(map)

//     let natureResponse = await axios.get('nature.json');
//     let natureData = natureResponse.data;
//     let natureGroup = L.layerGroup();
//     for (let each of natureData){
//        popup =  L.circle(each.coordinates,{
//             color:'blue',
//             fillColor: 'pink',
//             fillOpacity: 0.5,
//             radius: 300
//         })
//         popup.addTo(hdbGroup);
//         popup.bindPopup(each.name)
//     }
//     natureGroup.addTo(map)

//     let baseLayers = {
//         'hdb':hdbGroup,
//         'malls':mallGroup,
//         'nature':natureGroup
//     }
//     L.control.layers(baseLayers, {}).addTo(map);
// }
// load()

function createMap() {
    let singapore = [1.3521, 103.8198];
    let map = L.map('map').setView(singapore, 12);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw' //demo access token
    }).addTo(map);
    return map
}

async function loadAndDisplayLayer(map, jsonFile){
    let response = await axios.get(jsonFile);
    console.log(response.data);
    let layer = L.layerGroup(); //a layer group can hold other layers 
    layer.addTo(map)
    for (let entry of response.data) {
        L.marker(entry.coordinates)
            .bindPopup(`<h1>${entry.name}</h1>`)
            .addTo(layer);
    }
    return layer;
}


async function main() {
    let map = createMap();

    // let hdbResponse = await axios.get('hdb.json');
    // console.log(hdbResponse.data);
    // let hdbLayer = L.layerGroup(); //a layer group can hold other layers 
    // hdbLayer.addTo(map)
    // for (let entry of hdbResponse.data) {
    //     L.marker(entry.coordinates)
    //         .bindPopup(`<h1>${entry.name}</h1>`)
    //         .addTo(hdbLayer);
    // }

    //need a point for all 3 variables to be synced so they can be added to the baseLayers => if not, the layers will just be a promise
    // let hdbLayer = await loadAndDisplayLayer(map, 'hdb.json');
    // let mallLayer = await loadAndDisplayLayer(map, 'malls.json');
    // let natureLayer = await loadAndDisplayLayer(map, 'nature.json');

    //to have parallel requests, above method will do one by one e.g. hdbLayer firs then mallLayer...
    let hdbRequest = loadAndDisplayLayer (map, 'data/hdb.json');
    let mallRequest = loadAndDisplayLayer (map, 'data/malls.json');
    let natureRequest = loadAndDisplayLayer (map, 'data/nature.json');

    let hdbLayer = await hdbRequest
    let mallLayer = await mallRequest
    let natureLayer = await natureRequest

    //markerclustergroup is already a layer => can substitute layers with markercluster


    //let layers = await axios.all(hdbRequest, mallRequest, natureRequest);
    //let baseLayers = { 
    //    'HDB' : layers[0],
    //    'mall' : layers[1],
    //    'nature' : layers[2],
    //  }


    let baseLayers = {
        'HDB' : hdbLayer,
        'Malls' : mallLayer,
        'Nature' : natureLayer
    }

    L. control. layers(baseLayers, {}).addTo(map)
    // let mallResponse = await axios.get('malls.json');
    // let mallLayer = L.layerGroup();
    // mallLayer.addTo(map);
    // for (let entry of mallResponse.data){
    //     L.marker(entry.coordinates)
    //     .bindPopup(`<h1>${entry.name}</h1>`)
    //     .addTo(mallLayer);
    // }

    // let natureResponse = await axios.get('nature.json');
    // let natureLayer = L.layerGroup();
    // natureLayer.addTo(map);
    // for (let entry of natureResponse.data){
    //     L.marker(entry.coordinates)
    //     .bindPopup(`<h1>${entry.name}</h1>`)
    //     .addTo(natureLayer);
    // }
}

main();