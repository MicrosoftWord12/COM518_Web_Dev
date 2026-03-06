import Map from './components/Map'
import "leaflet/dist/leaflet.css"
import "./styles/index.css"
import Search from './components/Search'
import { useEffect, useState } from 'react'
import type IMapItem from './types/IMapItem'
import { latLng } from 'leaflet'

function App() {
  const [getPlaces, setPlaces] = useState<IMapItem[]>([])

  console.log('App: re-rendering: getPlaces=');
  console.log(getPlaces)

  return (
    <>
      <div>
        <h1 className='text-red-500'>Tailwindcss Is Working If this is Red</h1>
      </div>
      <Map items={getPlaces} />


      <Search onSubmit={(data) => {
        const pois = data.pois
        if (!pois) return

        const newArr: IMapItem[] = []

        pois.forEach((value: any)=> {
          console.log(value)

          const mapItem: IMapItem = {
            coords: latLng(value["lat"], value["lon"]),
            fullName: value["full_name"]
          }
          newArr.push(mapItem)
        })
        
        console.log('newArr:');
        console.log(newArr)
        setPlaces(newArr)
      }}/>
    </>
  )
}

export default App
