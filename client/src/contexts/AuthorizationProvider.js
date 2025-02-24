import React, {createContext, useContext, useEffect, useState} from "react";

const AuthorizationContext = createContext({});

export function useAuthorization() {
    return useContext(AuthorizationContext);
}

export function AuthorizationProvider({children}) {
    const authenticationStatus = JSON.parse(localStorage.getItem('user'));
    const [authentication, setAuthentication] = useState(authenticationStatus);
    const [allUsers, setAllUsers] = useState([]);

    useEffect(() => {
        if (authentication) {
            localStorage.setItem('user', JSON.stringify(authentication));
        } else {
            localStorage.removeItem('user');
        }
    }, [authentication]);

    function removeUser() {
        localStorage.removeItem('user');
        setAuthentication(false);
    }

    return (
        <AuthorizationContext.Provider value={{
            removeUser,
            allUsers,
            setAllUsers,
            authentication,
            setAuthentication
        }}>
            {children}
        </AuthorizationContext.Provider>
    );
}
