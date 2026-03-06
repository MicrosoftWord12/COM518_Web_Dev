import { useEffect, useRef, useState } from "react"
import Leaflet from "leaflet"

interface MapProps {
    lat?: number
    lng?: number
}


export default function ({lat, lng}: MapProps) {
    const map = useRef<Leaflet.Map | null>(null)
    const [getLng, setLng] = useState<Leaflet.LatLng | null>(Leaflet.latLng(lat || 51.505, lng || -0.09))

    useEffect(() => {
        if (map.current) return

        map.current = Leaflet.map('map').setView(getLng!, 14)

        Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map.current)

        map.current.on("moveend", (e) => {
            const centre = map.current!.getCenter();
            setLng(centre);
        });
    })

    return (
    <>
        <div id="map" style={{ height: '400px' }}></div>
    </>
    )
}