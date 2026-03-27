import { useState } from "react";
import User from "User";

interface Props {
    isLoggedIn: (loggedIn: boolean) => void;
    setUser: (user: User) => void;
}

export default function Login({ isLoggedIn, setUser }: Props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        const response = await fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username: username, password: password })
        });

        const data = await response.json();

        console.log(data)

        if (data.success) {
            isLoggedIn(true);
            setUser(data.user);
        } else {
            isLoggedIn(false);
        }
    }



    return (
        <>
            <h1>Login</h1>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
        </>
    )
}