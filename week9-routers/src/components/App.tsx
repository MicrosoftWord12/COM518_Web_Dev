import { useEffect, useState } from "react";
import Login from "./Login"
import Logout from "./Logout"
import User from "User";
export default function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState<Partial<User> | null>(null);

    useEffect(() => {
        const checkLoginStatus = async () => {
            const response = await fetch("/login");
            const data = await response.json();
            if (data.loggedIn) {
                setLoggedIn(true);
                setUser({ username: data.username });
                return
            }
            setLoggedIn(false);
        }

        checkLoginStatus();
    }, [loggedIn])

    return(
        <div>
            <h1>App</h1>

            <Login isLoggedIn={setLoggedIn} setUser={setUser} />

            {loggedIn && user ? (
                <div>
                    <h2>Welcome, {user.name}!</h2>
                </div>
            ) : (
                <h2>Please log in.</h2>
            )}

            {loggedIn && <Logout isLoggedOut={setLoggedIn} />}
        </div>
    )
}