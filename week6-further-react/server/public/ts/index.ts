document.getElementById("search")?.addEventListener("click", async (e) => {
    const userToSearch = document.getElementById("theArtist") as HTMLInputElement
    const artist = userToSearch.value
    const url = `/GetAllSongsByArtist/?artist=${artist}`
    const data = await fetch(url)
    const response = await data.json()
    
    const resultDiv = document.getElementById("htresults")

    if (!resultDiv) {
        console.error("Result div not found")
        return
    }

    if (!response.data) {
        resultDiv!.innerHTML = `<h2>Could not find results for artist: ${artist}</h2>`
        return
    }

    resultDiv.innerHTML = `<h2>${response.message}</h2>`
    response.data.forEach((song: { id: number, title: string, artist: string }) => {
        const songElement = document.createElement("p")
        const buttonElement = document.createElement("button")
        buttonElement.id = `buy-${song.id}`
        songElement.textContent = `Title: ${song.title}, Artist: ${song.artist}`

        buttonElement.textContent = "Buy"
        buttonElement.addEventListener("click", async (e) => {
            const url = `/BuySongCopy/${song.id}`
            const data = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const response = await data.json()

            if(data.status === 200){
                resultDiv.innerHTML = `<h2>${response.message}</h2>`
            } else {
                resultDiv.innerHTML = `<h2>Error: ${response.message}</h2>`
            }
        })

        songElement.appendChild(buttonElement)
        resultDiv.appendChild(songElement)
    })
})

document.getElementById("add")?.addEventListener("click", async (e) => {
    const addArtistInput = document.getElementById("addArtist") as HTMLInputElement
    const addTitleInput = document.getElementById("addTitle") as HTMLInputElement
    const addYearInput = document.getElementById("addYear") as HTMLInputElement
    const addPriceInput = document.getElementById("addPrice") as HTMLInputElement
    const addQuantityInput = document.getElementById("addQuantity") as HTMLInputElement

    const artist = addArtistInput.value
    const title = addTitleInput.value
    const year = parseInt(addYearInput.value)
    const price = parseFloat(addPriceInput.value)
    const quantity = parseInt(addQuantityInput.value)

    const url = `/AddSong`  
    const data = await fetch(url, {
        body: JSON.stringify({ title, artist, year, price, quantity }),
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    })

    const response = await data.json()
    const resultDiv = document.getElementById("addSongResult")

    if (!resultDiv) {
        console.error("Result div not found")
        return
    }

    if(data.status !== 200){
        resultDiv.innerHTML = `<h2>Error: ${response.message}</h2>`
        alert(`Error: ${response.message}`)
        return
    }


    
    resultDiv.innerHTML = `<h2>${response.message}</h2>`
})