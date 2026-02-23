import { useState } from 'react'
import Greeting from "./components/Greeting.tsx"
import "./styles/index.css"

interface Location {
    city: string,
    price: number
}

function App() {
  const [name, setName] = useState("")
  const [age, setAge] = useState<number | null>(null)
  const [country, setCountry] = useState("")
  const [response, setResponse] = useState("")

  const locations: Location[] = [
    { city: "winchester", price: 3 },
    { city: "salisbury", price: 5 },
    { city: "london", price: 15 },
  ]

  return (
    // task 3
    // <>
    //   <label htmlFor="nameInput">Enter your name: </label>
    //   <input id="nameInput" type="text" value={name} placeholder='Enter Name Here' />
    //   <label htmlFor="ageInput">Enter your age: </label>
    //   <input id="ageInput" type="number" value={age ?? ""} onChange={(e) => setAge(Number(e.target.value))} placeholder='Enter Age Here' />

    //   <button onClick={() => {
    //     const name = document.getElementById("nameInput") as HTMLInputElement
    //     const age = document.getElementById("ageInput") as HTMLInputElement

    //     setName(name.value)
    //     setAge(Number(age.value))
    //   }}>Update Details</button>
    //   { age !== null && age >= 0 && age <= 17 ? <p style={{backgroundColor: "red"}}>You are not old enough to vote.</p> : <p style={{backgroundColor: "green"}}>You are old enough to Vote</p> }
      
    // </>

    // Task 3 Last Question
    <>
      <label htmlFor="nameInput">Enter your name: </label>
      <input id="nameInput" type="text" placeholder='Enter Name Here' />

      <label htmlFor="ageInput">Enter your age: </label>
      <input id="ageInput" type="number" value={age ?? ""} onChange={(e) => setAge(Number(e.target.value))} placeholder='Enter Age Here' />

      <label htmlFor="countryInput">Enter your country: </label>
      <input id="countryInput" type="text" placeholder='Enter Country Here' />

      <button onClick={() => {
        const name = document.getElementById("nameInput") as HTMLInputElement
        const age = document.getElementById("ageInput") as HTMLInputElement
        const country = document.getElementById("countryInput") as HTMLInputElement

        setName(name.value)
        setAge(Number(age.value))
        setCountry(country.value)

        purchaseTicket(name.value, Number(age.value), country.value)
      }}>Purchase Ticket</button>
      
      <h1>{response}</h1>
    
    </>

  )

  function purchaseTicket(name: string, age: number, country: string) {

    const location = locations.find(location => location.city.toLowerCase() == country.toLowerCase())
    
    if (!location) {
      setResponse("Sorry, we don't have tickets for your location")
      return
    }
    
    // If the user is under 18 but above 0, they get a 50% discount
    if (age < 18 && age > 0) {
      const newPrice = location.price / 2

      setResponse(`Congratulations ${name}, you have purchased a ticket to ${location.city} for $${newPrice}`)
      return
    }
    //

    setResponse(`Congratulations ${name}, you have purchased a ticket to ${location.city} for $${location.price}`)
  }
}



export default App
