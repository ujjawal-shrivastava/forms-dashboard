import React, { useState, createContext } from 'react'

export const UserContext = createContext<any>({})

export function UserProvider(props: any) {
    /*const [state, setState] = useState(() => {
        const currentUser = localStorage.getItem("user")
        if (currentUser) {
            sessionStorage.setItem('user', currentUser)
            return (JSON.parse(currentUser))
        }

        const user = sessionStorage.getItem("user")
        if (user) {
            return JSON.parse(user)
        }
        else {
            return { auth: false, long: false, email: "", name: "" }
        }
    }
    )*/
    const [state, setState] = props.value
    return (
        <UserContext.Provider value={[state, setState]} >
            {props.children}
        </UserContext.Provider>
    )
}
