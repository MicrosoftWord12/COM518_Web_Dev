import * as leaflet from "leaflet"
import 'leaflet/dist/leaflet.css';

// DOM Elements
const searchButton = document.getElementById("searchButton") as HTMLButtonElement;
const getArtistButton = document.getElementById("getArtistButton") as HTMLButtonElement;

// Leaflet Stuff
const map = leaflet.map("map1");
const attrib = "Map data copyright OpenStreetMap contributors, Open Database Licence";
const leafletMarkersCache: leaflet.LatLng[] = [];

leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { 
    attribution: attrib 
}).addTo(map);

const uniMarker = leaflet.latLng(50.9079, -1.4015);

map.setView(uniMarker, 14);

searchButton.addEventListener("click", () => {
    const latValue = document.getElementById("latInput") as HTMLInputElement;
    const lngValue = document.getElementById("lngInput") as HTMLInputElement;
    map.setView([parseFloat(latValue.value), parseFloat(lngValue.value)], 14);
})

map.on("click", async (e: leaflet.LeafletMouseEvent) => {
    // console.log(e.latlng)

    for (const marker of leafletMarkersCache) {
        const markerLat = marker.lat;
        const markerLng = marker.lng;

        const clickLat = e.latlng.lat;
        const clickLng = e.latlng.lng;

        if (markerLat === clickLat && markerLng === clickLng) {
            console.log("Marker already exists at this location");
            return;
        }
    }

    const marker = leaflet.marker(e.latlng);

    // const userInput = prompt("Enter a name for this marker:");

    // if(!userInput) {
    //     alert("Marker name cannot be empty. Please try again.");
    //     return
    // }

    // leafletMarkersCache.push(e.latlng);
    // marker.addTo(map);
    // marker.bindPopup(userInput).openPopup();

    const artist = prompt("Enter the Artists name for this address:");
    const hometown = prompt("Enter the Artists hometown for this address:")

    if(!artist || !hometown) {
        alert("Artist name and hometown cannot be empty. Please try again.");
        return
    }

    const jsonObject = JSON.stringify({
        lat: e.latlng.lat,
        lon: e.latlng.lng,
        artist,
        hometown
    })

    const data = await fetch("http://localhost:5050/AddResidency", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: jsonObject
    })

    if (data.status !== 200) {
        const errorData = await data.json();
        alert(`Error: ${errorData.message}`);
        return;
    }

    leafletMarkersCache.push(e.latlng);
    marker.addTo(map);
    marker.bindPopup(`${artist} - ${hometown}`).openPopup();
})

// 297883



getArtistButton.addEventListener("click", async () => {
    const artistInput = document.getElementById("artist") as HTMLInputElement;

    if (!artistInput.value) {
        alert("Please enter an artist name");
        return;
    }

    try {
        const response = await fetch(`http://localhost:5050/GetArtistHometown/${artistInput.value}`);

        if (!response.ok) {
            const errorData = await response.json();
            alert(`Error: ${errorData.message}`);
            return;
        }

        const data = await response.json();

        const { name, lat, lon, hometown } = data.data;

        if (lat && lon) {
            map.setView([lat, lon], 14);
            const marker = leaflet.marker([lat, lon]).addTo(map);
            marker.bindPopup(hometown);
        } else {
            alert(`Location data for ${name} is not available.`);
        }

    } catch (error) {
        alert(`An error occurred: ${error}`);
    }
})