import { useState } from "react";

interface Props {
    isLoggedOut: (loggedIn: boolean) => void;
}

export default function ({ isLoggedOut }: Props) {
    const handleLogout = async () => {
        const response = await fetch("/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
        });

        const data = await response.json();

        if (data.success) {
            console.log("is logged out false")
            isLoggedOut(false);
            return
        }

        console.log("is logged out true")
        isLoggedOut(true);
    }



    return (
        <button onClick={handleLogout}>Logout</button>
    )
}