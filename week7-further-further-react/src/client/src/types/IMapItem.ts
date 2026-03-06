import Leaflet from "leaflet"

export default interface IMapItem {
    fullName: string,
    coords: Leaflet.LatLng
}