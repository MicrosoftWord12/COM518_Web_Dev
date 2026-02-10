import * as leaflet from "leaflet"
import 'leaflet/dist/leaflet.css';

const map = leaflet.map("map1");

const attrib = "Map data copyright OpenStreetMap contributors, Open Database Licence";

leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { 
    attribution: attrib 
}).addTo(map);
            
map.setView([50.908,-1.4], 14);

// 297883