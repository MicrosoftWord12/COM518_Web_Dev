import { map, tileLayer, marker } from 'leaflet'
import type { LeafletMouseEvent } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import "./css/index.css"
import { useEffect } from 'react'

function App() {

  useEffect(() => {
    const myMap = map('map').setView([51.505, -0.09], 13);

    tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(myMap);

     const clickHandler = (e: LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;
      
      console.log(lat, lng)

      marker([lat, lng]).addTo(myMap).bindPopup(`You clicked at ${lat.toFixed(4)}, ${lng.toFixed(4)}`).openPopup();
    }

    myMap.on('click', clickHandler);
    
    return () => {
      myMap.off('click', clickHandler);
      myMap.remove();
    }

  }, [])



  return (
    <>
      {/* <h1>Testinhg Dat</h1> */}
      <div id="map" className='bg-amber-950'></div>
    </>
  )
}

export default App
