import { useEffect, useRef, useState } from "react"
import Leaflet from "leaflet"
import type IMapItem from "../types/IMapItem"

interface MapProps {
    items: IMapItem[]

}


export default function ({items}: MapProps) {
    // const map = useRef<Leaflet.Map | null>(null)
    // const [getLng, setLng] = useState<Leaflet.LatLng | null>(Leaflet.latLng(lat || 51.505, lng || -0.09))

    // useEffect(() => {
    //     if (map.current) return
    //     if (!getLng) return

    //     map.current = Leaflet.map('map').setView(getLng, 14)

    //     Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //         attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    //     }).addTo(map.current)

    //     map.current.on("moveend", (e) => {
    //         const centre = map.current!.getCenter();
    //         setLng(centre);
    //     });
        
    //     map.current.on("click", (e) => {
    //         console.log(e.latlng)
    //     })

    // }, [])

    // return (
    // <>
    //     <div id="map" style={{ height: '400px' }}></div>
    // </>

    console.log(`Rendering map: items= ${JSON.stringify(items)} length=${items.length}`);
    const map = useRef<Leaflet.Map | null>(null)
    // const [getLngArr, setLngArr] = useState<IMapItem[]>(items)

    useEffect(() => {
        console.log("items has changed... running the effect");
        if (!map.current) {
            map.current = Leaflet.map('map').setView([51.505, -0.09], 14)
        }   

        Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map.current)
        
        console.log("Nah No Change")
        console.log(typeof items)

        if (items.length > 0) {
            console.log("Render Changed with Items")
            items.forEach((value) => {
                const { fullName, coords }: IMapItem = value
    
                Leaflet.marker(coords).addTo(map.current!).bindPopup(fullName).openPopup()
            })
        }

    }, [items])

    return (
    <>
        <div id="map" style={{ height: '400px' }}></div>
    </>
    )
}