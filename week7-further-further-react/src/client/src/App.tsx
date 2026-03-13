import Map from './components/Map'
import "leaflet/dist/leaflet.css"
import Search from './components/Search'
import { useState } from 'react'
import type IMapItem from './types/IMapItem'
import { latLng } from 'leaflet'
import SearchResults from './components/SearchResults'
import "./styles/index.css"

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

          const mapItem: IMapItem = {
            coords: latLng(value["lat"], value["lon"]),
            fullName: value["full_name"]
          }
          newArr.push(mapItem)
        })
        
        setPlaces(newArr)
      }}/>

      <SearchResults mapItems={getPlaces} />
    </>
  )
}

export default App
