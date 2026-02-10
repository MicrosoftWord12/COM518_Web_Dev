import * as leaflet from "leaflet"
import 'leaflet/dist/leaflet.css';

const map = leaflet.map("map1");

const attrib = "Map data copyright OpenStreetMap contributors, Open Database Licence";
const leafletMarkers: leaflet.LatLng[] = []

leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { 
    attribution: attrib 
}).addTo(map);

map.setView([51.505, -0.09], 14);


const searchButton = document.getElementById("searchButton") as HTMLButtonElement;

searchButton.addEventListener("click", () => {
    const latValue = document.getElementById("latInput") as HTMLInputElement;
    const lngValue = document.getElementById("lngInput") as HTMLInputElement;


    map.setView([parseFloat(latValue.value), parseFloat(lngValue.value)], 14);
})

            


// map.on("click", (e: leaflet.LeafletMouseEvent) => {
//     console.log(e.latlng)

//     for (const marker of leafletMarkers) {
//         const markerLat = marker.lat;
//         const markerLng = marker.lng;

//         const clickLat = e.latlng.lat;
//         const clickLng = e.latlng.lng;

//         if (markerLat === clickLat && markerLng === clickLng) {
//             console.log("Marker already exists at this location");
//             return;
//         }
//     }

//     const marker = leaflet.marker(e.latlng);


//     leafletMarkers.push(e.latlng);
//     marker.addTo(map);

//     console.log(leafletMarkers)
// })

// 297883