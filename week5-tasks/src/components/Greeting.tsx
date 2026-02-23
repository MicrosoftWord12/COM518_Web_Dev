import { useState } from "react";

interface GreetingProps {
    firstName: string;
    lastName: string;
    age: number;
    backgroundColor?: string;
}

export default function({firstName, lastName, age, backgroundColor}: GreetingProps) {
    const [ getName, setName ] = useState(`${firstName} ${lastName}`);
    const [ getAge, setAge ] = useState(age);
    

    return (
        <div style={{ backgroundColor }}>
            <h1>Hello, {getName}, your age is {getAge}!</h1>
            <h3>you are an {getAge >= 18 ? "adult" : "minor"}!</h3>
        </div>
    )
}