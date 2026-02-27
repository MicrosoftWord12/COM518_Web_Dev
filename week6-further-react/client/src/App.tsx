import { useState } from 'react'
import DisplaySearchedArtist from './components/DisplaySearchedArtist'

function App() {
  const [getArtist, setArtist] = useState("")
  const [searchResults, setSearchResults] = useState([])

  return (
    <>
      <label htmlFor="searchForArtist">Input Artist Name</label>
      <input id="searchForArtist" type="text" />
      <button type='submit' onClick={async () => {
        const inputArtist = document.getElementById("searchForArtist") as HTMLInputElement

        if (!inputArtist){ 
          return
        }

        const inputArtistValue = inputArtist.value

        setArtist(inputArtistValue)
      
        const response = await fetch(`/GetAllSongsByArtist?artist=${inputArtistValue}`)

        const { data } = await response.json()

        console.log(data)

        setSearchResults(data)
      }}>Find Artist</button>

      <DisplaySearchedArtist displayedArtist={getArtist} />

      {searchResults.map((value: any) => {
        return (
          <div key={value.id}>
            <li>{value.artist}</li>
            <li>{value.id}</li>
          </div>
        )
      })}

    </>
  )
}

export default App
