import { useEffect, useState, type SubmitEvent } from "react"

interface SubmitProps {
    // placeName: string,
    onSubmit: (data: any) => void
}

export default function ({ onSubmit }: SubmitProps) {

    const [getPlaceName, setPlaceName] = useState("southampton")

    // const handleSubmit = async (e: SubmitEvent) => {
    //     e.preventDefault()
    //     const data = await fetch(`https://hikar.org/webapp/nomproxy?q=${getPlaceName}`)
    //     const response = await data.json()
    //     onSubmit(response)
    // }

    useEffect(() => {
        const searchData = async () => {
            const data = await fetch(`https://hikar.org/webapp/nomproxy?q=${getPlaceName}`)

            const response = await data.json()

            onSubmit(response)
        }

        searchData()
    }, [getPlaceName])

    //     const handleSubmit = useCallback(async (e: SubmitEvent) => {
    //         e.preventDefault()
            
    //         const data = await fetch(`https://hikar.org/webapp/nomproxy?q=${getPlaceName}`)

    //         const response = await data.json()

    //         onSubmit(response)

    //     }, [getPlaceName])
    // }, [getPlaceName])

    return (
        <>
            <form>
                <label htmlFor="placeSearch">This is Label</label>
                <input key={"placeSearch"} id="placeSearch" type="text" placeholder="Enter Here" onChange={(e) => {setPlaceName(e.target.value)}} />
                <button type="submit">Submit Details</button>
            </form>
        </>
    )
}