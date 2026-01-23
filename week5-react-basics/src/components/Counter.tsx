import { useState } from "react"

export default function () {
    const [getCount, setCount] = useState(0);

    return (
        <> 
            <h1>Counter Component</h1>
            <div className="center">
                <h2 className="counterDisplay">{getCount}</h2>
            </div>

            <div className="sides">
                <button onClick={() => setCount(getCount + 1)}>Increment</button>
                <button onClick={() => setCount(getCount - 1)}>Decrement</button>
            </div>
        </>
    )
}